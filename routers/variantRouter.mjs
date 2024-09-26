import express from "express";
import {
  createVariant,
  deleteVariant,
  getAllVariant,
  getVariant,
  updateVariant,
} from "../controllers/variantController.mjs";
const router = express.Router();
router.post("/create_variant", createVariant);
router.get("/get_variant", getVariant);
router.get("/get_all_variant", getAllVariant);
router.patch("/update_variant/:id", updateVariant);
router.delete("/delete_variant/:id", deleteVariant);

export default router;
