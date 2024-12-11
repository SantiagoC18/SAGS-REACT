import React, { useState } from "react";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '/src/styles/modulos.css';


const Modulos = () => {
  const [message, setMessage] = useState(""); 
  const [log, setLog] = useState(null); 

  if (message) {
    Swal.fire({
      title: "ERROR",
      text: message,
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
      background: "#fff",
      toast: true,
      position: "top",
    });
  }

  return (
    <div>
      <header>
        <a href="/" className="logo">
          <img src="/src/assets/img/sirs.jpg" width="60px" alt="Logo" />
        </a>

        <ul className="navbar">
          <li><a href="/">Home</a></li>
          <li><a href="/sobre-nosotros">Sobre Nosotros</a></li>
          <li><a href="/modulos" className="active">Gestion de Proyectos</a></li>
          <li><a href="/opiniones">Opiniones</a></li>
          <li><a href="/perfil">Perfil</a></li>
        </ul>

        <div className="main">
          <a href="/logout" className="user">
            <i className="fa-solid fa-user"></i>
            {log ? `${log} Sesion` : ""}
          </a>
          <div className="bx bx-menu" id="menu-icon">
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </header>

      <script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.3.8/build/spline-viewer.js"
      ></script>
      <spline-viewer
        url="https://prod.spline.design/oP1Rx8Le7K9noHAa/scene.splinecode"
      ></spline-viewer>

      <section className="container-cards">
        <script src="https://cdn.tailwindcss.com"></script>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto py-10 px-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Registro de Proyecto
              </h3>
              <h4 className="text-sm text-muted-foreground">
                El formulario de registro de proyecto permite a los usuarios ingresar detalles específicos sobre
                nuevos proyectos. A través de este formulario, se recopilan datos esenciales como el nombre del
                proyecto, la descripción, el objetivo, los plazos y los recursos necesarios. Esta información es
                fundamental para gestionar y desarrollar proyectos de software de manera eficiente, asegurando que
                todos los requisitos y expectativas sean claramente definidos desde el inicio.
              </h4>
              <a href="/registrar-proyecto">
                <button className="button_view">Registrar</button>
              </a>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Gestión de Proyectos
              </h3>
              <p className="text-sm text-muted-foreground">
                Conoce el método de gestión de proyectos y los privilegios de los usuarios.
              </p>
            </div>
            <div className="p-6 grid gap-4">
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">Método de Gestión</h3>
                <p>
                  Utilizamos la metodología ágil scrum para la gestión de proyectos, donde los equipos trabajan de manera
                  colaborativa para entregar valor de manera iterativa.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-semibold">Privilegios de Usuarios</h3>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div>
                      <div className="font-semibold">Miembro del Equipo</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Puede ver y comentar en el proyecto.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <div>
                      <div className="font-semibold">Gestor de Proyecto</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Puede ver, comentar y editar el proyecto.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <div>
                      <div className="font-semibold">Administrador</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tiene acceso de administrador a todos los recursos.
                      </p>
                    </div>
                  </li>
                </ul>
                <button className="button_view" id="btn-abrir-popup1">Ingresar</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Modulos;
