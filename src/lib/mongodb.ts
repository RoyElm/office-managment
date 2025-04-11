import mongoose from 'mongoose';

// Use the proper environment variable and provide clear error logs
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('MongoDB URI not found in environment. If running in development without MongoDB, the app will use localStorage.');
} else {
  console.log('MongoDB URI found, will attempt connection when needed');
}

// Better error handling for authentication issues
if (MONGODB_URI && MONGODB_URI.includes('<db_password>')) {
  console.error('MongoDB connection error: Please replace <db_password> in your MONGODB_URI with the actual password');
  console.error('For local development without MongoDB, comment out the database saving code in OfficeMapper.tsx');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let globalMongoose = {
  conn: null as mongoose.Connection | null,
  promise: null as Promise<mongoose.Connection> | null
};

async function dbConnect() {
  // If no MongoDB URI is provided, throw a specific error that can be caught
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not configured - app will use localStorage fallback');
    throw new Error('MONGODB_URI not configured');
  }

  if (globalMongoose.conn) {
    console.log('Using existing MongoDB connection');
    return globalMongoose.conn;
  }

  if (!globalMongoose.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Reduce timeout to fail faster
      connectTimeoutMS: 5000,
    };

    console.log('Connecting to MongoDB...');
    try {
      globalMongoose.promise = mongoose.connect(MONGODB_URI, opts)
        .then(mongoose => {
          console.log('Connected to MongoDB successfully');
          return mongoose.connection;
        })
        .catch(error => {
          console.error('MongoDB connection error:', error);
          globalMongoose.promise = null; // Clear the promise to allow retry
          throw error;
        });
    } catch (error) {
      console.error('Failed to start MongoDB connection:', error);
      globalMongoose.promise = null; // Clear the promise to allow retry
      throw error;
    }
  } else {
    console.log('Using existing MongoDB connection promise');
  }
  
  try {
    globalMongoose.conn = await globalMongoose.promise;
    return globalMongoose.conn;
  } catch (error) {
    console.error('Failed to establish MongoDB connection:', error);
    globalMongoose.promise = null; // Clear the promise to allow retry next time
    throw error;
  }
}

export default dbConnect; 