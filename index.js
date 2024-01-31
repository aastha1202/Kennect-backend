
const express = require('express')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const middleware = require('./middleware')
const commentRoutes= require('./routes/comment')
const cors = require('cors')

const  app = express()
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors())
mongoose.connect("mongodb+srv://admin_aastha:Test123@cluster0.edhnxlr.mongodb.net/kennectTask" )


app.use('/user',userRoutes)
app.use('/posts',middleware,postRoutes)
app.use('/comments',middleware,commentRoutes)




app.listen(3000, ()=>{
    console.log('app listening on port 3000')
})
