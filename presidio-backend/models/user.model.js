const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique:true},
    password: {type: String, required: true},
},
    {collection: 'user-data'}
)
// const Vaccination_Centre =new mongoose.Schema({
//     name : {type: String, required:true},
//     address: {type: String, required: true},
// },
//     {collection: 'vaccinationCenter'}
// )
// const appointment = new mongoose.Schema({
//     centerID : {type: Int32Array, required: true, unique:true},
//     name : {type: string, required: true},
//     name : {type: datetime, required: true},
// },
//     {collection: 'user-data'}
// )

const model1= mongoose.model('UserData',User)
module.exports = model1
// const model2= mongoose.model('UserData',Vaccination_Centre)
// module.exports = model2
// const model3= mongoose.model('UserData',appointment)
// module.exports = model3