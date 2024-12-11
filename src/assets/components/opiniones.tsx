import React, { useState } from "react";
import "/src/styles/foro.css";
import Swal from "sweetalert2";

const Foro: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opinions, setOpinions] = useState([
    // Aquí puedes cargar dinámicamente las opiniones
    { email: "usuario@example.com", opinion: "Excelente plataforma", rating: 5 },
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "¡Gracias por tu opinión!",
      text: "Tu opinión ha sido enviada con éxito.",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    closeModal();
  };

  return (
    <div>
      <header>
        <a href="/" className="logo">
          <img src="/src/assets/img/sirs.jpg" alt="SIRS Logo" width="60px" />
        </a>

        <ul className="navbar">
          <li><a href="/">Home</a></li>
          <li><a href="/sobre-nosotros">Sobre Nosotros</a></li>
          <li><a href="/modulos">Gestión de Proyectos</a></li>
          <li><a href="/opiniones" className="active">Opiniones</a></li>
          <li><a href="/perfil">Perfil</a></li>
        </ul>

        <div className="main">
          <a href="/logout" className="user">
            <i className="fa-solid fa-user"></i> Sesión
          </a>
          <div className="bx bx-menu" id="menu-icon">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </header>

      <spline-viewer
        url="https://prod.spline.design/oP1Rx8Le7K9noHAa/scene.splinecode"
      ></spline-viewer>

      <div id="opinions-list">
        <h2>Opiniones de Usuarios</h2>
        <p>Comparte tu experiencia con nuestra comunidad</p>
      </div>

      <center>
        <button onClick={openModal}>Dejar una Opinión</button>
      </center>

      {isModalOpen && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Dejar una Opinión</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" required />

              <label htmlFor="rating">Tipo de Opinión:</label>
              <select id="rating" name="rating" required>
                <option value="" disabled selected>
                  Seleccionar
                </option>
                <option value="Peticion">Petición</option>
                <option value="Queja">Queja</option>
                <option value="Sugerencia">Sugerencia</option>
              </select>

              <label htmlFor="opinion">Opinión:</label>
              <textarea id="opinion" name="opinion" rows={4} required></textarea>

              <label htmlFor="calificacion">Calificación:</label>
              <select id="calificacion" name="calificacion" required>
                <option value="5">5 - Excelente</option>
                <option value="4">4 - Muy Bueno</option>
                <option value="3">3 - Bueno</option>
                <option value="2">2 - Regular</option>
                <option value="1">1 - Malo</option>
              </select>

              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid">
        {opinions.map((opinion, index) => (
          <div className="opinion" key={index}>
            <h3>{opinion.email}</h3>
            <p>{opinion.opinion}</p>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <React.Fragment key={i}>
                  <input
                    type="radio"
                    id={`star${5 - i}-${index}`}
                    name={`rating-${index}`}
                    value={5 - i}
                    defaultChecked={opinion.rating === 5 - i}
                    disabled
                  />
                  <label htmlFor={`star${5 - i}-${index}`}></label>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foro;
