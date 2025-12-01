import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ObraDetalhes.css";

export default function ObraDetalhes() {
  const { id } = useParams();
  const { usuario } = useContext(AuthContext);

  const [obra, setObra] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [media, setMedia] = useState(null);

  const [novoComentario, setNovoComentario] = useState("");
  const [nota, setNota] = useState(0);

  const [loadingComentario, setLoadingComentario] = useState(false);
  const [loadingAvaliacao, setLoadingAvaliacao] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    fetchObra();
    fetchComentarios();
    fetchAvaliacoes();
    fetchMedia();
    // eslint-disable-next-line
  }, [id]);

  async function fetchObra() {
    try {
      const response = await fetch(`http://localhost:8000/obras/${id}/`);
      const data = await response.json();
      setObra(data);
    } catch (err) {
      console.error("Erro ao buscar obra:", err);
    }
  }

  async function fetchComentarios() {
    try {
      const response = await fetch(`http://localhost:8000/obras/${id}/comentarios/`);
      const data = await response.json();
      setComentarios(data);
    } catch (err) {
      console.error("Erro ao buscar comentários:", err);
    }
  }

  async function fetchAvaliacoes() {
    try {
      const response = await fetch(`http://localhost:8000/obras/${id}/avaliacoes/`);
      const data = await response.json();
      setAvaliacoes(data);
    } catch (err) {
      console.error("Erro ao buscar avaliações:", err);
    }
  }

  async function fetchMedia() {
    try {
      const r = await fetch(`http://localhost:8000/obras/${id}/media/`);
      const d = await r.json();
      setMedia(d.media ?? "Sem avaliações");
    } catch (err) {
      console.error("Erro ao buscar média:", err);
    }
  }

  async function enviarComentario() {
    if (!usuario) {
      alert("Você precisa estar logado para comentar.");
      return;
    }
    if (!novoComentario.trim()) return;

    setLoadingComentario(true);
    try {
      const response = await fetch("http://localhost:8000/comentarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autor: usuario.nome,
          texto: novoComentario,
          obra_id: Number(id)
        })
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Erro ao enviar comentário");
      }

      setNovoComentario("");
      await fetchComentarios();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar comentário.");
    } finally {
      setLoadingComentario(false);
    }
  }

  async function enviarAvaliacao() {
    if (!usuario) {
      alert("Você precisa estar logado para avaliar.");
      return;
    }

    const n = Number(nota);
    if (Number.isNaN(n) || n < 0 || n > 10) {
      alert("Nota inválida (0-10)");
      return;
    }

    setLoadingAvaliacao(true);
    try {
      const response = await fetch("http://localhost:8000/avaliacoes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avaliador: usuario.nome,
          nota: n,
          obra_id: Number(id)
        })
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Erro ao enviar avaliação");
      }

      // atualiza lista e média
      await fetchAvaliacoes();
      await fetchMedia();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar avaliação.");
    } finally {
      setLoadingAvaliacao(false);
    }
  }

  async function deletarComentario(comentarioId) {
    if (!usuario) return;
    if (!confirm("Deseja mesmo excluir este comentário?")) return;

    setLoadingDelete(true);
    try {
      const response = await fetch(`http://localhost:8000/comentarios/${comentarioId}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario.nome)
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Erro ao deletar comentário");
      }

      await fetchComentarios();
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir comentário.");
    } finally {
      setLoadingDelete(false);
    }
  }

  function calcularMediaLocal() {
    if (media === null) return "Carregando...";
    return media === "Sem avaliações" ? "Sem avaliações" : media;
  }

  if (!obra) return <p>Carregando...</p>;

  return (
    <div className="obra-page">
      <div className="obra-container">
        <h1 className="obra-titulo">{obra.titulo}</h1>
        <p className="obra-descricao">{obra.descricao}</p>
        <p className="obra-autor">Autor: {obra.autor}</p>
        <div className="obra-conteudo">{obra.conteudo}</div>

        <hr />

        {/* AVALIAÇÕES */}
        <h3>⭐ Avaliações</h3>

        <p className="media-avaliacao">
          Média: <strong>{calcularMediaLocal()}</strong> ⭐
        </p>

        {/* LISTA DE AVALIAÇÕES */}
        <div className="lista-avaliacoes">
          {avaliacoes.length === 0 && <p>Ninguém avaliou ainda.</p>}

          {avaliacoes.map((a) => (
            <div key={a.id} className="avaliacao-item">
              <strong className={a.avaliador === obra.autor ? "autor-obra" : ""}>
                {a.avaliador}
              </strong>{" "}
              — {a.nota}/10
            </div>
          ))}
        </div>

        <br />

        {/* FORMULÁRIO PRA AVALIAR */}
        {usuario ? (
          <>
            <div className="estrelas" aria-label="Escolha uma nota (0-10)">
              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                <span
                  key={n}
                  role="button"
                  tabIndex={0}
                  className={Number(nota) >= n ? "estrela ativa" : "estrela"}
                  onClick={() => setNota(n)}
                  onKeyDown={(e) => { if (e.key === "Enter") setNota(n); }}
                >
                  ⭐
                </span>
              ))}
            </div>

            <button onClick={enviarAvaliacao} disabled={loadingAvaliacao}>
              {loadingAvaliacao ? "Enviando..." : "Avaliar"}
            </button>
          </>
        ) : (
          <p>Faça login para avaliar.</p>
        )}

        {/* COMENTÁRIOS */}
        <h3>💬 Comentários</h3>

        {usuario ? (
          <>
            <textarea
              placeholder="Digite seu comentário..."
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
            />
            <button onClick={enviarComentario} disabled={loadingComentario}>
              {loadingComentario ? "Enviando..." : "Comentar"}
            </button>
          </>
        ) : (
          <p>Faça login para comentar.</p>
        )}

        <div className="comentarios-lista">
          {comentarios.length === 0 && <p>Nenhum comentário ainda.</p>}
          {comentarios.map((c) => (
            <div key={c.id} className="comentario-item">
              <strong className={c.autor === obra.autor ? "autor-obra" : ""}>
                {c.autor}
              </strong>
              <p>{c.texto}</p>

              {usuario?.nome === c.autor && (
                <button
                  onClick={() => deletarComentario(c.id)}
                  className="btn-excluir"
                  disabled={loadingDelete}
                >
                  🗑 Excluir
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="voltar-btn" onClick={() => window.history.back()}>
          ← Voltar
        </button>
      </div>
    </div>
  );
}
