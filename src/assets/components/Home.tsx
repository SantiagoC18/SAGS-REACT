import React, { useState } from 'react';
import '/src/styles/inicio2.css';

const Home = () => {
  const [componenteActivo, setComponenteActivo] = useState<string>("modulos");
  const [isLogged, setIsLogged] = useState(false);
  const username = 'Usuario';
  const greeting = '¡Bienvenido!';

  const registroProyecto = () => {
    window.location.href = '/registrar_pro';
  };

  const handleNavClick = (componente: string) => {
    setComponenteActivo(componente);
  };

  const closePopup = () => {
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.style.display = 'none';
  };

  return (
    <div>
      <main className="container_main">
        <div className="container__cover">
          <div className="cover">
            <div className="text">
              <h1>Sistema Avanzado de Gestión de Software (SAGS)</h1>
              <p>
                SAGS es una herramienta que optimiza la planificación y el análisis en el desarrollo de software.
                Facilita la colaboración entre usuarios y terceros para crear documentación clara y estructurada.
              </p>
              <button id="btn-abrir-popup0" className="button">
                Leer Más
              </button>
            </div>
            <div className="svg">
              <img src="/src/assets/img/loggg.png" alt="Logo SVG" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
