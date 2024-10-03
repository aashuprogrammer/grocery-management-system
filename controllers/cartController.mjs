import { Cart } from "../model/cart.mjs";

const createCart = async (req, res) => {
  try {
    const createCa = await Cart.create({
      variant_id: req.body.variant_id,
    })
      .then((c) => {
        res.json({
          createCa: c,
          message: "Cart Careted",
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

const getMyCartItem = async (req, res) => {
  try {
    // const getItem = await Cart.find({ product_id: req.body.product_id })
    const getItem = await Cart.aggregate({ variant_id: req.body.variant_id })

      .select("+variant_id")
      .populate("variant_id");
    res.json({
      getItem: getItem,
      message: "Get My Cart Item",
    });
  } catch (err) {
    res.json(err);
  }
};

export { createCart, getMyCartItem };
