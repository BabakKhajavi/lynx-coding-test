import React, { createContext, useReducer, ReactNode, FC } from 'react';
import { IProduct } from '../types/interfaces';
import { Currency, TotalProductSize } from '../types/enums';

interface AppState {
  products: IProduct[];
  productDetail: IProduct | null;
  isLoading: boolean;
  selectedProductId: number | null;
  currency: Currency;
  totalProductSize?: TotalProductSize;
}

const initialState: AppState = {
  products: [],
  productDetail: null,
  isLoading: false,
  selectedProductId: null,
  currency: Currency.USD,
  totalProductSize: TotalProductSize.Five,
};

type Action =
  | { type: 'UPDATE_PAGE_SIZE'; payload: TotalProductSize }
  | { type: 'UPDATE_CURRENCY'; payload: Currency }
  | { type: 'SET_PRODUCT_ID'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PRODUCTS'; payload: IProduct[] }
  | { type: 'GET_PRODUCT'; payload: IProduct | null }
  | { type: 'UPDATE_PRODUCT'; payload: IProduct }
  | { type: 'REMOVE_PRODUCT'; payload: number };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'UPDATE_PAGE_SIZE':
      return { ...state, totalProductSize: action.payload };
    case 'UPDATE_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_PRODUCT_ID':
      return { ...state, selectedProductId: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'GET_PRODUCT':
      return { ...state, productDetail: action.payload };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product,
        ),
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export const AppContext = createContext<
  { state: AppState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);
export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
