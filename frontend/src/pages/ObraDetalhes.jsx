import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ObraDetalhes.css";

export default function ObraDetalhes() {
  const { id } = useParams();
  const [obra, setObra] = useState(null);

  useEffect(() => {
    async function fetchObra() {
      const response = await fetch(`http://localhost:8000/obras/${id}/`);
      const data = await response.json();
      setObra(data);
    }
    fetchObra();
  }, [id]);

  if (!obra) return <p>Carregando...</p>;

  return (
    <div className="obra-page">
      <div className="obra-container">
        <h1 className="obra-titulo">{obra.titulo}</h1>
        <p className="obra-descricao">{obra.descricao}</p>
        <p className="obra-autor">Autor ID: {obra.autor_id}</p>
        <div className="obra-conteudo">{obra.conteudo}</div>

        <button className="voltar-btn" onClick={() => window.history.back()}>
          ← Voltar
        </button>
      </div>
    </div>
  );
}
