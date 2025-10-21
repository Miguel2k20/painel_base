import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { userSchema } from "../schemas/userSchema";
import { create } from "../controllers/userController";


export async function UserRoutes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    fastify.addHook("preHandler", AuthMiddleware);

    fastify.post("/users", {schema: userSchema.create}, create);

    fastify.post("/show", async (request:FastifyRequest, reply:FastifyReply) => {
        reply.status(200).send({
            statusCode: 200,
            message: "Dados do usuario fds!"
        });
    });
}
