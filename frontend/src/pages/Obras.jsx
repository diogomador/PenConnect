import { useEffect, useState } from "react";
import api from "../components/api";
import NovaObra from "../components/NovaObra";

export default function Obras() {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    api.get("/obras/").then((res) => setObras(res.data));
  }, []);

  return (
    <div>
      <h1>📚 Obras</h1>
      {/* Caso não tenha obras */}
      {obras.length === 0 && <p>Nenhuma obra cadastrada ainda.</p>}

      {/* Lista de obras */}
      <ul>
        {obras.map((obra) => (
          <li key={obra.id}>
            <strong>{obra.titulo}</strong> — {obra.autor}
          </li>
        ))}
      </ul>

      {/* Formulário para criar nova obra */}
      <NovaObra /> {/* ← Aqui aparece o formulário para criar novas obras */}
    </div>
  );
}
