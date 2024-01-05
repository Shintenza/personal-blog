import mongoose from 'mongoose';

const connectDB = () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI, {
      dbName: 'blog'
    })
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
