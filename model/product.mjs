import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  img: { type: String, required: false },
  name: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  discount: { type: String, required: true },
  discription: { type: String, required: true },
});

const Product = mongoose.model("product", ProductSchema);

export default Product;
