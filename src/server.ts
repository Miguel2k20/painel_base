import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "fastify-cookie";
import { AppDataSource } from "./data-source";
import { AuthRoutes } from "./Routes/AuthRoutes";
import { UserRoutes } from "./Routes/UserRoutes";
import { TextContentRoutes } from "./Routes/TextContentRoutes";

AppDataSource.initialize().then(() => {
    
    const app = fastify();
    app.register(cors);
    app.register(fastifyCookie, { secret: process.env.COOKIE_SECRET });

    app.register(AuthRoutes);
    app.register(UserRoutes)
    app.register(TextContentRoutes);
    

    app.listen({ port: 3000 }).then(() => {
      console.log("🚀 Servidor rodando em http://localhost:3000");
    });
    
  }).catch((err) => {
    console.error("❌ Erro ao inicializar o AppDataSource:", err);
});
