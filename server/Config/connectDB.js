import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function ConnectDB() {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI);
         console.log("mongoDB is connected...");
         

    } catch (error) {
        console.log("Mongodb connect error",error)
        process.exit(1)
        
    }
}

export default ConnectDB;