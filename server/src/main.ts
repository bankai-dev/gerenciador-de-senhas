import { FastifyInstance } from "fastify";
import createServer from "./utils/createServer";
import { connectToDb, disconnectFromDB } from "./utils/db";
import logger from "./utils/logger";

function shutdownGracioso(signal: string, app: FastifyInstance) {
  process.on(signal, async () => {
    logger.info(`Adeus, recebi o sinal ${signal}`);

    app.close();

    await disconnectFromDB();

    logger.info("Meu trabalho aqui está feito");

    process.exit(0);
  });
}

async function principal() {
  const app = createServer();

  try {
    const url = await app.listen(4000, "0.0.0.0");

    logger.info(`Servidor está pronto em ${url}`);

    await connectToDb();
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }

  const sinais = ["SIGTERM", "SIGINT"];

  for (let i = 0; i < sinais.length; i++) {
    shutdownGracioso(sinais[i], app);
  }
}

principal();
