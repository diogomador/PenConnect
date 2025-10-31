export default function Login() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" /><br/><br/>
        <input type="password" placeholder="Senha" /><br/><br/>
        <button>Entrar</button>
      </form>
    </div>
  );
}
