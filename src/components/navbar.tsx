import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import  Sirs  from "../img/sirs.jpg";
import '../styles/navbar.module.css'

interface NavbarProps {
  isAuthenticated: boolean;
  username?: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  username,
  onLogout,
}) => {
  return (
    <header>
      <Link to="/" className="logo">
        <img src={Sirs} height="40px" alt="Logo" />
      </Link>

      <ul className="navbar">
        <li>
          <Link to="/" className="active">
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

      <div className="main">
        {isAuthenticated ? (
          <button className="user" onClick={onLogout}>
            <i className="fa-solid fa-user"></i> {username} Cerrar Sesión
          </button>
        ) : (
          <Link to="/login" className="user">
            <FaUser className="FaUser"/> Iniciar Sesión
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
