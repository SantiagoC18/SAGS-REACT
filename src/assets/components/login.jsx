import React, { useState } from 'react';
import '/styles/registro';

const Registro = () => {
    const [isSignUp, setIsSignUp] = useState(true);

    const handleSignUp = (event) => {
        event.preventDefault();
        //Registrarse
        console.log('Registro exitoso');
    };

    const handleSignIn = (event) => {
        event.preventDefault();
        //Iniciar sesión
        console.log('Inicio de sesión exitoso');
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="container" id="container">
            {isSignUp ? (
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUp}>
                        <h1>Crear Cuenta</h1>
                        <span>Ingresa tus datos para registrarte</span>
                        <select className="input" name="tipo" required>
                            <option value="" disabled selected>
                                Seleccionar
                            </option>
                            <option value="C.C.">C.C.</option>
                            <option value="T.I.">T.I.</option>
                        </select>
                        <input type="number" name="documento" placeholder="Documento" required />
                        <input type="email" name="correo" placeholder="Email@" required />
                        <input type="password" name="clave" placeholder="Password" required minLength={8} />
                        <button type="submit">Registrar</button>
                    </form>
                </div>
            ) : (
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignIn}>
                        <h1>Iniciar Sesion</h1>
                        <span>Ingrese Usuario y contraseña</span>
                        <input type="email" name="correo" placeholder="Email@" required />
                        <input type="password" name="clave" placeholder="Password" required />
                        <a href="/recovery_email">¿Olvido Su Contraseña?</a>
                        <button type="submit">Ingresar</button>
                    </form>
                </div>
            )}
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>¡Bienvenido De Nuevo!</h1>
                        <p>Inicia con tus datos personales o con los de tu empresa</p>
                        <button className="ghost" onClick={toggleForm}>
                            Iniciar Sesion
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>¡Hola Bienvenido a (SAGS)! </h1>
                        <p>Para mantenerse en contacto con nosotros, registrate con tus datos personales o con los de tu empresa</p>
                        <button className="ghost" onClick={toggleForm}>
                            Registrate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;