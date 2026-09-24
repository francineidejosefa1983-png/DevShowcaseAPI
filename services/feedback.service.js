const { Feedback, Project } = require("../models");

async function criarFeedback(projectId, dados) {
  const project = await Project.findByPk(projectId);

  if (!project) {
    const error = new Error("Projeto não encontrado");
    error.status = 404;
    throw error;
  }

  const nota = Number(dados.nota);

  if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
    const error = new Error("A nota deve ser um número inteiro entre 1 e 5");
    error.status = 400;
    throw error;
  }

  if (!dados.nome || !dados.comentario) {
    const error = new Error("Nome e comentário são obrigatórios");
    error.status = 400;
    throw error;
  }

  const feedback = await Feedback.create({
    nome: dados.nome,
    comentario: dados.comentario,
    nota,
    projectId
  });

  const feedbacks = await Feedback.findAll({
    where: { projectId }
  });

  const media =
    feedbacks.reduce((total, item) => total + item.nota, 0) /
    feedbacks.length;

  project.averageRating = Number(media.toFixed(2));
  await project.save();

  return feedback;
}

module.exports = {
  criarFeedback
};