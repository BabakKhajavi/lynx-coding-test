import { useCallback, useMemo, FC, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useAppContext } from '../../hooks/use-app-context';
import { IProduct } from '../../types/interfaces';
import { api } from '../../api';
import { Currency, TotalProductSize } from '../../types/enums';

const totalProductSizes: { label: string; value: TotalProductSize }[] = [
  { label: 'All', value: TotalProductSize.All },
  { label: '5', value: TotalProductSize.Five },
  { label: '10', value: TotalProductSize.Ten },
  { label: '20', value: TotalProductSize.Twenty },
  { label: '50', value: TotalProductSize.Fifty },
];

export const ProductList: FC = () => {
  const { state, dispatch } = useAppContext();
  const { products, currency, totalProductSize } = state;

  const handleButtonClick = useCallback(
    async (value: GridRowParams) => {
      const row = value.row as IProduct;
      if (row.id) {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const response = await api.get(
            `/products/${row.id}?currency=${currency}`,
          );
          dispatch({ type: 'GET_PRODUCT', payload: response.data });
        } catch (error) {
          console.error('Failed to fetch products', error);
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    },
    [dispatch, currency],
  );

  const handleCurrencyChange = useCallback(
    async (value: SelectChangeEvent) => {
      const currency = value.target.value as Currency;
      dispatch({ type: 'UPDATE_CURRENCY', payload: currency });
    },
    [dispatch],
  );

  const handleProductSizeChange = useCallback(
    async (value: SelectChangeEvent) => {
      const size = value.target.value as TotalProductSize;
      dispatch({ type: 'UPDATE_PAGE_SIZE', payload: size });
    },
    [dispatch],
  );

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        let url = `/products?currency=${currency}`;
        if (totalProductSize !== TotalProductSize.All) {
          url += `&size=${totalProductSize}`;
        }
        const response = await api.get(url);
        dispatch({ type: 'SET_PRODUCTS', payload: response.data });
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchProducts();
  }, [dispatch, currency, totalProductSize]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
      },
      {
        field: 'price',
        headerName: `Price(${currency})`,
        width: 150,
        valueFormatter: (params) => {
          const valueFormatted = Number(params.value).toFixed(2);
          return `$${valueFormatted}`;
        },
      },
      {
        field: 'productViewed',
        headerName: '# Views',
        headerAlign: 'center',
        align: 'center',
        width: 150,
      },
    ],
    [currency],
  );

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        display="grid"
        alignItems="center"
        gridTemplateColumns="1fr auto auto"
        gap={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Product List
        </Typography>
        <FormControl variant="outlined" sx={{ width: 120 }}>
          <InputLabel id="currency-select-label">Size</InputLabel>
          <Select
            labelId="size-select-label"
            value={totalProductSize}
            onChange={handleProductSizeChange}
            label="Size"
          >
            {totalProductSizes.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: 120 }}>
          <InputLabel id="currency-select-label">Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            value={currency}
            onChange={handleCurrencyChange}
            label="Currency"
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="CAD">CAD</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        aria-label={'Product List'}
        onRowClick={handleButtonClick}
        sx={{ flexGrow: 1 }}
      />
    </Box>
  );
};
