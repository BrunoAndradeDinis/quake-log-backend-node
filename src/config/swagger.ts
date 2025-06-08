import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API do Parser de Logs do Quake",
      version: "1.0.0",
      description:
        "API para consulta de logs do Quake 3 Arena, permitindo visualizar estatísticas de jogos e kills",
      contact: {
        name: "Bruno de Andrade Dinis",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
