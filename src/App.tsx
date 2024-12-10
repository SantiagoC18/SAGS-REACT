import React, { useState } from 'react';
import './styles/inicio2.css';
import './styles/estilos.css';

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const username = 'Usuario'; 
  const greeting = '¡Bienvenido!'; 

  const registroProyecto = () => {
    window.location.href = '/registrar_pro';
  };

  return (
    <div>
      <header>
        <a href="/" className="logo">
          <img src="\src\assets\sirs.jpg" alt="Logo" width="60" />
        </a>
        <ul className="navbar">
          <li>
            <a href="/" className="active">Home</a>
          </li>
          <li><a href="\src\pages\sobre_nosotros">Sobre Nosotros</a></li>
          <li><a href="/pages/modulos">Gestión de Proyectos</a></li>
          <li><a href="/opiniones">Opiniones</a></li>
          <li><a href="/perfil">Perfil</a></li>
        </ul>
        <div className="main">
          <a href="/logout" className="user">
            <i className="fa-solid fa-user"></i>
            {isLogged ? `${username} Sesión` : ''}
          </a>
          <div className="bx bx-menu" id="menu-icon">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </header>

      <main className="container_main">
        <div className="container__cover">
          <div className="cover">
            <div className="text">
              <h1>Sistema Avanzado de Gestión de Software (SAGS)</h1>
              <p>
                SAGS es una herramienta que optimiza la planificación y el análisis en el desarrollo de software.
                Facilita la colaboración entre usuarios y terceros para crear documentación clara y estructurada, lo que
                permite a los desarrolladores enfocarse en el diseño y la programación del software.
              </p>
              <button id="btn-abrir-popup0" className="button">
                Leer Más
              </button>
            </div>
            <div className="svg">
              <img src="\src\assets\loggg.png" alt="Logo SVG" />
            </div>
          </div>
        </div>
      </main>

      <main className="container__plans">
        <div className="card">
          <div className="header">
            <span className="title">Basic</span>
            <span className="price">$150.000 COP</span>
          </div>
          <ul className="lists">
            <li className="list">IEEE-830</li>
            <li className="list">Casos de Uso</li>
            <li className="list">Casos de Uso extendido</li>
            <li className="list">Reuniones online</li>
            <li className="list">Visitas físicas</li>
          </ul>
          <button type="button" className="action" onClick={registroProyecto}>
            Empezar
          </button>
        </div>

        <div className="card">
          <div className="header">
            <span className="title">Standard</span>
            <span className="price">$300.000 COP</span>
          </div>
          <ul className="lists">
            <a href="https://www.ejemplo.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="24" height="24">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>

            <li className="list">IEEE-830</li>
            <li className="list">Casos de Uso</li>
            <li className="list">Casos de Uso extendido</li>
            <li className="list">Reuniones online</li>
            <li className="list">Visitas físicas</li>
          </ul>
          <button type="button" className="action" onClick={registroProyecto}>
            Empezar
          </button>
        </div>

        <div className="card">
          <div className="header">
            <span className="title">Premium</span>
            <span className="price">$600.000 COP</span>
          </div>
          <ul className="lists">
            <li className="list">IEEE-830</li>
            <li className="list">Casos de Uso</li>
            <li className="list">Casos de Uso extendido</li>
            <li className="list">Reuniones online</li>
            <li className="list">Visitas físicas</li>
          </ul>
          <button type="button" className="action" onClick={registroProyecto}>
            Empezar
          </button>
        </div>

        <div className="card">
          <div className="header">
            <span className="title">Personalizar plan</span>
          </div>
          <p className="desc">
            Aquí tendrás la posibilidad de personalizar tu plan para que se adapte a las necesidades del análisis de tu
            proyecto.
          </p>
          <ul className="lists"></ul>
          <button type="button" className="action" onClick={registroProyecto}>
            Empezar
          </button>
        </div>
      </main>

      <div className="overlay" id="overlay">
        <div className="popup" id="popup" style={{ height: 'auto', maxHeight: '75%' }}>
          <button id="btn-cerrar-popup0" className="btn-cerrar-popup">
            <i className="fas fa-times fa-xl"></i>
          </button>
          <h4>
            SAGS le permite a los desarrolladores enfocarse en el diseño y la programación. Incluye funcionalidades como
            captura y documentación de requisitos, colaboración en tiempo real, y más.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default App;
