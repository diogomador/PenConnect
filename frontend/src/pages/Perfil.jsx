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

  // mensagens gerais
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // estados para edição de obra
  const [editandoObra, setEditandoObra] = useState(null);
  const [tituloEdit, setTituloEdit] = useState("");
  const [conteudoEdit, setConteudoEdit] = useState("");

  useEffect(() => {
    fetchObras();
  }, []);

  async function fetchObras() {
    const res = await fetch(`http://localhost:8081/usuarios/${usuario.id}/obras/`);
    const data = await res.json();
    setObras(data);
  }

  function abrirEdicao(obra) {
    setEditandoObra(obra.id);
    setTituloEdit(obra.titulo);
    setConteudoEdit(obra.conteudo);
  }

  async function salvarEdicao() {
    setErro("");
    setMensagem("");

    try {
      await fetch(`http://localhost:8081/obras/${editandoObra}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: tituloEdit,
          conteudo: conteudoEdit,
          autor: usuario.id
        })
      });

      setMensagem("Obra atualizada com sucesso!");
      setEditandoObra(null);
      fetchObras();

    } catch (err) {
      setErro("Erro ao atualizar a obra.");
    }
  }

  async function salvar() {
    setErro("");
    setMensagem("");

    try {
      const response = await fetch(`http://localhost:8081/usuarios/${usuario.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });

      const data = await response.json();

      setUsuario(data.usuario);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      setMensagem("Dados atualizados com sucesso!");

    } catch (err) {
      setErro("Erro ao atualizar perfil.");
    }
  }

  async function deletarConta() {
    const confirmacao = window.confirm("Tem certeza que deseja deletar sua conta?");
    if (!confirmacao) return;

    try {
      await fetch(`http://localhost:8081/usuarios/${usuario.id}/`, {
        method: "DELETE"
      });

      localStorage.clear();
      window.location.href = "/";

    } catch (err) {
      setErro("Erro ao deletar conta.");
    }
  }

  async function excluirObra(id) {
    setErro("");
    setMensagem("");

    try {
      await fetch(`http://localhost:8081/obras/${id}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autor_id: usuario.id
        })
      });

      setMensagem("Obra excluída com sucesso!");
      fetchObras();

    } catch (err) {
      setErro("Erro ao excluir obra.");
    }
  }

  return (
    <div className="perfil-page">

      <h2>Meu perfil</h2>

      {/* MENSAGENS */}
      {mensagem && <p className="sucesso-msg">{mensagem}</p>}
      {erro && <p className="erro-msg">{erro}</p>}

      {/* LISTA DE OBRAS */}
      <h3>Minhas obras</h3>

      <div className="minhas-obras">
        {obras.length === 0 ? (
          <p style={{ opacity: 0.7 }}>Você ainda não publicou nenhuma obra.</p>
        ) : (
          obras.map(o => (
            <div key={o.id} className="obra-item">
              <span>{o.titulo}</span>
              <button onClick={() => excluirObra(o.id)}>Excluir</button>
              <button onClick={() => abrirEdicao(o)}>Editar</button>
            </div>
          ))
        )}
      </div>

      {/* EDITOR DE OBRA */}
      {editandoObra && (
        <div className="editor-obra">
          <h3>Editando obra</h3>

          <input
            value={tituloEdit}
            onChange={e => setTituloEdit(e.target.value)}
            placeholder="Título da obra"
          />

          <textarea
            value={conteudoEdit}
            onChange={e => setConteudoEdit(e.target.value)}
            placeholder="Conteúdo"
            rows={6}
          />

          <button onClick={salvarEdicao}>Salvar alterações</button>
          <button onClick={() => setEditandoObra(null)}>Cancelar</button>
        </div>
      )}

      {/* EDITAR PERFIL */}
      <h3>Editar Perfil</h3>

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
            <img
              src={show}
              alt="Mostrar senha"
              style={{
                filter: mostrarSenha ? "none" : "grayscale(100%)",
                opacity: mostrarSenha ? 1 : 0.6
              }}
            />
          </button>
        </div>

        <button onClick={salvar}>Salvar</button>
      </div>

      <button className="btn-danger" onClick={deletarConta}>
        Excluir conta
      </button>

    </div>
  );
}
