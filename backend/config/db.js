import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Code 1 means error - 0 means success
    };
};