import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Category = mongoose.model("category", categorySchema);
export { Category };
