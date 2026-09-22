const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const { validateProject, projectResponse } = require("../dtos/project.dto");

// GET - listar projetos
router.get("/", async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects.map(projectResponse));
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

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

module.exports = router;