const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");
const feedbackDTO = require("../dtos/feedback.dto");

// GET - listar feedbacks
router.get("/", async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll();

      res.json(feedbacks.map(feedbackDTO.feedbackResponse));
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// GET - buscar feedback por ID
router.get("/:id", async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                erro: "Feedback não encontrado"
            });
        }

       res.json(feedbackDTO.feedbackResponse(feedback));
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// POST - criar feedback
router.post("/", async (req, res) => {
    try {
        const dados = feedbackDTO.validarFeedback(req.body);

        const feedback = await Feedback.create(dados);

        res.status(201).json(feedbackResponse(feedback));
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// DELETE - excluir feedback
router.delete("/:id", async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);

        if (!feedback) {
            return res.status(404).json({
                erro: "Feedback não encontrado"
            });
        }

        await feedback.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;