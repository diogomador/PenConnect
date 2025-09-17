import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

export default function NovaObra() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [autorId, setAutorId] = useState("");
  const navigate = useNavigate();

  const criarObra = async (e) => {
    e.preventDefault();
    try {
      await api.post("/obras/", {
        titulo,
        descricao,
        autor_id: Number(autorId),
      });
      navigate("/obras"); // volta para lista de obras
    } catch (err) {
      console.error("Erro ao criar obra", err);
    }
  };

  return (
    <div>
      <h2>➕ Nova Obra</h2>
      <form onSubmit={criarObra}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="ID do Autor"
          value={autorId}
          onChange={(e) => setAutorId(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
