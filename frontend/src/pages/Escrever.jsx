import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker";
import "./Escrever.css";

export default function Escrever() {
  const [texto, setTexto] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const { usuario } = useContext(AuthContext);

  // ——— Upload TXT / DOCX / PDF ———
  async function handleArquivo(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (event) => setTexto(event.target.result);
      reader.readAsText(file);
    }

    if (file.name.endsWith(".docx")) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        setTexto(value);
      };
      reader.readAsArrayBuffer(file);
    }

    if (file.name.endsWith(".pdf")) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const pdf = await pdfjsLib.getDocument({ data: event.target.result }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          text += pageText + "\n\n";
        }
        setTexto(text);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  // ——— SALVAR RASCUNHO LOCAL ———
  useEffect(() => {
    const draft = localStorage.getItem("rascunho");
    if (draft) setTexto(draft);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (texto.trim() !== "") localStorage.setItem("rascunho", texto);
    }, 800);
    return () => clearTimeout(timer);
  }, [texto]);

  // ——— PUBLICAR OBRA ———
  async function publicarObra() {
    setMensagem("");
    setErro("");

    if (!usuario) {
      setErro("Você precisa estar logado para publicar.");
      return;
    }

    if (!titulo || !descricao || !texto) {
      setErro("Preencha título, descrição e conteúdo.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/obras/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo,
          descricao,
          conteudo: texto,
          autor_id: usuario.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Obra publicada com sucesso!");

        // limpar campos
        setTitulo("");
        setDescricao("");
        setTexto("");
        localStorage.removeItem("rascunho");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setErro(data.detail || "Erro ao publicar a obra.");
      }
    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="escrever-container">
      <h2>Escrever História</h2>

      {mensagem && <p className="sucesso-msg">{mensagem}</p>}
      {erro && <p className="erro-msg">{erro}</p>}

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input type="file" accept=".txt,.docx,.pdf" onChange={handleArquivo} />

      <textarea
        className="textarea-escrita"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Comece sua história aqui..."
      ></textarea>

      <button className="btn-publicar" onClick={publicarObra}>
        Publicar
      </button>
    </div>
  );
}
