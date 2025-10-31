import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
        <h1 className="logo">
            <Link to="/" className="logo-link">PenConnect</Link>
        </h1>
      
      <nav className="menu">
        <Link to="/escrever" className="menu-btn">Escrever</Link>
        <Link to="/cadastro" className="menu-btn">Criar Conta</Link>
        <Link to="/login" className="menu-btn">Login</Link>
      </nav>
    </header>
  );
}
