import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT  from "jsonwebtoken";


export const registerController = async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      //validations
      console.log(req.body)
      console.log(name,email,password,phone,address)
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!phone) {
        return res.send({ message: "Phone no is Required" });
      }
      if (!address) {
        return res.send({ message: "Address is Required" });
      }
      //check user
      const exisitingUser = await userModel.findOne({ email });
      //exisiting user
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "Already Register please login",
        });
      }
      //register user
      const hashedPassword = await hashPassword(password);
      //save
      const user = await new userModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
      }).save();
  
      res.status(200).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
      });
    }
  };

  export const userDetailsUpdateController = async(req,res) => {
    try{
      const { name, email, phone, address } = req.body;
      console.log(req.user)
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!phone) {
        return res.send({ message: "Phone no is Required" });
      }
      if (!address) {
        return res.send({ message: "Address is Required" });
      }
      const data = await userModel.findByIdAndUpdate(req.user._id,{name,phone,email,address},{new:true})
      if (data){
        return res.status(200).send({
          success: true,
          message: "Updated successfully...",
          data,
        });
      }
      else{
        return res.status(500).send({
          success: false,
          message: "Errro In Updation..",
          data,
        });
      }

    }
    catch(error){
      return res.status(500).send({
        success: false,
        message: "Errro In Updation..",
        error,
      });
    }
  }


  export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      console.log(req.body)
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };