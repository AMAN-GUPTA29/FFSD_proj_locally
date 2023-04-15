const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            
        },
        password: {
            type: String,
            required: true
        },
        email : {
            type: String,
            required : true,
            unique: true
        }
    }
)
const customerModel = mongoose.model('customer', customerSchema)
const sellerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
        },
        password :{
            type : String,
            required : true
        }

    }
)
const sellerModel =mongoose.model('seller',sellerSchema)

module.exports.customerModel = customerModel;
module.exports.sellerModel = sellerModel;