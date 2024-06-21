import mongoose,{ Schema } from "mongoose"

const subscriptionSchea= new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,// one who is subcribing
        ref:"User"

    },
    channel:{
        type:Schema.Types.ObjectId,// one to who subscriber is subscribing
        ref:"User"
    }
},{timestamps:true})



export const Subscription= mongoose.model("Subscription", subscriptionSchea)