import React from 'react';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="overlay" id="overlay">
      <div className="popup" id="popup" style={{ height: 'auto', maxHeight: '75%' }}>
        <button id="btn-cerrar-popup0" className="btn-cerrar-popup" onClick={onClose}>
          <i className="fas fa-times fa-xl"></i>
        </button>
        <h4>
          SAGS le permite a los desarrolladores enfocarse en el diseño y la programación. Incluye funcionalidades como
          captura y documentación de requisitos, colaboración en tiempo real, y más.
        </h4>
      </div>
    </div>
  );
};

export default Popup;
