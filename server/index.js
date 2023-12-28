import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'
import mailRoute from './routes/mailRoute.js'
import { transporter } from "./helpers/mail.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use('/api/v1/orders',orderRoute);
app.use('/api/v1/mail',mailRoute);

// app.get("/", (req, res) => {
//     res.send("<h1>Welcome to ecommerce app</h1>");
//   });

export const sendMail = (toAddress,subject,message) => {
  const mailOptions = {
    from: process.env.EMAIL,   // Sender address (replace with your Gmail email)
    to: toAddress, // Receiver address
    subject: subject,
    text: message
  };
  
  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error.message;
    } else {
      return info.response;
    }
  });
}

app.listen(3001, () => {
  // sendMail();
    console.log(
      `Server Running on 3001 port`
    );
  });