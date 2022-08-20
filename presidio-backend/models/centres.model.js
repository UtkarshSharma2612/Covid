const mongoose = require('mongoose')

const VaccinationCentreSchema = new mongoose.Schema({
    name : {type: String, required:true},
    address: {type: String, required: true},
},
    {collection: 'centres'}
)
const VaccinationCentreModel= mongoose.model('VaccinationCentre',VaccinationCentreSchema)
module.exports = VaccinationCentreModel