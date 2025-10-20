import fastify from "fastify";
import cors from "@fastify/cors";
import { AppDataSource } from "./data-source";
import { AuthRoutes } from "./Routes/AuthRoutes";
import { UserRoutes } from "./Routes/UserRoutes";

AppDataSource.initialize().then(() => {
    
    const app = fastify();
    app.register(cors);

    app.register(AuthRoutes);
    app.register(UserRoutes)
    

    app.listen({ port: 3000 }).then(() => {
      console.log("🚀 Servidor rodando em http://localhost:3000");
    });
    
  }).catch((err) => {
    console.error("❌ Erro ao inicializar o AppDataSource:", err);
});
