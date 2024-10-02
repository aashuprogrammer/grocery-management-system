import mongoose, { Schema } from "mongoose";

const VariantSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "variant_id",
    select: false,
  },
  img: { type: String, required: false },
  name: { type: String, required: true },
  title: { type: String, required: true },
  discount: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
  create_at: { type: Date, default: Date.now(), required: true },
});

const Variant = mongoose.model("variant", VariantSchema);

export default Variant;
