import { useEffect, useState } from "react";
import api from "../components/api";
import NovoUsuario from "../components/NovoUsuario";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get("/usuarios/").then((res) => setUsuarios(res.data));
  }, []);

  const adicionarUsuario = (usuario) => {
    setUsuarios([...usuarios, usuario]);
  };

  return (
    <div>
      <h2>👤 Usuários cadastrados</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            <strong>{u.username}</strong> — {u.bio}
          </li>
        ))}
      </ul>
      <NovoUsuario onUsuarioCriado={adicionarUsuario} />
    </div>
  );
}