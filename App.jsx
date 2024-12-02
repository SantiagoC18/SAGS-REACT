import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '/src/assets/components/header';
import '/src/assets/components/login';

const App = () => {
    const log = "Usuario"; 
    const hola = "Juan"; 

    return (
        <div>
            <Navbar log={log} hola={hola} />
            <h1>Home</h1>
            <h1>Sobre Nosotros</h1>
            <h1>Gestión de Proyectos</h1>
            <h1>Opiniones</h1>
            <h1>Perfil</h1>
            <h1>Logout</h1>

        </div>
    );
};

export default App;