import { Box } from '@mui/material';
import { ProductDetail, ProductList } from './products';
import { useAppContext } from '../hooks/use-app-context';

export const ProductsContainer = () => {
  const { state } = useAppContext();
  const { productDetail } = state;
  return <Box p={6}>{productDetail ? <ProductDetail /> : <ProductList />}</Box>;
};
