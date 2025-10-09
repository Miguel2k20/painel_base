import { 
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply 
} from "fastify"

export async function routes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    fastify.get("/", async (request:FastifyRequest, reply:FastifyReply) => {
        return { message: "Oie clara"}
    })
}