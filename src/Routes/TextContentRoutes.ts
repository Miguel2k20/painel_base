import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { textContentSchema } from "../schemas/textContentSchema";
import { create } from "../controllers/textContentController";


export async function TextContentRoutes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    fastify.addHook("preHandler", AuthMiddleware);
    fastify.post("/text-content", {schema: textContentSchema.create}, create);
}
