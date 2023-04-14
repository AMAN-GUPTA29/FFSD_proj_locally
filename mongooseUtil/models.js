const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
    {
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
    }
)
const customerModel = mongoose.model('customer', customerSchema)

module.exports.customerModel = customerModel;