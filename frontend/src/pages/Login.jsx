import "./Cadastro.css";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Erro ao fazer login");
        return;
      }

      alert("Login realizado com sucesso!");

      // Salva usuário no navegador
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Redireciona para Home
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Erro ao conectar ao servidor.");
    }
  }

  return (
    <div className="div-form">
      <h2>Login</h2>
      <form className="form-cadastro" onSubmit={handleLogin}>
        
        <label htmlFor="email" className="label-cadastro">Email:</label>
        <input
          className="input-cadastro"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="senha" className="label-cadastro">Senha:</label>
        <input
          className="input-cadastro"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="button-cadastro">Fazer Login</button>
      </form>
    </div>
  );
}
