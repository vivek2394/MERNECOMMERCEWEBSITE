import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet'
import ConnectDB from './Config/connectDB.js';
import userRoute from './routes/user.route.js'; 
import categoryRoute from './routes/category.route.js';
import uploadRoute from './routes/upload.route.js';
import subCategoryRoute from './routes/subCategory.route.js';
import productRoute from './routes/product.router.js';
import cartRoute from './routes/cart.routr.js';
import addressRoute from './routes/address.route.js';
import orderRoute from './routes/order.routes.js'; 
const app = express();

app.use(cors({ 
    credentials : true,
    origin : process.env.FRONTEND_URL,
}))
app.use(express.json())
app.use(cookieParser()) 
app.use(morgan("dev"))
app.use(helmet({
    crossOriginResourcePolicy : false
}))


const PORT = process.env.PORT || 8080; 

app.get("/",(req,res)=>{
    res.json({
        message:"welcome to ecommerce website.."
    }) 
})

app.use("/api/user",userRoute)
app.use("/api/file",uploadRoute)
app.use("/api/product",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/address",addressRoute)
app.use("/api/order",orderRoute)
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subCategoryRoute);

ConnectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})

     