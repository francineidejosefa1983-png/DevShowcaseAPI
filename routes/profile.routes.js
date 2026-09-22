const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");
const {
    validarProfile,
    profileResponse
} = require("../dtos/profile.dto");

// GET - listar perfis
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.findAll();

        res.json(profiles.map(profileResponse));
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// GET - buscar perfil por ID
router.get("/:id", async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);

        if (!profile) {
            return res.status(404).json({
                erro: "Perfil não encontrado"
            });
        }

        res.json(profileResponse(profile));
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// POST - criar perfil
router.post("/", async (req, res) => {
    try {
        const dados = validarProfile(req.body);

        const profile = await Profile.create(dados);

        res.status(201).json(profileResponse(profile));
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// PUT - atualizar perfil
router.put("/:id", async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);

        if (!profile) {
            return res.status(404).json({
                erro: "Perfil não encontrado"
            });
        }

        const dados = validarProfile(req.body);

        await profile.update(dados);

        res.json(profileResponse(profile));
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

// DELETE - excluir perfil
router.delete("/:id", async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.id);

        if (!profile) {
            return res.status(404).json({
                erro: "Perfil não encontrado"
            });
        }

        await profile.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;