import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import './Header.css';

export default function Header() {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <Link to="/" className="logo">PenConnect</Link>

      <nav className="menu">
        {usuario ? (
          <>
            <span className="user-name">Olá, {usuario.nome}</span>
            <Link to="/feed" className="menu-btn">Explorar Obras</Link>
            <Link to="/escrever" className="menu-btn">Escrever</Link>
            <button className="menu-btn" onClick={logout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/cadastro" className="menu-btn">Criar Conta</Link>
            <Link to="/login" className="menu-btn">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
