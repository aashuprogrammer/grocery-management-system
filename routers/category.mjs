import express from 'express'
import { createCategory, getAllCategory } from '../controllers/category.mjs'

const categoryRoute = express.Router()

categoryRoute.post('/category_name',createCategory)
categoryRoute.get('/get_all_category', getAllCategory)

export{categoryRoute}