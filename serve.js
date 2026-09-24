const express = require("express");
const { swaggerUi, swaggerDocument } = require("./swagger");
const cors = require("cors");
const sequelize = require("./config/database");

const { Profile, Project, Feedback, Technology } = require("./models");
const profileRoutes = require("./routes/profile.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const projectRoutes = require("./routes/project.routes");
const technologyRoutes = require("./routes/technology.routes");
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/technologies", technologyRoutes);
app.get("/", (req, res) => {
  res.send("API DevShowcase funcionando!");
});
app.get("/api/profiles/:id", async (req, res) => {
  try {
    const perfil = await Profile.findByPk(req.params.id);

    if (!perfil) {
      return res.status(404).json({
        erro: "Perfil não encontrado"
      });
    }

    res.json(perfil);
  } catch (erro) {
    console.error("ERRO AO BUSCAR PERFIL:", erro);
    res.status(500).json({
      erro: "Erro ao buscar perfil"
    });
  }
});
   app.get("/api/profiles", async (req, res) => {
    try {
        const perfis = await Profile.findAll();
        res.json(perfis);
    } catch (erro) {
        console.error("ERRO AO BUSCAR PERFIS:", erro);
        res.status(500).json({
            erro: "Erro ao buscar perfis"
        });
    }
});
        
app.post("/api/profiles", async (req, res) => {
    const { nome, email, bio, githubUrl } = req.body;

    try {
        const novoPerfil = await Profile.create({
            nome,
            email,
            bio,
            githubUrl
        });

        res.status(201).json(novoPerfil);
    } catch (erro) {
        console.error("ERRO AO CRIAR PERFIL:", erro);
        res.status(500).json({
            erro: "Erro ao criar perfil"
        });
    }
});

app.get("/projetos", async (req, res) => {
    try {
        const projetos = await Project.findAll();
        res.json(projetos);
   } catch (erro) {
    console.error("ERRO AO BUSCAR PROJETOS:", erro);
        res.status(500).json({
            erro: "Erro ao buscar projetos"
        });
    }
});
app.post("/projetos", async (req, res) => {
const { profileId, titulo, descricao, url } = req.body;
try {
   const novoProjeto = await Project.create({
    profileId,
    titulo,
    descricao,
    url
});

    res.status(201).json(novoProjeto);
} catch (erro) {
    console.error("ERRO AO CRIAR PROJETO:", erro);
    res.status(500).json({
        erro: "Erro ao criar projeto"
    });
}
});
// Tratamento global para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada"
    });
});

// Tratamento global de erros
app.use((err, req, res, next) => {
    console.error("ERRO GLOBAL:", err);

    const status = err.status || err.statusCode || 500;

    res.status(status).json({
        erro: err.message || "Erro interno do servidor"
    });
});
sequelize.sync()
  .then(() => {
    console.log("Banco de dados conectado e tabelas criadas!");

    app.listen(PORT, () => {
 console.log(`Servidor rodando em http://localhost:${PORT}`);

    });
  })
  .catch((erro) => {
    console.error("Erro ao conectar ao banco:", erro);
  });