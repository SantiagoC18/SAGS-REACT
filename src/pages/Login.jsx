import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Spline from "@splinetool/react-spline";
import stylesLogin from "../styles/Login.module.css";

function Login() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [formData, setFormData] = useState({
    loginCorreo: "",
    loginClave: "",
    tipo: "",
    documento: "",
    registroCorreo: "",
    registroClave: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const showAlert = (text, icon) => {
    Swal.fire({
      text,
      icon,
      timer: 4000,
      showConfirmButton: false,
      toast: true,
      position: "top",
    });
  };

  const validateFields = (fields) => {
    return fields.every((field) => formData[field].trim() !== "");
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
    );
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields(["loginCorreo", "loginClave"])) {
      showAlert("Por favor, complete todos los campos.", "error");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginCorreo: formData.loginCorreo,
          loginClave: formData.loginClave,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        showAlert("Inicio de sesión exitoso.", "success");
      } else {
        setMessage(data.message);
        showAlert(data.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al conectar con el servidor.");
      showAlert("Error al conectar con el servidor.", "error");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields(["tipo", "documento", "registroCorreo", "registroClave"])) {
      showAlert("Por favor, complete todos los campos.", "error");
      return;
    }

    if (!validatePassword(formData.registroClave)) {
      showAlert(
        "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula y un número.",
        "error"
      );
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: formData.tipo,
          documento: formData.documento,
          registroCorreo: formData.registroCorreo,
          registroClave: formData.registroClave,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        showAlert("Registro exitoso.", "success");
      } else {
        setMessage(data.message);
        showAlert(data.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error al conectar con el servidor.");
      showAlert("Error al conectar con el servidor.", "error");
    }
  };

  return (
    <div>
      <Spline scene="https://prod.spline.design/rqyOgotND7rd5BIN/scene.splinecode" />
      <div
        id="container-login"
        className={`${stylesLogin.container_login} ${
          isSignUpActive ? stylesLogin.right_panel_active : ""
        }`}
      >
        {/* Sign Up Form */}
        <div className={`${stylesLogin.form_container} ${stylesLogin.sign_up_container}`}>
          <form onSubmit={handleRegisterSubmit}>
            <h1>Crear Cuenta</h1>
            <span>Ingresa tus datos para registrarte</span>
            <select
              className="input"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Seleccionar
              </option>
              <option value="C.C.">C.C.</option>
              <option value="T.I.">T.I.</option>
            </select>
            <input
              type="number"
              name="documento"
              placeholder="Documento"
              value={formData.documento}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="registroCorreo"
              placeholder="Email@"
              value={formData.registroCorreo}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="registroClave"
              placeholder="Password"
              value={formData.registroClave}
              onChange={handleInputChange}
            />
            <button type="submit">Registrar</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={`${stylesLogin.form_container} ${stylesLogin.sign_in_container}`}>
          <form onSubmit={handleLoginSubmit}>
            <h1>Iniciar Sesión</h1>
            <span>Ingrese Usuario y contraseña</span>
            <input
              type="email"
              name="loginCorreo"
              placeholder="Email@"
              value={formData.loginCorreo}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="loginClave"
              placeholder="Password"
              value={formData.loginClave}
              onChange={handleInputChange}
            />
            <a href="#">¿Olvidó Su Contraseña?</a>
            <button type="submit">Ingresar</button>
          </form>
        </div>

        {/* Overlay */}
        <div className={stylesLogin.overlay_container}>
          <div className={stylesLogin.overlay_login}>
            <div className={`${stylesLogin.overlay_panel} ${stylesLogin.overlay_left}`}>
              <h1>¡Bienvenido De Nuevo!</h1>
              <p>Inicia con tus datos personales o con los de tu empresa</p>
              <button
                className={stylesLogin.ghost}
                onClick={() => setIsSignUpActive(false)}
              >
                Iniciar Sesión
              </button>
            </div>
            <div className={`${stylesLogin.overlay_panel} ${stylesLogin.overlay_right}`}>
              <h1>¡Hola Bienvenido a (SAGS)!</h1>
              <p>
                Para mantenerse en contacto con nosotros, regístrate con tus
                datos personales o con los de tu empresa
              </p>
              <button
                className={stylesLogin.ghost}
                onClick={() => setIsSignUpActive(true)}
              >
                Registrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
