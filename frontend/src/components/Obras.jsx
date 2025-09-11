import { useEffect, useState } from "react";
import api from "./api";

function Obras() {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    api.get("/obras/")
      .then((res) => setObras(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Obras</h1>
      {obras.map((obra) => (
        <div key={obra.id}>
          <h2>{obra.titulo}</h2>
          <p>{obra.conteudo}</p>
          <small>Autor ID: {obra.autor_id}</small>
        </div>
      ))}
    </div>
  );
}

export default Obras;
