import "./Cadastro.css";
import { useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(""); 

  async function handleCadastro(e) {
    e.preventDefault();
    setMensagem("");
    setErro("");

    const dados = {
      nome,
      email,
      senha
    };

    try {
      const response = await fetch("http://localhost:8081/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      if (response.ok) {
        setMensagem("Conta criada com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");

        setTimeout(() => {
          window.location.href = "/login ";
        })

      } else {
        setErro(data.detail || "Erro ao criar conta.");
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="div-form">
      <h2>Criar Conta</h2>
      {mensagem && <p className="sucesso-msg">{mensagem}</p>}
      {erro && <p className="erro-msg">{erro}</p>}

      <form className="form-cadastro" onSubmit={handleCadastro}>
        
        <label className="label-cadastro">Nome:</label>
        <input 
          className="input-cadastro" 
          type="text" 
          placeholder="Nome" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label className="label-cadastro">Email:</label>
        <input 
          className="input-cadastro" 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label-cadastro">Senha:</label>
        <input 
          className="input-cadastro" 
          type="password" 
          placeholder="Senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        
        <button className="button-cadastro">Criar Conta</button>
      </form>
    </div>
  );
}
