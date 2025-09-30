import { Router } from "express";
import {listOrders, placeOrder } from "./orders.service.js";

const router = Router();

router.get("/",  async (req, res) =>{
    const orders=await listOrders();
    res.json(orders);
});

router.post("/", (req, res) => {
  try {
    const created = placeOrder(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;   // <-- IMPORTANT
