export default function Cadastro() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Criar Conta</h2>
      <form>
        <input type="text" placeholder="Nome" /><br/><br/>
        <input type="email" placeholder="Email" /><br/><br/>
        <input type="password" placeholder="Senha" /><br/><br/>
        <button>Criar Conta</button>
      </form>
    </div>
  );
}
