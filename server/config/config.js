require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,     
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: true,
    port: 5432,
    dialectOptions: {
      ssl: false,
    },
  },

  test: {
    url: process.env.DATABASE_URL,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },

  production: {
    url: process.env.DATABASE_URL,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    },
  },
};
