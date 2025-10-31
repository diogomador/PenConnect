import "./Cadastro.css";
export default function Login() {
  return (
    <div className="div-form">
      <h2>Login</h2>
      <form className="form-cadastro">
        <label htmlFor="email" className="label-cadastro">Email:</label>
        <input className="input-cadastro" type="email" placeholder="Email" />

        <label htmlFor="senha" className="label-cadastro">Senha:</label>
        <input className="input-cadastro" type="password" placeholder="Senha" />
        <button className="button-cadastro">Fazer Login</button>
      </form>
    </div>
  );
}
