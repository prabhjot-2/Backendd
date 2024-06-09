// 2 ways to connect with Db one is using write whole code in main index.js and run from that but this willl make index.js very bad messy 
//  another one is write code in this file and using function run that code 


import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB= async()=>{
    try {
        const connectionInstance= await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB host: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

export default connectDB