// 2 ways to connect with Db one is using write whole code in main index.js and run from that but this willl make index.js very bad messy 
//  another one is write code in this file and using function run that code 


import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
//db likhn vale imp 2 chize dhyan rakhni pheli ki async await lagana hi lagana kyu ki time lagda connect karn ch dusra try catch nal likhna pta nhi ki error aa jave

const connectDB= async()=>{
    try {
        const connectionInstance= await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB host: ${connectionInstance.connection.host}`);
        //console.log(JSON.stringify(connectionInstance));
        
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
    }
}

export default connectDB