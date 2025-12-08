import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AutorPerfil.css";

export default function AutorPerfil() {
  const { nome } = useParams();

  const [autor, setAutor] = useState(null);

  useEffect(() => {
    fetchAutor();
  }, [nome]);

  async function fetchAutor() {
    try {
      const res = await fetch(
        `http://localhost:8081/autor/${encodeURIComponent(nome)}`
      );
      const data = await res.json();
      setAutor(data);
    } catch (err) {
      console.error("Erro ao buscar autor");
    }
  }

  if (!autor) return <p>Carregando...</p>;

  return (
    <div className="autor-page">
      <h2>{autor.nome}</h2>
        {autor.bio && (
        <p className="autor-bio">{autor.bio}</p>
        )}


      <h3>Obras publicadas</h3>

      {autor.obras.length === 0 ? (
        <p>Esse autor ainda não publicou nenhuma obra.</p>
      ) : (
        autor.obras.map((o) => (
          <div key={o.id} className="obra-card">
            <h4>{o.titulo}</h4>
            <p>{o.conteudo.slice(0, 100)}...</p>

            <Link to={`/obras/${o.id}`} className="obra-btn">
              Ver obra
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
