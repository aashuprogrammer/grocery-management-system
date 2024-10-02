import express from "express";
import { reviews } from "../controllers/review.mjs";
const reviewRouter = express.Router();

reviewRouter.post("/create_review", reviews);

export { reviewRouter };
