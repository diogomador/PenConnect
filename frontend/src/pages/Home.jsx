import { Link } from "react-router-dom";
import './Home.css';
import maquinaDeEscrever from '../assets/img/maquina-de-escrever.png';
export default function Home() {
  return (
    <div className="home-container">

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h2>Compartilhe suas histórias com o mundo</h2>
          <p>Acesse obras de outros autores<br/>para te inspirarem e divertirem!</p>
        </div>

        <img 
          src= {maquinaDeEscrever}
          alt="Escrita"
          className="hero-img"
        />
      </section>

      {/* HISTÓRIAS EM ALTA */}
      <section className="stories">
        <h3>Histórias em alta</h3>

        <div className="stories-area">
          <div className="cards">
            <div className="card">Exemplo 1</div>
            <div className="card">Exemplo 2</div>
            <div className="card">Exemplo 3</div>
          </div>

          <p className="side-text">
            Para uma melhor experiência<br/>
            crie uma conta e deixe sua<br/>
            criatividade fluir livremente em<br/>
            nosso espaço de escrita!
          </p>
        </div>
      </section>
    </div>
  );
}
