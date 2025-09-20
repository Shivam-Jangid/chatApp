import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DB_URL;

export const connectDB = async () => {
    try{
        await mongoose.connect(dbUrl!);
        console.log("Connected to the database successfully");
    }
    catch(err){
        console.error("Failed to connect to the database", err);
    }
}