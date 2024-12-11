import React, { useState } from "react";
import Swal from "sweetalert2";

const Perfil: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const showWelcomeMessage = (userName: string) => {
    Swal.fire({
      title: "ACCESO CONCEDIDO",
      text: `Hola ${userName} bienvenido a (SIRS)`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      background: "#171717",
      toast: true,
      position: "top",
    });
  };

  return (
    <div>
      <Nav/>
       
      <main>
        <section className="user-info">
          <h2>Información del Usuario</h2>
          <div className="user-details">
            <img src="/static/img/usuarios/user.jpg" alt="Usuario" />
            <div className="user-text">
              <p>
                <strong>Nombre:</strong> Nombre Usuario
              </p>
              <p>
                <strong>Correo Electrónico:</strong> usuario@ejemplo.com
              </p>
              <p>
                <strong>Funcion:</strong> Administrador
              </p>
              <button
                id="btn-abrir-popup0"
                className="button"
                onClick={() => setIsPopupOpen(true)}
              >
                Editar Datos
              </button>
            </div>
          </div>
        </section>

        <section className="user-projects">
          <a href="/registrar-pro">
            <button title="Agregar proyecto" className="button_add">
              <i
                className="fa-regular fa-square-plus fa-2xl"
                style={{ color: "#ffffff" }}
              ></i>
            </button>
          </a>

          <h2>Proyectos del Usuario</h2>
          <div className="project">
            <h3>Proyecto Ejemplo</h3>
            <p>Descripción: Este es un proyecto ejemplo.</p>
            <p>Estado: En progreso</p>
            <a href="/checkdown/1">
              <button className="button_view" style={{ marginBottom: 10 }}>
                Ver
              </button>
            </a>
          </div>
        </section>
      </main>

      {isPopupOpen && (
        <div className="overlay" id="overlay">
          <div
            className="popup"
            id="popup"
            style={{ height: "65%", backgroundColor: "#0000007e" }}
          >
            <a
              href="#"
              id="btn-cerrar-popup0"
              className="btn-cerrar-popup"
              onClick={() => setIsPopupOpen(false)}
              style={{ marginRight: "-100%" }}
            >
              <i className="fas fa-times"></i>
            </a>
            <h3 style={{ color: "white" }}>Actualizar Perfil</h3>
            <form>
              <div className="input-container">
                <label htmlFor="documento" className="name">
                  No° Documento (id)
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Documento"
                  name="documento"
                  required
                />
                <div className="underline"></div>
              </div>

              <button className="button">Actualizar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
