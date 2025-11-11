import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

interface LoginBody {
    email: string;
    password: string;
}

export async function login(request:FastifyRequest, reply:FastifyReply){
    const { email, password } = request.body as LoginBody

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

    const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.TOKEN_PASS ?? "",
        { expiresIn: "1d" }
    );

    reply.setCookie("access_token", token, {
        httpOnly: true, // JS não acessa
        secure: process.env.NODE_ENV === "production", // só HTTPS em produção
        sameSite: "lax", // ajuda contra CSRF
        path: "/", // cookie visível em toda a aplicação
        maxAge: 24 * 60 * 60, // 1 dia
    });
    
    const { id, name, email: userEmail } = user;
    const userLogin = { id, name, userEmail };

    return reply.send({ id, name, email: userEmail });
}