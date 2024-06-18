import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../constants";
import logger from "./logger";

export async function connectToDb() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
  } catch (e) {
    logger.error(e, "Erro ao conectar ao banco");
    process.exit(1);
    
  }
}

export async function disconnectFromDB() {
  await mongoose.connection.close();

  logger.info("Desconectado do banco");

  return;
}
