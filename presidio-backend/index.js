const express = require('express')
const app = express()
const cors =require('cors')
const mongoose = require('mongoose')
//const User = require('./models/user.model')


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:2701/presidio')


app.post('/api/register', async(req,res)=> {
    console.log(req.body)
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({status: 'ok'})
    }catch (err)
    {
        res.json({status: 'error', error: 'Duplicate email'})
    }
})

app.post('/api/login', async(req,res)=> {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        
    
        res.json({status: 'error', error: 'Duplicate email'})
         
        if(user){
           return res.json({status:'ok',user: true}) 
        }
        else{
            return res.json({ status: 'error',user:false})
        }
})

app.listen(1337, () => {
    console.log('Server started on 1337')
})