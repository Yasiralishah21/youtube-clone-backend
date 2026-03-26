import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; 

//db can be connected in only one line but this is how production works
const connectDB = async () => {
    try {
       const connectionResponce = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`\n MongoDB connected !!  DB Host ${connectionResponce.connection.host}`);
       
    } catch (error) {
        console.error("Error", error)
    }
}
export default connectDB

//data can be taken as urls or in req.body (as in user.controller.js from db)