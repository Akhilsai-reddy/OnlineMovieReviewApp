import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminSchema=new Schema({
    FirstName:String,
    email:String,
    password:String,
})

export default new mongoose.model('Admin',adminSchema)
