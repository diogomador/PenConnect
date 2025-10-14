import { useState } from "react";
import api from "./api";

export default function NovoUsuario({ onUsuarioCriado }) {
  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/usuarios/", {
        username,
        nome,
        bio: bio || null
      });
      alert("Usuário cadastrado com sucesso!");
      setUsername("");
      setNome("");
      setBio("");
      if (onUsuarioCriado) onUsuarioCriado(response.data);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      alert("Erro ao criar usuário. Verifique os campos e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>➕ Cadastrar novo usuário</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <textarea
        placeholder="Bio (opcional)"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}