// require('dotenv').config({path : './env'})
import dotenv from 'dotenv';
// import mongoose from "mongoose"
// import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js"
import {app} from "./app.js"
import express from "express"
dotenv.config({ path : './.env' });

// const app = express();
connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running on PORT ${process.env.PORT}`);
    })
})
.catch ((err) => {
    console.log("MongoDB connection failed", err);
    
})

















// // AS DB IS IN DIFF CONTINENT, SO WE MUST USE ASYNC await, TRY CATCH FRO ERRORS 
// // IT IS BETTER APPROACH, NOTHING ELSE
// /*
// ( async ()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on(("error"), (error) => {
//         console.log("error", error)
//        })
//        app.listen(process.env.PORT, ()=>{
//         console.log(`Application is running on port 8000 ${process.env.PORT}`)
//        })
//     } catch (error) {
//         console.error("Error : ", error);
//         throw error
//     }
// })()
// */