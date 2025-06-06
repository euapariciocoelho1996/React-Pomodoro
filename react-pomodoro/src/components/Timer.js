import React from 'react';
import './Timer.css';

const Timer = ({ minutes, seconds, isBreak, cycles, formatTime }) => {
  return (
    <div className="timer">
      <h2>{formatTime(minutes, seconds)}</h2>
      <p>{isBreak ? 'Pausa' : 'Trabalho'}</p>
      <p>Ciclos completados: {cycles}</p>
    </div>
  );
};

export default Timer; 