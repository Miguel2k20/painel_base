import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { userSchema } from "../schemas/userSchema";
import { create, show } from "../controllers/userController";


export async function UserRoutes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    fastify.addHook("preHandler", AuthMiddleware);

    fastify.post("/users", {schema: userSchema.create}, create);
    fastify.get("/show", show);
}
