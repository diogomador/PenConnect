import { useEffect, useState } from "react";
import api from "./api";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get("/usuarios/")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>{u.nome} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
