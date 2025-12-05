import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import './Home.css';
import maquinaDeEscrever from '../assets/img/maquina-de-escrever.png';

export default function Home() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [obrasEmAlta, setObrasEmAlta] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/obras/em-alta")
      .then(res => res.json())
      .then(data => setObrasEmAlta(data))
      .catch(err => console.error("Erro ao buscar obras em alta:", err));
  }, []);

  return (
    <div className="home-container">

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h2>Compartilhe suas histórias com o mundo</h2>
          <p>Acesse obras de outros autores<br/>para te inspirarem e divertirem!</p>
          {usuario ? (
            <button 
              className="hero-btn"
              onClick={() => navigate("/escrever")}
            >Escrever</button>
          ) : (
            <button
              className="hero-btn"
              onClick={() => navigate("/cadastro")}
            >Criar Conta</button>
          )}
        </div>

        <img 
          src={maquinaDeEscrever}
          alt="Escrita"
          className="hero-img"
        />
      </section>

      {/* HISTÓRIAS EM ALTA */}
      <section className="stories">
        <h3>Histórias em alta</h3>

        <div className="stories-area">
          <div className="cards">

            {obrasEmAlta.length === 0 && (
              <p>Nenhuma obra avaliada ainda.</p>
            )}

            {obrasEmAlta.map(obra => (
              <div
                key={obra.id}
                className="card"
                onClick={() => navigate(`/obras/${obra.id}`)}
              >
                <h4>{obra.titulo}</h4>
                <p className="autor">{obra.autor}</p>
                <span className="nota">⭐ {obra.media}</span>
              </div>
            ))}

          </div>

          {usuario ? (
            <p className="side-text">
              Continue sua jornada literária,<br />
              <strong>{usuario.nome}</strong>!<br /><br />
              Explore novas histórias e comece<br />
              a escrever a sua própria!
            </p>
          ) : (
            <p className="side-text">
              Para uma melhor experiência<br />
              crie uma conta e deixe sua<br />
              criatividade fluir livremente em<br />
              nosso espaço de escrita!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
