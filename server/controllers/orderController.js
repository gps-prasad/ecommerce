import orderModel from '../models/orderModel.js';

export const addOrderController = async(req,res) =>{
    try{
        console.log(req.body)
        const {firstName,lastName,email,mobile,address1,address2,country,city,state,zip,products,total,user,payment_Id,payee_name} = req.body
        const order = new orderModel(req.body)
        await order.save()
        return res.status(200).send({
            success:true,
            message:'order created successfully',
            id:order._id
        })
    }
    catch(error){
        return res.status(500).send({message:error})
    }
}

export const getOrdersController = async(req,res) =>{
    try {
        const orders = await orderModel.find({user:req.body.user._id})
        return res.status(200).send({
            message:'orders',
            orders
        })
    }
    catch(error){
        return res.status(500).send({message:error})
    }
}

export const getOrderByIdController = async(req,res) => {
    try {
        const {id} = req.params
        const order = await orderModel.findById(id)
        return res.status(200).send({
            message:'orders',
            order
        })
    }
    catch(error){
        return res.status(500).send({message:error})
    }
}