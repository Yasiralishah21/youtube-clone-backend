import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; 

const connectDB = async () => {
    try {
       const connectionResponce = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`\n MongoDB connected !!  DB Host ${connectionResponce.connection.host}`);
       
    } catch (error) {
        console.error("Error", error)
    }
}
export default connectDB