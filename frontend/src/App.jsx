import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Obras from "./pages/Obras";
import Usuarios from "./pages/Usuarios";
import Home from "./pages/Home";

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
          <Route path="/" element={<Home />} />
          <Route path="/obras" element={<Obras />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </div>
    </Router>
  );
}
