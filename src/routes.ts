import { 
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply 
} from "fastify"

import { UserController } from './controllers/UserController'
const userController = new UserController();

export async function routes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    fastify.post("/users", userController.create.bind(userController))
}