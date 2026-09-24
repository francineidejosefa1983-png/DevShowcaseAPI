const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "DevShowcase API",
    version: "1.0.0",
    description: "API para apresentação de projetos, tecnologias e feedbacks."
  },
  servers: [
    {
      url: "http://localhost:3001"
    }
  ],
  paths: {
    "/api/projects": {
      get: {
        summary: "Listar projetos",
        responses: {
          200: {
            description: "Projetos encontrados"
          }
        }
      },
      post: {
        summary: "Criar projeto",
        responses: {
          201: {
            description: "Projeto criado"
          }
        }
      }
    },

    "/api/projects/{id}/upvote": {
      put: {
        summary: "Adicionar upvote ao projeto",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          200: {
            description: "Upvote registrado com sucesso"
          },
          404: {
            description: "Projeto não encontrado"
          }
        }
      }
    },

    "/api/projects/{id}/feedbacks": {
      post: {
        summary: "Cadastrar feedback de um projeto",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nota: {
                    type: "integer",
                    minimum: 1,
                    maximum: 5
                  },
                  comentario: {
                    type: "string"
                  }
                },
                required: ["nota", "comentario"]
              }
            }
          }
        },
        responses: {
          201: {
            description: "Feedback criado com sucesso"
          },
          400: {
            description: "Dados inválidos"
          },
          404: {
            description: "Projeto não encontrado"
          }
        }
      }
    }
  }
};

module.exports = {
  swaggerUi,
  swaggerDocument
};