import React, { useState } from "react";

<style>{`
   body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
.form-container h2 {
    text-align: center;
    margin-bottom: 20px;
}
.form-group {
    margin-bottom: 15px;
}
.form-group label {
    display: block;
    margin-bottom: 5px;
}
.form-group input, .form-group select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ddd;
}
.form-group input[type="checkbox"] {
    width: auto;
}
.form-group .checkbox-label {
    display: inline-block;
    margin-left: 10px;
}
.form-group button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.form-group button:hover {
    background-color: #0056b3;
}
  `}</style>


const SobreNosotros = () => {
    // Estado para manejar la visibilidad del formulario de personalización
    const [mostrarPersonalizacion, setMostrarPersonalizacion] = useState(false);

    // Función para manejar el cambio del select
    const handlePlanChange = (event) => {
        if (event.target.value === "Plan Personalizado") {
            setMostrarPersonalizacion(true);
        } else {
            setMostrarPersonalizacion(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Creación de Proyecto y Plan</h2>
            <form action="/crear-proyecto" method="POST">
                {/* Detalles del proyecto */}
                <div className="form-group">
                    <label htmlFor="nombre">Nombre del Proyecto:</label>
                    <input type="text" id="nombre" name="nombre" required />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <input type="text" id="descripcion" name="descripcion" required />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaI">Fecha de Inicio:</label>
                    <input type="date" id="fechaI" name="fechaI" required />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaF">Fecha de Finalización:</label>
                    <input type="date" id="fechaF" name="fechaF" required />
                </div>

                {/* Selección de Plan */}
                <div className="form-group">
                    <label htmlFor="nomplan">Seleccionar Plan:</label>
                    <select id="nomplan" name="nomplan" onChange={handlePlanChange}>
                        <option value="Plan Básico">Plan Básico</option>
                        <option value="Plan Avanzado">Plan Avanzado</option>
                        <option value="Plan Personalizado">Plan Personalizado</option>
                    </select>
                </div>

                {/* Opciones de Personalización */}
                {mostrarPersonalizacion && (
                    <div className="form-group" id="personalizacion">
                        <h3>Personalizar Plan</h3>
                        <label>
                            <input type="checkbox" name="integraciones_software" value="1" />
                            <span className="checkbox-label">Integraciones de Software</span>
                        </label><br />
                        <label>
                            <input type="checkbox" name="revision_procesos" value="1" />
                            <span className="checkbox-label">Revisión de Procesos</span>
                        </label><br />
                        <label>
                            <input type="checkbox" name="reuniones_avanzadas" value="1" />
                            <span className="checkbox-label">Reuniones Técnicas Avanzadas</span>
                        </label><br />
                        <label>
                            <input type="checkbox" name="soporte_completo" value="1" />
                            <span className="checkbox-label">Soporte Completo</span>
                        </label><br />
                        <label>
                            <input type="checkbox" name="asesoria_constante" value="1" />
                            <span className="checkbox-label">Asesoría Constante</span>
                        </label>
                    </div>
                )}

                <div className="form-group">
                    <button type="submit">Crear Proyecto</button>
                </div>
            </form>
        </div>
    );
};

export default SobreNosotros;
