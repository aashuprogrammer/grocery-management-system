import { Category } from "../model/category.mjs";
import { CustomError, errorCapture } from "../error.mjs";
const createCategory = errorCapture(async (req, res, next) => {
  const category = new Category({
    category_name: req.body.category_name,
  });
  await category.save();
  if (category) {
    res.json({ msg: "Create Category Success", category });
  }
  throw new CustomError(null, 403, "category not created");
});

const getAllCategory = errorCapture(async (req, res, next) => {
  const category = await Category.find();
  if (category < 1) {
    throw new CustomError(null, 404, "category is not found");
  }
  return res.json({ msg: "Get All Category Success", category });
});

export { createCategory, getAllCategory };
