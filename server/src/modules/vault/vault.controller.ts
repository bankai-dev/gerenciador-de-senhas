import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { get } from "lodash";
import logger from "../../utils/logger";
import { updateVault } from "./vault.service";

export async function updateVaultHandler(
  request: FastifyRequest<{
    Body: {
      encryptedVault: string;
    };
  }>,
  reply: FastifyReply
) {
  const userId = get(request, "user._id");

  try {
    await updateVault({
      data: request.body.encryptedVault,
      userId,
    });
    

    return reply.code(200).send("Cofre atualizado");
  } catch (e) {
    logger.error(e, "erro ao atualizar o cofre");
    return reply.code(500).send(e);
  }
}
