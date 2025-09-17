import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Obras from "./Obras";
import NovaObra from "./NovaObra";
import Usuarios from "./Usuarios";

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Playfair Display, serif", padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>🏠 Início</Link>
          <Link to="/obras" style={{ marginRight: "15px" }}>📚 Obras</Link>
          <Link to="/usuarios">👤 Usuários</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Bem-vindo ao PenConnect ✒️</h1>} />
          <Route path="/obras" element={<Obras />} />
          <Route path="/obras/nova" element={<NovaObra />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </div>
    </Router>
  );
}
