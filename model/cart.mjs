import mongoose, { Schema } from "mongoose";

const CartSchema = new mongoose.Schema({
  variant_id: { type: Schema.Types.ObjectId, ref: "cart_id", select: false },
  create_at: { type: Date, default: Date.now(), required: true },
});

const HistorySchema = new mongoose.Schema({
  cart_id: { type: Schema.Types.ObjectId, ref: "history_id", select: false },
});

const Cart = mongoose.model("cart", CartSchema);
const History = mongoose.model("history", HistorySchema);

export { Cart, History };
