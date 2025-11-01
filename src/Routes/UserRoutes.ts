import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { userSchema } from "../schemas/userSchema";
import { create, show, update } from "../controllers/userController";


export async function UserRoutes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    fastify.addHook("preHandler", AuthMiddleware);

    fastify.post("/users", {schema: userSchema.create}, create);
    fastify.put("/users/:id", update);
    fastify.get("/show", show);
}
