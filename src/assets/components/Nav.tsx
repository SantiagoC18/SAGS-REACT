import React from 'react';
import { Link } from 'react-router-dom';
import '/src/styles/inicio2.css';


interface HeaderProps {
  isLogged: boolean;
  username: string;
  handleNavClick: (componente: string) => void;
}

const Nav: React.FC<HeaderProps> = ({ isLogged, username, handleNavClick }) => {
  return (
    <header>
      <a href="/" className="logo">
        <img src="/src/assets/img/sirs.jpg" alt="Logo" width="60" />
      </a>
      <ul className="navbar">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/sobre_nosotros">Sobre Nosotros</Link></li>
      <li><Link to="/gestion-de-proyectos">Gestión de Proyectos</Link></li>
      <li><Link to="/opiniones">Opiniones</Link></li>
      <li><Link to="/perfil">Perfil</Link></li>
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
  );
};

export default Nav;
