function validarFeedback(data) {
  const { nome, comentario, nota, projectId } = data;

  if (!nome || nome.trim() === "") {
    throw new Error("Nome é obrigatório");
  }

  if (!comentario || comentario.trim() === "") {
    throw new Error("Comentário é obrigatório");
  }

  if (nota === undefined || nota === null) {
    throw new Error("Nota é obrigatória");
  }

  if (!projectId) {
    throw new Error("projectId é obrigatório");
  }

  return {
    nome: nome.trim(),
    comentario: comentario.trim(),
    nota,
    projectId
  };
}

function feedbackResponse(feedback) {
  return {
    id: feedback.id,
    nome: feedback.nome,
    comentario: feedback.comentario,
    nota: feedback.nota,
    projectId: feedback.projectId
  };
}

module.exports = {
  validarFeedback,
  feedbackResponse
};
