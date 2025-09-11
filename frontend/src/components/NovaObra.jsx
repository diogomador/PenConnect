import { useState } from "react";
import api from "./api";

function NovaObra() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/obras/", {
        titulo,
        conteudo,
        autor_id: 1, // depois vai ser dinâmico pelo login
      });
      alert("Obra criada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar obra");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Conteúdo"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
      />
      <button type="submit">Publicar</button>
    </form>
  );
}

export default NovaObra;
