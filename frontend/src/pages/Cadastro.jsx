import "./Cadastro.css";
import { useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCadastro(e) {
    e.preventDefault();

    const dados = {
      nome,
      username: email, // se sua API usa username no lugar de email
      senha
    };

    try {
      const response = await fetch("http://localhost:8000/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      if (response.ok) {
        alert("Conta criada com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
      } else {
        alert("Erro ao criar conta");
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="div-form">
      <h2>Criar Conta</h2>
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
