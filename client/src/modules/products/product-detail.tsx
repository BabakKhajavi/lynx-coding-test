import { FC, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppContext } from '../../hooks/use-app-context';

export const ProductDetail: FC = () => {
  const { state, dispatch } = useAppContext();
  const { productDetail: product, currency } = state;

  const handleBackToList = useCallback(() => {
    dispatch({ type: 'GET_PRODUCT', payload: null });
  }, [dispatch]);

  if (!product) {
    return <Typography variant="h6">No product selected</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" mt={3}>
      <Box mb={2}>
        <Typography
          component="p"
          sx={{ cursor: 'pointer' }}
          onClick={handleBackToList}
        >
          {'<< Back to List'}
        </Typography>
        <Typography variant="h6">Product Details</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>ID:</strong> {product.id}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Name:</strong> {product.name}
        </Typography>
      </Box>
      <Box display="flex" mb={2}>
        <Typography variant="body1" sx={{ width: 200 }}>
          <strong>Price:</strong>
          <span>{`${currency.toUpperCase()} $${product.price.toFixed(2)}`}</span>
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong># Viewed:</strong> {product.productViewed}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Description:</strong> {product.description}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Created Date:</strong>{' '}
          {new Date(product.createdDate).toDateString()}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Updated Date:</strong>{' '}
          {new Date(product.updatedDate).toDateString()}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Deleted Date:</strong>{' '}
          {new Date(product.deletedDate).toDateString()}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">
          <strong>Is Deleted:</strong> {product.isDeleted ? 'Yes' : 'No'}
        </Typography>
      </Box>
    </Box>
  );
};
