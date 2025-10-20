import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  name: string;
}

export const AuthMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return reply.status(401).send({
      statusCode: 401,
      message: "Usuário não autenticado",
    });
  }

  const token = (Array.isArray(authorization) ? authorization[0] : authorization).split(" ")[1];

  try {
    jwt.verify(token, process.env.TOKEN_PASS ?? "") as JwtPayload;
  } catch (err) {
    return reply.status(401).send({
      statusCode: 401,
      message: "Token inválido ou expirado",
    });
  }
};
