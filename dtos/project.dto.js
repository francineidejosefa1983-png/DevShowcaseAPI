function validateProject(data) {
    const { profileId, titulo, descricao, url } = data;

    if (!profileId) {
        throw new Error("profileId é obrigatório");
    }

    if (!titulo || titulo.trim() === "") {
        throw new Error("Título é obrigatório");
    }

    if (!descricao || descricao.trim() === "") {
        throw new Error("Descrição é obrigatória");
    }

    if (url) {
        try {
            new URL(url);
        } catch {
            throw new Error("URL inválida");
        }
    }
 return data
}
function projectResponse(project) {
    return {
        id: project.id,
        profileId: project.profileId,
        titulo: project.titulo,
        descricao: project.descricao,
        url: project.url
    };
}

module.exports = {
    validateProject,
    projectResponse
};