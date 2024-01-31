const Post = require("../models/Post");
const express = require('express')
const router = express.Router()

router.post('/',async(req,res)=>{
    try{
        const {content} = req.body
        const {userId} = req.user
        const post = new Post({content, author: userId})
        await post.save()
        res.status(200).send({message:'Post created'})
    }
    catch(e){
        res.status(500).send(e);
    }
})


router.get('/',async(req,res)=>{
    try{
        const post = await Post.find().sort({ createdAt: 'desc' }).populate('author').populate({
            path: 'comment',
            populate: { path: 'author' } 
        });

            res.status(200).send(post)
        
    }
    catch(e){
        res.status(500).send(e);   
    }
})



router.get('/search',async(req,res)=>{
    try{
        const query = req.query.q;
        const posts = await Post.find({ content: { $regex: new RegExp(query, 'i') } }).sort({ createdAt: 'desc' }).populate('author').populate({
            path: 'comment',
            populate: { path: 'author' } 
        })
            res.status(200).send(posts)
    }
    catch(e){
        res.status(500).send(e);   
    }
})


module.exports = router