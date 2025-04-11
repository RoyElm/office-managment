import mongoose from 'mongoose';

// Use the proper environment variable and provide clear error logs
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('MongoDB URI not found. If running in development without MongoDB, the app will use localStorage.');
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
    throw new Error('MONGODB_URI not configured');
  }

  if (globalMongoose.conn) {
    return globalMongoose.conn;
  }

  if (!globalMongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    try {
      globalMongoose.promise = mongoose.connect(MONGODB_URI, opts)
        .then(mongoose => {
          console.log('Connected to MongoDB');
          return mongoose.connection;
        })
        .catch(error => {
          console.error('MongoDB connection error:', error);
          throw error;
        });
    } catch (error) {
      console.error('Failed to start MongoDB connection:', error);
      throw error;
    }
  }
  
  try {
    globalMongoose.conn = await globalMongoose.promise;
    return globalMongoose.conn;
  } catch (error) {
    console.error('Failed to establish MongoDB connection:', error);
    throw error;
  }
}

export default dbConnect; 