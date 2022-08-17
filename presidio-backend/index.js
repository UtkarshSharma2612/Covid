require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const bcrypt = require("bcrypt")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(process.env.MONGO_DB_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// console.log(process.env.MONGO_DB_URI)

mongoose.connection.once('open', () => {
    console.log('connected to db');
})
app.get("/api/check", async(req,res)=> {
    return res.status(200).json({
        success: true,
        message: "Server is running..."
    })
})
app.post('/api/register', async(req,res)=> {
    console.log(req.body)
    try{
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            //password: req.body.password,
            password:hashPassword(req.body.password)
            
        })
        res.json({status: 'ok'})
    }catch (err)
    {
        res.json({status: 'error', error: 'Duplicate email'})
    }
})
async function hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash
}

app.post('/api/login', async(req,res)=> {
        const user = await User.findOne({
            email: req.body.email,
            //password: req.body.password,
            password :comparePassword(req.body.password)
        })
        if(user){
           return res.json({status:'ok',user: true}) 
        }
        else{
            return res.json({ status: 'error',user:false})
        }
})
async function comparePassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
}

app.listen(1337, () => {
    console.log('Server started on 1337')
})