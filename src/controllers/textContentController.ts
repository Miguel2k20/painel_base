import { FastifyReply, FastifyRequest } from "fastify";
import { TextContentRepository } from "../repositories/TextContentRepository";

export interface CreateTextContentDTO {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
}

export async function create (request:FastifyRequest, reply:FastifyReply) {
    const params = request.body as CreateTextContentDTO;
    try {
        const newTextContent = TextContentRepository.create(params);
        await TextContentRepository.save(newTextContent)
    }   catch (error) {
        return reply.status(500).send({ message: error});
    }
}

export async function update (request:FastifyRequest, reply:FastifyReply) {
    const { slug } = request.params as { slug: string };
    const params = request.body as Partial<CreateTextContentDTO>;
    try {
        const content = await TextContentRepository.findOneBy({slug}); 
        if(!content) {
            return reply.status(404).send({ message: "Conteúdo não encontrado" });
        }
        TextContentRepository.merge(content, params);
        await TextContentRepository.save(content);
        reply.status(200).send({
            statusCode: 200,
            message: "Conteúdo atualizado com sucesso"
        });
    } catch(err) {
        return reply.status(500).send({ message: err });
    } 
}

export async function show (request:FastifyRequest, reply:FastifyReply) {
    const { slug } = request.params as { slug: string };
    try {
        const content = await TextContentRepository.findOneBy({slug});

        if(!content) {
            return reply.status(404).send({ message: "Conteúdo não encontrado" });
        }

        reply.status(200).send({
            statusCode: 200,
            userInfo: content
        });
        
    } catch(err) {
        return reply.status(401).send({ message: "Conteúdo não encontrado" });
    }
}

export async function remove (request:FastifyRequest, reply:FastifyReply) {
    const { slug } = request.params as { slug: string };
    try {
        const content = await TextContentRepository.findOneBy({slug});
        if(!content) {
            return reply.status(404).send({ message: "Conteúdo não encontrado" });
        }
        await TextContentRepository.remove(content);
        reply.status(200).send({
            statusCode: 200,
            message: "Conteúdo removido com sucesso"
        });
    } catch(err) {
        return reply.status(500).send({ message: err });
    }   
}

export async function list (request:FastifyRequest, reply:FastifyReply) {
    try {
        const contents = await TextContentRepository.find();
        reply.status(200).send({
            statusCode: 200,
            data: contents
        });
    } catch(err) {
        return reply.status(500).send({ message: err });
    }
}