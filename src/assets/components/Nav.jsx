import { Link } from "react-router-dom";
import swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import '/src/styles/estilos.css';
import '/src/styles/inicio2.css';



const Nav = ({ log, hola }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = 'Usuario';
  const greeting = '¡Bienvenido!';

  useEffect(() => {
    if (hola) {
      swal.fire({
        title: "ACCESO CONCEDIDO",
        text: `Hola ${hola}, bienvenido a (SAGS)`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#fff",
        toast: true,
        position: "top",
      });
    }
  }, [hola]);

  return (
    <header className="navbar-container">
      <Link to="/" className="logo">
        <img src="src/assets/img/sirs.jpg" width="60px" alt="Logo" />
      </Link>

      <nav className={`navbar ${menuOpen ? "navbar-open" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Sobre Nosotros</Link>
          </li>
          <li>
            <Link to="/">Gestión de Proyectos</Link>
          </li>
          <li>
            <Link to="/">Opiniones</Link>
          </li>
          <li>
            <Link to="/">Perfil</Link>
          </li>
        </ul>
      </nav>


      <div className="user-section">
        <Link to="/logout" className="user">
          <i className="fa-solid fa-user"></i>
          {log && `${log} Sesión`}
        </Link>

        {/* Botón de menú para dispositivos móviles */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fa-solid ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>

      </div>
    </header>
  );
};

export default Nav;
