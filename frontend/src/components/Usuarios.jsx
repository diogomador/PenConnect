import { useEffect, useState } from "react";
import api from "./api";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = async () => {
    try {
      const res = await api.get("/usuarios/");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários", err);
    }
  };

  const criarUsuario = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios/", { nome, email });
      setNome("");
      setEmail("");
      buscarUsuarios(); // atualiza a lista
    } catch (err) {
      console.error("Erro ao criar usuário", err);
    }
  };

  return (
    <div>
      <h2>👤 Usuários</h2>
      <form onSubmit={criarUsuario}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} — {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
