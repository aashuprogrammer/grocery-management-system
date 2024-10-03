import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controllers/productController.mjs";
import { upload } from "../imageUploader/multer.mjs";

const router = express.Router();

router.post("/create_product", upload.single("image"), createProduct);
router.get("/get_product", getProduct);
router.get("/get_all_product", getAllProduct);
router.patch("/update_product/:id", updateProduct);
router.delete("/delete_product/:id", deleteProduct);

export default router;
