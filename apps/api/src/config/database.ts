import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

/**
 * Database configuration for different environments
 */
const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';

  return {
    dialect: 'postgres' as const,
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    logging: env === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    models: [path.join(__dirname, '../models/**/*.model.{ts,js}')],
    define: {
      timestamps: true,
      underscored: false,
    },
  };
};

/**
 * Sequelize instance with TypeScript support
 */
const config = getConfig();
const sequelize = new Sequelize(config);

export { sequelize, getConfig };
export default sequelize;

