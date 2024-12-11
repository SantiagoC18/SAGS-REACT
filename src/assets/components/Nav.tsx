import React from 'react';

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
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/src/pages/sobre_nosotros">Sobre Nosotros</a></li>
        <li onClick={() => handleNavClick("Modulos")}>Gestion de Proyectos</li>
        <li><a href="/src/pages/opiniones">Opiniones</a></li>
        <li><a href="/src/pages/perfil">Perfil</a></li>
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
