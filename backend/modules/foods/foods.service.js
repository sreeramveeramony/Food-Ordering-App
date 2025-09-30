import { Food } from "./food.model.js";

export async function listFoods() {
  return Food.find().sort({ createdAt: -1 }).lean();
}

export async function addFood({ name, price, category, img, calories }) {
  if (!name || price == null) throw new Error("name & price required");
  const doc = await Food.create({ name, price, category, img, calories });
  return doc.toObject();
}
