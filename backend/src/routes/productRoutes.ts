/* eslint-disable import/no-unresolved */
import express from 'express';
import {
  createproduct, getProducts, getProductById, updateProduct, deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from './uploadRoute.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);
router.post('/', protect, upload.single('image'), createproduct);

export default router;
