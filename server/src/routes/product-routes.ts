import { Router } from 'express';
import {
  getProducts,
  getSingleProduct,
} from '../controllers/product-controller';
import {
  getProductsValidator,
  getProductValidator,
} from '../models/product/product-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = Router();

router.get('/', getProductsValidator, validateRequest, getProducts);
router.get('/:id', getProductValidator, validateRequest, getSingleProduct);

export { router as productRouter };
