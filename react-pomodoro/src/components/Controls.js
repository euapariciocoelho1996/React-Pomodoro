import React from 'react';
import './Controls.css';

const Controls = ({ isActive, toggleTimer, resetTimer, openConfig }) => {
  return (
    <div className="controls">
      <button onClick={toggleTimer}>
        {isActive ? 'Pausar' : 'Iniciar'}
      </button>
      <button onClick={resetTimer}>Reiniciar</button>
      <button onClick={openConfig}>
        Configurações
      </button>
    </div>
  );
};

export default Controls; 