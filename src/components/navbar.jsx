import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Sirs from "../img/sirs.jpg";
import stylesNav from '../styles/navbar.module.css';

const Navbar = ({ isAuthenticated, username, onLogout }) => {
  return (
    <header>
      <Link to="/" className={stylesNav.logo}>
        <img src={Sirs} width="60px" alt="Logo" />
      </Link>

      <ul className={stylesNav.navbar}>
        <li>
          <Link to="/" className={stylesNav.active}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </li>
        <li>
          <Link to="/modulos">Gestión de Proyectos</Link>
        </li>
        <li>
          <Link to="/opiniones">Opiniones</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/perfil">Perfil</Link>
          </li>
        )}
      </ul>

      <div className={stylesNav.main}>
        {isAuthenticated ? (
          <button className={stylesNav.user} onClick={onLogout}>
            <i className="fa-solid fa-user"></i> {username} Cerrar Sesión
          </button>
        ) : (
          <Link to="/login" className={stylesNav.user}>
            <FaUser className="FaUser" /> Iniciar Sesión
          </Link>
        )}
        <div className="bx bx-menu" id="menu-icon">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
