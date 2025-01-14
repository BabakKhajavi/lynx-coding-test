import { Sequelize } from 'sequelize';
import { Product } from '..';

// const createDatabaseAssociations = () => {};

export const initializeModels = (sequelize: Sequelize) => {
  Product.initialize(sequelize);
};
