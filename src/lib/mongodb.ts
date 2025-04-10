import mongoose from 'mongoose';

// Use the proper environment variable and provide clear error logs
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable in .env.local with a valid MongoDB connection string');
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Better error handling for authentication issues
if (MONGODB_URI.includes('<db_password>')) {
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