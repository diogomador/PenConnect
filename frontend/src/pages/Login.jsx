import "./Cadastro.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { setUsuario } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost:8081/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.detail || "Erro ao fazer login");
        return;
      }

      // salva globalmente o usuário
      setUsuario(data);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      window.location.href = "/";

    } catch (error) {
      console.error(error);
      setErro("Erro ao conectar ao servidor.");
    }
  }

  return (
    <div className="div-form">
      <h2>Login</h2>

      {erro && <p className="erro-msg">{erro}</p>}

      <form className="form-cadastro" onSubmit={handleLogin}>
        
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

        <button className="button-cadastro">Fazer Login</button>
      </form>
    </div>
  );
}
