const Post = require("../models/post");
const Comment = require("../models/comment");
const express = require('express')
const router = express.Router()

router.post('/',async(req,res)=>{
    try{
        const {comment,post} = req.body
        const {userId} = req.user
        const newComment = new Comment({comment, author: userId,post})
        await newComment.save()
        await Post.findByIdAndUpdate(post, {
            $push: { comment: newComment._id },
          });
        res.status(200).send({message:'Comment created'})
    }
    catch(e){
        res.status(500).send(e);
    }
})






module.exports = router