// src/configs/db.js
import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: 5432,
    dialect: "postgres",
    logging: true,
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      requestTimeoutMillis: 15000,
    },
  },
};

export default config;
