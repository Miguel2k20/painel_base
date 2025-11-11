import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  name: string;
}

export const AuthMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.cookies?.access_token;

  if (!token) {
    return reply.status(401).send({ message: "Usuário não autenticado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_PASS ?? "") as JwtPayload;
    // @ts-ignore
    request.user = decoded;
  } catch (err) {
    return reply.status(401).send({
      statusCode: 401,
      message: "Token inválido ou expirado",
    });
  }
};
