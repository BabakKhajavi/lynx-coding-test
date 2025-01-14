import { Product } from '../models';
import { NextFunction, Request, Response } from 'express';
import { IProduct } from '../types';
import axios from 'axios';

export type RequiredProductFields = Pick<
  IProduct,
  'id' | 'name' | 'price' | 'productViewed'
>;

export const convertPrices = async (
  products: RequiredProductFields[],
  currency: string
) => {
  try {
    const response = await axios.get(
      '/latest?apikey=13c8a839a66c488e8157dc2a2fbb4638',
      {
        baseURL: 'https://api.currencyfreaks.com',
      }
    );
    const rates = response.data.rates;
    const convertedProducts = products.map((product) => {
      const newPrice = product.price * rates[currency.toUpperCase()];
      return { ...product, price: newPrice };
    });
    return convertedProducts;
  } catch (error) {
    console.error('Failed to fetch currency data', error);
    throw new Error('Failed to fetch currency data');
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { currency, size } = req.query;
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'productViewed'],
      order: [['productViewed', 'DESC']],
      limit: size ? parseInt(size as string) : undefined,
    });

    const plainProducts = products.map((product) =>
      product.get({ plain: true })
    ) as RequiredProductFields[];

    if (currency) {
      try {
        const convertedProducts = await convertPrices(
          plainProducts,
          currency as string
        );
        res.status(200).send(convertedProducts);
      } catch (error) {
        res.status(500).send('Failed to fetch currency data');
      }
    } else {
      res.status(200).send(plainProducts);
    }
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { currency } = req.query;
    const product = await Product.findByPk(parseInt(id));
    if (product) {
      product.productViewed = product.productViewed + 1;
      await product.save();

      const plainProduct = product.get({
        plain: true,
      }) as RequiredProductFields;

      if (currency) {
        try {
          const convertedProduct = await convertPrices(
            [plainProduct],
            currency as string
          );
          res.status(200).send(convertedProduct[0]);
        } catch (error) {
          res.status(500).send('Failed to fetch currency data');
        }
      } else {
        res.status(200).send(plainProduct);
      }
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    next(error);
  }
};
