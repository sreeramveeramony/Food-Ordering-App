import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


import { connectDB } from "./db.js";
import foodsRoutes from"./modules/foods/foods.routes.js";
import OrderRoutes from"./modules/orders/orders.routes.js";
connectDB(process.env.MONGO_URI);

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/foods",foodsRoutes);
app.use("/api/orders",OrderRoutes);

const PORT=4000;
const start =async()=>{
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, ()=>console.log(`API http://localhost:${PORT}`));
};
start();


