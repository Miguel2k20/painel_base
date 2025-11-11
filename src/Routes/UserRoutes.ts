import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { userSchema } from "../schemas/userSchema";
import { create, show, update, deleteUser, userList, showUser } from "../controllers/userController";


export async function UserRoutes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    fastify.addHook("preHandler", AuthMiddleware);
    fastify.post("/users", {schema: userSchema.create}, create);
    fastify.put("/users/:id" ,{schema: userSchema.update}, update);
    fastify.delete("/users/:id", deleteUser);
    fastify.get("/user", show);
    fastify.get("/users/:id", showUser);
    fastify.get('/users', { schema: userSchema.list }, userList);
}
