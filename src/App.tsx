import React from 'react';
import Swal from 'sweetalert2';
import './styles/inicio2.css';
import './App.css';
import Spline from '@splinetool/react-spline';
import './assets/components/Header.jsx';


const App: React.FC = () => {
  const handleWelcomeMessage = (name: string) => {
    Swal.fire({
      title: 'ACCESO CONCEDIDO',
      text: `Hola ${name}, bienvenido a (SAGS)`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      background: '#fff',
      toast: true,
      position: 'top',
    });
  };

  const moveItem = (checkbox: HTMLInputElement) => {
    const listItem = checkbox.parentElement!;
    const markedList = document.getElementById('marked-list')!;
    const originalList = document.getElementById('original-list')!;

    if (checkbox.checked) {
      markedList.appendChild(listItem);
    } else {
      originalList.appendChild(listItem);
    }
  };

  return (
    <div>
      <button onClick={() => handleWelcomeMessage('')}>Mostrar Bienvenida</button>
      <header id="header-container"></header>

      <Spline scene="https://prod.spline.design/oP1Rx8Le7K9noHAa/scene.splinecode" />
      <main className="container_main">
        <div className="container__cover">
          <div className="cover">
            <div className="text">
              <h1>Sistema Avanzado de Gestión de Software (SAGS)</h1>
              <p>
                SAGS es una herramienta que optimiza la planificación y el análisis en el desarrollo de software.
                Facilita la colaboración entre usuarios y terceros para crear documentación clara y estructurada, lo
                que permite a los desarrolladores enfocarse en el diseño y la programación del software.
              </p>
              <input type="button" value="Leer Más" id="btn-abrir-popup0" className="button" />
            </div>
            <div className="svg">
              <img src="/src/assets/loggg.png" alt="" />
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
            <li className="list">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>IEEE-830</span>
            </li>
          </ul>
          <button type="button" className="action">
            Empezar
          </button>
        </div>
      </main>

      <div className="overlay" id="overlay">
        <div className="popup" id="popup" style={{ height: 'auto', maxHeight: '75%' }}>
          <a href="#" id="btn-cerrar-popup0" className="btn-cerrar-popup" style={{ marginRight: '-100%', zIndex: 100 }}>
            <i className="fas fa-times fa-xl"></i>
          </a>
          <h4 style={{ color: 'white' }}>
            SAGS Le permite a los desarrolladores enfocarse en el diseño y la programación. Además, incluye
            funcionalidades como captura y documentación de requisitos, colaboración en tiempo real, gestión de
            cambios, generación automática de documentación, personalización y configuración, asegurando el cumplimiento
            de la norma IEEE-830 y mejorando la eficiencia y calidad del desarrollo de software.
          </h4>
        </div>
      </div>

      <div className="overlay" id="overlay1">
        <div className="popup" id="popup1" style={{ backgroundColor: '#000000b4' }}>
          <a href="#" id="btn-cerrar-popup1" className="btn-cerrar-popup" style={{ marginRight: '-100%' }}>
            <i className="fas fa-times"></i>
          </a>
          <h2>Seleccione los Diagramas o Modelos</h2>
          <form>
            <div className="list-container">
              <ul id="original-list" className="select-list">
                <li>
                  <input type="checkbox" onClick={(e) => moveItem(e.target as HTMLInputElement)} /> IEEE-830 con RF y
                  RNF
                </li>
              </ul>
              <ul id="marked-list" className="select-list">
              </ul>
            </div>
            <button className="action-button">Crear Plan Personalizado</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
