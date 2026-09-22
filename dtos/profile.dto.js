function validarProfile(data) {
  const { nome, email, bio, githubUrl } = data;

  if (!nome || nome.trim() === "") {
    throw new Error("Nome é obrigatório");
  }

  if (!email || email.trim() === "") {
    throw new Error("Email é obrigatório");
  }

  if (githubUrl) {
    try {
      new URL(githubUrl);
    } catch {
      throw new Error("GitHub URL inválida");
    }
  }

  return {
    nome: nome.trim(),
    email: email.trim(),
    bio: bio || null,
    githubUrl: githubUrl || null
  };
}

function profileResponse(profile) {
  return {
    id: profile.id,
    nome: profile.nome,
    email: profile.email,
    bio: profile.bio,
    githubUrl: profile.githubUrl
  };
}

module.exports = {
  validarProfile,
  profileResponse
};