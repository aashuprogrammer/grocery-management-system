import { Category } from "../model/category.mjs";

const createCategory = async (req, res) => {
  try {
    const category = new Category({
      category_name: req.body.category_name,
    });
    await category.save();
    res.json({ msg: "Create Category Success", category });
  } catch (error) {
    res.json(error);
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({ msg: "Get All Category Success", category });
  } catch (error) {
    res.json(error);
  }
};

export { createCategory, getAllCategory };
