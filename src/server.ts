import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
    const app = fastify();

    app.register(cors);
    app.register(routes);

    app.listen({ port: 3000 }).then(() => {
      console.log("🚀 Servidor rodando em http://localhost:3000");
    });
  }).catch((err) => {
    console.error("❌ Erro ao inicializar o AppDataSource:", err);
});
