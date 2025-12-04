import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Perfil.css";
import show from '../assets/img/show.png';

export default function Perfil() {
  const { usuario, setUsuario } = useContext(AuthContext);

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [senha, setSenha] = useState(usuario.senha);

  const [mostrarSenha, setMostrarSenha] = useState(false);


  const [obras, setObras] = useState([]);

  useEffect(() => {
    fetchObras();
  }, []);

  async function fetchObras() {
    const res = await fetch(`http://localhost:8081/usuarios/${usuario.id}/obras/`);
    const data = await res.json();
    setObras(data);
  }

  async function salvar() {
    const response = await fetch(`http://localhost:8081/usuarios/${usuario.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await response.json();
    alert("Dados atualizados");
    setUsuario(data.usuario);
  }

    async function deletarConta() {
    const confirm = window.confirm("Tem certeza que deseja deletar sua conta?");

    if (!confirm) return;

    await fetch(`http://localhost:8081/usuarios/${usuario.id}/`, {
        method: "DELETE"
    });

    alert("Conta deletada!");
    localStorage.clear();
    window.location.href = "/";
    }

    async function editarObra(id, dados) {
    await fetch(`http://localhost:8081/obras/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        ...dados,
        autor: usuario.id
        })
    });

    alert("Obra atualizada!");
    }

    async function excluirObra(id) {
    await fetch(`http://localhost:8081/obras/${id}/`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        autor_id: usuario.id
        })
    });

    alert("Obra excluída!");
    window.location.reload();
    }

  return (
    <div className="perfil-page">

      <h2>Meu perfil</h2>

      <div className="dados">
        <input value={nome} onChange={e => setNome(e.target.value)} />
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <div className="senha-box">
          <input
            type={mostrarSenha ? "text" : "password"}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="Senha"
          />

          <button
            type="button"
            className="btn-ver-senha"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            
            {mostrarSenha ? <img src={show}/> : "👁"}
          </button>
        </div>

        <button onClick={salvar}>Salvar</button>
      </div>

      <h3>Minhas obras</h3>

      <div className="minhas-obras">
        {obras.map(o => (
          <div key={o.id} className="obra-item">
            <span>{o.titulo}</span>
            <button onClick={() => excluirObra(o.id)}>Excluir</button>
            <button onClick={() => editarObra(o.id)}>Editar</button>
          </div>
        ))}
      </div>

      <button className="btn-danger" onClick={deletarConta}>
        Excluir conta
      </button>

    </div>
  );
}
