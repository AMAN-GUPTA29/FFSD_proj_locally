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

const sellerDetail = mongoose.model('sellerDetail', new mongoose.Schema({
    aadhar : {
        type : Number,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true
    },
    pointer : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "seller"
    }
}));

const customerDetail = mongoose.model('customerDetail', new mongoose.Schema({
    address : {
        type : String,
        required : true,
    },
    pincode : {
        type : Number,
        required : true
    },
    pointer : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "customer"
    }
}))

const servicesModel = mongoose.model('services', new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        required : true
    },
    charge : {
        type : Number
    },
    description : {
        type : String,
        required : true
    },
    pointer : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "seller"
    }
}))

module.exports.customerModel = customerModel;
module.exports.sellerModel = sellerModel;
module.exports.sellerDetail = sellerDetail;
module.exports.customerDetail = customerDetail;
module.exports.servicesModel = servicesModel;