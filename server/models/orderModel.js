import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    address1:{
        type:String
    },
    address2:{
        type:String
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zip:{
        type:String
    },
    products:{},
    total:{
        type:Number,
        // require:true
    },
    user:{
        type: mongoose.ObjectId,
        ref:'users'
    },
    payment_Id:{
        type:String,
        // require:true
    },
    payee_name:{
        type:String,
        // require:true
    },
    orderDate: Date,
},{timestamps:true})

export default mongoose.model('order',orderSchema)