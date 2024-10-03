import express from 'express';
import { createProductTag, getAllProductTag } from '../controllers/productTag.mjs';

const ProductTagRoute = express.Router();

ProductTagRoute.post('/create_product_tag', createProductTag);
ProductTagRoute.post('/get_all_product_tags', getAllProductTag);

export{ProductTagRoute}