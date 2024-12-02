import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import '/App.jsx';

const header = ({ log, hola }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Manejo del clic en el ícono de menú para dispositivos móviles
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (hola) {
      swal.fire({
        title: "ACCESO CONCEDIDO",
        text: `Hola ${hola} bienvenido a (SAGS)`,
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

      <nav>
        <ul className={`navbar ${menuOpen ? 'open' : ''}`}>
          <li>Home</li>
          <li>Sobre Nosotros</li>
          <li>Gestión de Proyectos</li>
          <li>Opiniones</li>
          <li>Perfil</li>
        </ul>
      </nav>



      <div className="user-section">
        <Link to="/logout" className="user">
          <i className="fa-solid fa-user"></i>
          {log && `${log} Sesión`}
        </Link>
        <div className="menu-icon" onClick={handleMenuClick}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default header;
