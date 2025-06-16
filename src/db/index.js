// src/db/index.js

import Sequelize from 'sequelize';
import dbConfig from '../configs/db.js';

// Get the current environment (default to development)
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

// Create Sequelize instance
const sequelize = new Sequelize(config);

// Test DB connection
sequelize.sync({ alter: true })
  .then(() => {
    console.log("✔ Database connected successfully.");
  })
  .catch((err) => {
    console.error("✘ Error connecting to the database:", err);
  });

export default sequelize;
