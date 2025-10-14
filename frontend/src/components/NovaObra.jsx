import { useState } from "react";
import api from "./api";

export default function NovaObra() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState(""); // futuramente isso vem do login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/obras/", {
        titulo,
        conteudo,
        autor
      });
      alert("Obra publicada com sucesso!");
      setTitulo("");
      setConteudo("");
      setAutor("");
    } catch (err) {
      console.error("Erro ao criar obra:", err);
      alert("Erro ao criar obra. Verifique os campos e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nova Obra</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        required
      />
      <textarea
        placeholder="Conteúdo"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        required
      />
      <button type="submit">Publicar</button>
    </form>
  );
}
