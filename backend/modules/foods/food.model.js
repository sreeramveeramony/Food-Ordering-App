import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, default: "General" },
    img: { type: String },
    calories: { type: Number, min: 0 }
  },
  { timestamps: true }

);
export const Food=mongoose.model("Food",FoodSchema);