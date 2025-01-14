import { Sequelize } from 'sequelize';
import { initializeModels } from '../models';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_MYSQL_HOST,
  username: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DATABASE,
  logging: false,
});

export const connectMySqlDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    initializeModels(sequelize);
    await sequelize.sync({ alter: true });
  } catch (err: any) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  }
};
