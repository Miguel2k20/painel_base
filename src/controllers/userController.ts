import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

interface CreateUserBody {
    email: string;
    name: string;
    password: string;
}

interface requestParams {
    id: string;
}

export async function create(request:FastifyRequest, reply:FastifyReply) {

    const { name, email, password } = request.body as CreateUserBody
    const userExist = await UserRepository.findOneBy({email})

    if(userExist) {
        reply.status(400).send({
            statusCode: 400,
            message: "Esse email já está sendo usado por outro usuário"
        });
    }

    try {
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
        
    } catch (error) {
        return reply.status(401).send({ message: error});
    }
}

export async function show(request:FastifyRequest, reply:FastifyReply) {
    
    const {authorization} = request.headers
    const token = (Array.isArray(authorization) ? authorization[0] : authorization).split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_PASS!) as jwt.JwtPayload;
        const user = await UserRepository.findOneBy({ id:decoded.id })

        if(!user){
            return reply.status(404).send({ message: "Token inválido ou expirado" });
        }
        const { password:_, ...userInfo } = user

        reply.status(200).send({
            statusCode: 200,
            userInfo: userInfo
        });

    }catch(err) {
        return reply.status(401).send({ message: "Token inválido ou expirado" });
    }
}

export async function update(request:FastifyRequest, reply:FastifyReply) {
    const { id } = request.params as requestParams;
    
    reply.status(200).send({
        statusCode: 200,
        message: `Rota de update de usuario com id: ${id} em construção!`
    });

}