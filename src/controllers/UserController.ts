import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'

interface CreateUserBody {
    email: string;
    name: string;
    password: string;
}

export class UserController {
    async create(request: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
        
        const { name, email, password } = request.body
        
        if(!name || !email || !password){
            reply.status(400).send({
                statusCode: 400,
                message: "Campos obrigatórios não presentes"
            });
        }

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
    }
}