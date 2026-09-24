const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const Technology = require("../models/Technology");
const { validateProject, projectResponse } = require("../dtos/project.dto");
const { criarFeedback } = require("../services/feedback.service")
// GET - listar projetos com filtro e paginação
router.get("/", async (req, res) => {
    try {
        const { tecnologia, page = 1, limit = 10 } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;

        const where = {};
        const include = [];

        if (tecnologia) {
            include.push({
                model: Technology,
                where: {
                    nome: tecnologia
                },
                through: {
                    attributes: []
                }
            });
        }

        const { count, rows } = await Project.findAndCountAll({
            where,
            include,
            limit: limitNumber,
            offset,
            distinct: true
        });

        res.json({
            total: count,
            pagina: pageNumber,
            limite: limitNumber,
            projetos: rows.map(projectResponse)
        });

    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
})

// GET - buscar projeto por ID
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                erro: "Projeto não encontrado"
            });
        }

        res.json(projectResponse(project));
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// POST - criar projeto
router.post("/", async (req, res) => {
    try {
        const data = validateProject(req.body);
        const project = await Project.create(data);

        res.status(201).json(projectResponse(project));
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// PUT - atualizar projeto
router.put("/:id", async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                erro: "Projeto não encontrado"
            });
        }

        const data = validateProject(req.body);
        await project.update(data);

        res.json(projectResponse(project));
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// DELETE - excluir projeto
router.delete("/:id", async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                erro: "Projeto não encontrado"
            });
        }

        await project.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
// POST - criar feedback de um projeto
router.post("/:id/feedbacks", async (req, res) => {
  try {
    const feedback = await criarFeedback(req.params.id, req.body);

    return res.status(201).json(feedback);
  } catch (error) {
    return res.status(error.status || 500).json({
      erro: error.message
    });
  }
});
// PUT - dar upvote em um projeto
router.put("/:id/upvote", async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({
                erro: "Projeto não encontrado"
            });
        }

        project.upvotes += 1;
        await project.save();

        res.json({
            mensagem: "Upvote registrado com sucesso",
            upvotes: project.upvotes
        });
    } catch (error) {
        res.status(500).json({
            erro: error.message
        });
    }
});
module.exports = router;