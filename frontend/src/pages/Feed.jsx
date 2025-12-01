import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Feed.css";

export default function Feed() {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchObras() {
      try {
        const response = await fetch("http://localhost:8000/obras/");
        const data = await response.json();
        setObras(data);
      } catch (error) {
        console.error("Erro ao carregar obras:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchObras();
  }, []);

  if (loading) return <p className="feed-loading">Carregando obras...</p>;

  return (
    <div className="feed-container">
      <h2>Obras Publicadas</h2>

      {obras.length === 0 ? (
        <p>Nenhuma obra publicada ainda.</p>
      ) : (
        <div className="feed-grid">
          {obras.map((obra) => (
            <div key={obra.id} className="feed-card">
              <h3>{obra.titulo}</h3>
              <p className="feed-descricao">{obra.descricao}</p>
              <p className="feed-autor">Autor: {obra.autor}</p>

              <Link to={`/obras/${obra.id}`} className="feed-btn">
                Ler mais
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
