import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) throw new Error("PORT não definida no .env");
if (!process.env.MONGODB_HOST)
  throw new Error("MONGODB_HOST não definido no .env");
if (!process.env.MONGODB_PORT)
  throw new Error("MONGODB_PORT não definido no .env");
if (!process.env.MONGODB_USER)
  throw new Error("MONGODB_USER não definido no .env");
if (!process.env.MONGODB_PASSWORD)
  throw new Error("MONGODB_PASSWORD não definido no .env");
if (!process.env.MONGODB_DATABASE)
  throw new Error("MONGODB_DATABASE não definido no .env");

export const config = {
  api: {
    port: process.env.PORT || 3000,
  },
  mongodb: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT || "27017",
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE,
    url: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?authSource=admin`,
  },
};
