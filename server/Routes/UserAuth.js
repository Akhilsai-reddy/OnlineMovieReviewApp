import { Router } from "express";
import User from "../Models/User.js";

const router=Router();

router.post('/', async(req,res)=>{
    const {FirstName,LastName,email,PhoneNumber,Password,Location}=req.body;

    const userExist=await User.findOne({email})

    if(userExist){
        res.send("user already exist..")
        return;
    }
    const user= new User({
        FirstName,
        LastName,
        email,
        PhoneNumber,
        Password,
        Location
    })

    await user.save()
    res.send("Registered success..")
})

router.post('/login',async(req,res)=>{
    const {email,Password}=req.body;
       const user= await User.findOne({email})

       if(!user){
        res.send('not found')
        return;
       }
       else if(user.Password!==Password){
        res.send('invalid password')
       }
       else{
        res.send(user)
       } 
})



export default router;