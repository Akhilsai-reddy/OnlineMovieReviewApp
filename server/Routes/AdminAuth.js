import { Router } from "express"
import Admin from "../Models/Admin.js";

const router=Router();

router.post('/register',async(req,res)=>{
    const {FirstName,email,password}=req.body;

    const admin= new Admin({
        FirstName,
        email,
        password
    })
  await admin.save();
  res.send('success..')
})

router.post('/login',async(req,res)=>{

 
    const {values}=req.body;
    const email=values.email
    const admin= await Admin.findOne({email})

   if(!admin){
    res.send('invalid credentials')
   }
   else if(admin.password!==values.password){
    res.send('invalid password')
   }
else{
    res.send(admin)
}
  
})

export default router;