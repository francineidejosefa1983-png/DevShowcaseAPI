const express = require("express");
const router = express.Router();

const Technology = require("../models/Technology");
const { validarTechnology, technologyResponse } = require("../dtos/technology.dto");

// POST - cadastrar tecnologia
router.post("/", async (req, res) => {
    try {
        const { error } = validarTechnology(req.body);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const technology = await Technology.create(req.body);

        res.status(201).json(technologyResponse(technology));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET - listar todas as tecnologias
router.get("/", async (req, res) => {
    try {
        const technologies = await Technology.findAll();

        res.json(technologies.map(technologyResponse));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET - buscar tecnologia por ID
router.get("/:id", async (req, res) => {
    try {
        const technology = await Technology.findByPk(req.params.id);

        if (!technology) {
            return res.status(404).json({
                error: "Tecnologia não encontrada"
            });
        }

        res.json(technologyResponse(technology));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// PUT - atualizar tecnologia
router.put("/:id", async (req, res) => {
    try {
        const technology = await Technology.findByPk(req.params.id);

        if (!technology) {
            return res.status(404).json({
                error: "Tecnologia não encontrada"
            });
        }

        const { error } = validateTechnology(req.body);

        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        await technology.update(req.body);

        res.json(technologyResponse(technology));
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
// DELETE - excluir tecnologia
router.delete("/:id", async (req, res) => {
    try {
        const technology = await Technology.findByPk(req.params.id);

        if (!technology) {
            return res.status(404).json({
                error: "Tecnologia não encontrada"
            });
        }

        await technology.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
module.exports = router;



