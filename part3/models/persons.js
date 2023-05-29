
const mongoose = require('mongoose')



const password = process.env.MONGO_DB_PW


const url = `mongodb+srv://xuanhaotan:${password}@cluster0.btr3mlg.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: {
        type:String,
        minlength:3,
        required: true},
    number: {
        type:String,
        validate:{
            validator: (v) =>{
                return /\d{2,3}-\d+/.test(v)},
            message:props => `${props.value} is not a valid phone number. It should contain XXX-XXXXX.`
        },
        minlength:8,
        required: true} })

const Person = mongoose.model('Person', noteSchema)

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
  
module.exports = Person