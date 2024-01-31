const User = require("../models/user");
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
require('dotenv').config()

router.post('/register', async(req,res)=>{
    const {userName, password} = req.body
    try{
        const hashedPassword= await bcrypt.hash(password,10)
        const user = new User({userName, password:hashedPassword})
        await user.save()
        res.status(201).send('User registered successfully.');
    }
    catch(e){
        res.status(500).send(e);
    }
})

router.post('/login', async(req,res)=>{
    const {userName, password} = req.body
    try{
        const user = await User.findOne({userName})
        if(!user){
            res.status(400).json({message: "User not found"}); 
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(process.env.SECRET_KEY)
        const secretKey =process.env.SECRET_KEY

        if (passwordMatch) {
         const token= jwt.sign({userId: user._id, userName: user.userName}, secretKey, { expiresIn: '1h'} )
          return res.status(200).json({ message: 'Login successful'  ,userId:user.userId , token});
        } else {
          return res.status(401).json({ message: 'Invalid password' });
        }    }
    catch(e){
        res.status(500).send(e.message);
    }
})

module.exports = router;
