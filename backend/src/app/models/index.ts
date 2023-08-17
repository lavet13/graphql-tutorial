import dbConfig from '../config/db.config.js';
import { Dialect, Sequelize } from 'sequelize';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  port: Number.parseInt(dbConfig.port),

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

export const db = {
  Sequelize,
  sequelize,
  // tutorials: tutorialModel(sequelize, Sequelize),
};
