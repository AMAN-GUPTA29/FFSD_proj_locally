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
    },
    like : {
        type : Number,
        default : 0
    },
    dislike : {
        type : Number,
        default : 0
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

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const adminModel = mongoose.model('admin',adminSchema)
const  requestSchema = new mongoose.Schema(
    {
        serviceid:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "services",
            required: true
        },
        customerid:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "customer",
            required: true
        },
        accepted:{
            type: Boolean,
            default : false,
            required: true
        },
        sellerid:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"seller",
            required:true
            
        },
    }
)
const requestModel = mongoose.model('requests', requestSchema)




const  historySchema = new  mongoose.Schema({
    customerID : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'customer'
    },
    sellerID : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'seller'
    }
})
const historyModel = mongoose.model('history', historySchema)

const  broadcastSchema = new  mongoose.Schema({
    message : {
        type : String,
        required : true
    }
})
const broadcastModel = mongoose.model('broadcast', broadcastSchema)


module.exports.customerModel = customerModel;
module.exports.sellerModel = sellerModel;
module.exports.sellerDetail = sellerDetail;
module.exports.customerDetail = customerDetail;
module.exports.servicesModel = servicesModel;
module.exports.adminModel = adminModel;
module.exports.requestModel = requestModel;
module.exports.historyModel = historyModel;
module.exports.broadcastModel = broadcastModel