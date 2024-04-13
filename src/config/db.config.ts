import * as dotenv from 'dotenv';
dotenv.config();

export const configData = {
  // APP and DB
  APP_PORT: process.env.APP_PORT || 3030,
  APP_NAME: process.env.APP_NAME || 'nestjs-mysql',
  DB_PORT: process.env.DB_PORT,
  HOST: process.env.HOST,
  USERNAME: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_NAME,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET_KEY,
};
