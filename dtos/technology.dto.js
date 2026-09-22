function validarTechnology(data) {
  const { nome } = data;

  if (!nome || nome.trim() === "") {
    throw new Error("Nome é obrigatório");
  }

  return {
    nome: nome.trim()
  };
}

function technologyResponse(technology) {
  return {
    id: technology.id,
    nome: technology.nome
  };
}

module.exports = {
  validarTechnology,
  technologyResponse
};