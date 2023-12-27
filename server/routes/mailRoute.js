import express from 'express';
import { sendMail } from '../index.js';
import userModel from '../models/userModel.js';

const router = express.Router()

router.post('/query',async(req,res)=>{
    const {email,name} = req.body
    
      const data = sendMail(email,'Query Received Aknowledgement',`hi ${name}, we received your query we will resolve the above mentioned issue as soon as possible`)
    return res.status(200).send({
        success: true,
        message: data,
        email,
        name,
      }
    )
})


router.post('/forgot-password',async(req,res)=>{
    const {email} = req.body
    const otp = Math.floor(Math.random()*10000).toString()
    const user = await userModel.findOneAndUpdate({email},{otp:otp})
    const data = sendMail(email,'Password Reset OTP',`OTP : ${otp}`)
    return res.status(200).send({
        success: true,
        message: data,
        user
      }
    )
})

export default router