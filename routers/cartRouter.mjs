import express from "express";
import { createCart, getMyCartItem } from "../controllers/cartController.mjs";
const router = express.Router();

router.post("/create_cart", createCart);
router.get("/get_cart_item", getMyCartItem);

export default router;
