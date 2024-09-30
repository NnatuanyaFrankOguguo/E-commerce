import mongoose from 'mongoose'
import moment from 'moment'

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    items : {
        type : Array,
        required : true
    },
    amount : {
        type : Number,
        required : true,
    },
    address : {
        type : Object,
        required : true
    },
    status : {
        type : String,
        default: "Food Processing" //whenever a new order will be placed the status of the order will be default Food processing
    },
    orderdate : {
        type : Date,
        default : moment().format('YYYY-MM-DD HH:mm:ss')
    },
    payment : {
        type : Boolean,
        default : false,
    }//whenever a new order will be place the payment status will be false
}, {
    timestamps: true
})

const orderModel = mongoose.models.order || mongoose.model('orders', orderSchema)

export default orderModel
//now we have successfully created the ordermodel we will save and go to the ordercontroller