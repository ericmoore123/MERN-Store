import express from "express";

import {getProducts, getProduct, createProduct, updateProduct, deleteProductById,} from "../controllers/Product.controller.js"

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProductById);

export default router;