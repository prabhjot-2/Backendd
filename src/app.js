import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"


const app= express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,// e mtlb kon konsa allow kar rahe ho origin(url)
    credentials: true
}))

app.use(express.json({limit: "16kb"}))// e middle ware use kita jo ki json value le skega te nal odi limit 16 kb rakhi bss
app.use(express.urlencoded({extended: true , limit:"16kb"}))// e kita ki url nnu accept kar ske 
app.use(express.static("public"))// e ta rakhida jo ki koi asset rakhna hove oo public ch rakh skde jive favicomn pdf 
app.use(cookieParser())// e ki karda jo mera server us to user de browser di cookie access kar pau or uski cookie set kar pau means CRUD operation use kar pau




export {app}
