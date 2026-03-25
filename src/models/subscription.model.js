import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    //as both are user at the end
    subscriber: {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    channel: {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true})


export const Subscription = mongoose.model("Subsciption", subscriptionSchema)