import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  discription: { type: String, required: true },
  public_id: { type: String, required: true },
  create_at: { type: Date, default: Date.now(), required: true },
});

const Product = mongoose.model("product", ProductSchema);

export default Product;
