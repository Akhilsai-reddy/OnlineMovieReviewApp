import mongoose from "mongoose";
import { Schema } from "mongoose";


const usersSchema=new Schema({
    FirstName:String,
    LastName:String,
    email:String,
    PhoneNumber:Number,
    Password:String,
    Location:String,
},{
    timestamps:true
})

export default new mongoose.model("Users",usersSchema)