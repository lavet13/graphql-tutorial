import { config } from 'dotenv';
config();

export default {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  port: process.env.DB_PORT,

  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30_000,
    idle: 10_000,
  },
};
