import express from 'express';
import { createTag, getAllTag } from '../controllers/tag.mjs';

const tagRoute = express.Router();

tagRoute.post('/create_tag', createTag);
tagRoute.get('/get_all_tag', getAllTag);

export {tagRoute}