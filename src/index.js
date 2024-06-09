//require('dotenv').config({path:'./env'}) 
// asal ch enu apa import c kar skde hai par oo thoda code change karna painda package.json ch 
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})
connectDB()



//first approach db nu connect karn di 
/*import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express";
const app=express();

// function connectDb(){}

// connectDb(); one way write db code in this function run 

;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error:",error);// e ta likhya kayi var db nal connect ho k nhi chalda te e dss davge kyu nhi chalda 
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port : ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.error("Error", error)
        throw error

    }
}) () // enu efi bolde haige te e jada shi rehnda uppe r vale tarike to e bass first method da ik hor tarika likhn da 

*/