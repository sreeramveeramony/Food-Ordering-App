import { Router } from "express";
import { listFoods, addFood } from "./foods.service.js";

const router = Router();

router.get("/", async (_req, res) => {
  const items = await listFoods();   // <-- must be the Mongo function
  res.json(items);
});

router.post("/", (req, res) => {
  try {
    const created = addFood(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;   // <-- IMPORTANT: default export
