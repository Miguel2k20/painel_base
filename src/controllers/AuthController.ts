import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'

interface LoginBody {
    email: string;
    password: string;
}
export class AuthController {

    async login(request:FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply)
    {
        const { email, password } = request.body

        if( !email || !password){
            return reply.status(400).send({
                statusCode: 400,
                message: "Campos obrigatórios não presentes"
            });
        }

        const user = await UserRepository.findOneBy({email})

        if(!user){
            return reply.status(400).send({
                statusCode: 400,
                message: "E-mail ou senha incorreto"
            });
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if(!verifyPass){
            return reply.status(400).send({
                statusCode: 400,
                message: "E-mail ou senha incorreto"
            });
        }

        const token = jwt.sign({id:user.id, name:user.name}, process.env.TOKEN_PASS ?? '', {expiresIn: '1d'})
        
        const { id, name, email: userEmail } = user;
        const userLogin = { id, name, userEmail };

        reply.status(200).send({
            user: userLogin,
            token: token
        });
    }
}
