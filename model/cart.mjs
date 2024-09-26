import mongoose, { Schema } from "mongoose";

const CartSchema = new mongoose.Schema({
  variant_id: { type: Schema.Types.ObjectId, ref: "cart_id", select: false },
  create_At,
});
