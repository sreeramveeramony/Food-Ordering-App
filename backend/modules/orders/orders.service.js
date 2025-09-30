import { Order } from "./orders.model.js";
import { Food } from "../foods/food.model.js";

export async function listOrders() {
  // populate to show food name/price in admin
  return Order.find()
    .sort({ createdAt: -1 })
    .populate({ path: "foodId", select: "name price" })
    .lean();
}

export async function placeOrder({ foodId, fulfillment }) {
  if (!["pickup", "delivery"].includes(fulfillment)) {
    throw new Error("fulfillment must be 'pickup' or 'delivery'");
  }
  const food = await Food.findById(foodId).lean();
  if (!food) throw new Error("food not found");

  const doc = await Order.create({ foodId, fulfillment });
  return doc.toObject();
}
