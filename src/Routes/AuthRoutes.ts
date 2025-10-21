import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { authSchema } from "../schemas/authSchema";
import { login } from "../controllers/authController";

export async function AuthRoutes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    fastify.post("/login", {schema: authSchema.login}, login);
}
