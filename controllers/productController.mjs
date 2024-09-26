import Product from "../model/product.mjs";

////////// Admin Function ////////////
const createProduct = async (req, res) => {
  try {
    const adminCreateProduct = await Product.create({
      name: req.body.name,
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      discription: req.body.discription,
    })
      .then((p) => {
        res.json({
          adminCreateProduct: p,
          message: "Product Carete",
        });
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  } catch (err) {
    return res.json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const gProtuct = await Product.findById(req.body.id);
    res.json({
      gProtuct: gProtuct,
      message: "Get a Product",
    });
  } catch (err) {
    res.json(err);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const allProduct = await Product.find(req.body);
    res.json({
      allProduct: allProduct,
      message: "Get All Product ",
    });
  } catch (err) {
    res.json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const upProduct = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      discription: req.body.discription,
    });

    res.json({
      upProduct: upProduct,
      message: "Product Update",
    });
  } catch (err) {
    res.json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deProduct = await Product.findByIdAndDelete(req.params.id);
    res.json({
      deProduct: deProduct,
      message: "Product Deleted",
    });
  } catch (err) {
    res.json(err);
  }
};

export {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
