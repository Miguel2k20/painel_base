import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { userSchema } from "../schemas/userSchema";

interface CreateUserBody {
    email: string;
    name: string;
    password: string;
}

export async function UserRoutes(fastify:FastifyInstance, Options:FastifyPluginOptions) {
    
    fastify.post("/users", {preHandler:AuthMiddleware, schema: userSchema.create}, async (request:FastifyRequest, reply:FastifyReply) => {
        const { name, email, password } = request.body as CreateUserBody

        const userExist = await UserRepository.findOneBy({email})

        if(userExist) {
            reply.status(400).send({
                statusCode: 400,
                message: "Esse email já está sendo usado por outro usuário"
            });
        }

        const hashPass = await bcrypt.hash(password, 10)

        const newUser = UserRepository.create({
            name,
            email,
            password:hashPass
        })

        await UserRepository.save(newUser)

        reply.status(200).send({
            statusCode: 200,
            message: "Usuario Cadastrado com sucesso!"
        });
    });

    fastify.post("/show", async (request:FastifyRequest, reply:FastifyReply) => {
        reply.status(200).send({
            statusCode: 200,
            message: "Dados do usuario fds!"
        });
    });
}
