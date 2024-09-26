import Variant from "../model/variant.mjs";

const createVariant = async (req, res) => {
  try {
    const creVariant = await Variant.create({
      product_id: req.body.product_id,
      img: req.body.img,
      name: req.body.name,
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      quantity: req.body.quantity,
    })
      .then((v) => {
        res.json({
          creVariant: v,
          message: "Create Variant",
        });
      })
      .catch((err) => {
        return res.json(err);
      });
  } catch (err) {
    res.json(err);
  }
};

const getVariant = async (req, res) => {
  try {
    const GetVariant = await Variant.findById(req.body.id);
    res.json({
      GetVariant: GetVariant,
      message: "Get Variant",
    });
  } catch (err) {
    res.json(err);
  }
};

const getAllVariant = async (req, res) => {
  try {
    const allVariant = await Variant.find(req.body);
    res.json({
      allVariant: allVariant,
      message: "Get All Variant",
    });
  } catch (err) {
    res.json(err);
  }
};

const updateVariant = async (req, res) => {
  try {
    const upVariant = await Variant.findByIdAndUpdate(req.params.id, {
      product_id: req.body.product_id,
      img: req.body.img,
      name: req.body.name,
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      quantity: req.body.quantity,
    });
    res.json({
      upVariant: upVariant,
      message: "Vaniant Update",
    });
  } catch (err) {
    res.json(err);
  }
};

const deleteVariant = async (req, res) => {
  try {
    const deVariant = await Variant.findByIdAndDelete(req.params.id);
    res.json({
      deVariant: deVariant,
      message: "Delete variant",
    });
  } catch (err) {
    res.json(err);
  }
};
export {
  createVariant,
  getVariant,
  getAllVariant,
  updateVariant,
  deleteVariant,
};
