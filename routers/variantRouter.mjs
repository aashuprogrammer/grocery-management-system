import express from "express";
import {
  createVariant,
  deleteVariant,
  getAllVariant,
  getVariant,
  updateVariant,
} from "../controllers/variantController.mjs";
import { upload } from "../imageUploader/multer.mjs";
const router = express.Router();
router.post("/create_variant", upload.single("image"), createVariant);
router.get("/get_variant", getVariant);
router.get("/get_all_variant", getAllVariant);
router.patch("/update_variant/:id", updateVariant);
router.delete("/delete_variant/:id", deleteVariant);

export default router;
