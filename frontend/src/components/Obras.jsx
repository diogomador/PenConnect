import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

export default function Obras() {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    buscarObras();
  }, []);

  const buscarObras = async () => {
    try {
      const res = await api.get("/obras/");
      setObras(res.data);
    } catch (err) {
      console.error("Erro ao buscar obras", err);
    }
  };

  return (
    <div>
      <h2>📚 Obras</h2>
      <Link to="/obras/nova">
        <button>➕ Nova Obra</button>
      </Link>
      <ul>
        {obras.map((obra) => (
          <li key={obra.id}>
            <strong>{obra.titulo}</strong> — {obra.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}
