/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const resp = await mongoose.connect(process.env.MONGODB_URI!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${resp.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;
