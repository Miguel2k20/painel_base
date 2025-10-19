import { 
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply 
} from "fastify"

import { UserController } from './controllers/UserController'
import { AuthController } from './controllers/AuthController'
const userController = new UserController();
const authController = new AuthController();

export async function routes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    fastify.post("/users", userController.create.bind(userController))
    fastify.post("/login", authController.login.bind(authController))
}