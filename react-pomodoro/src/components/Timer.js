import React from 'react';
import './Timer.css';

const formatTime = (minutes, seconds) => {
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

const Timer = ({ minutes, seconds, isBreak, cycles, workLabel, breakLabel }) => {
  return (
    <div className="timer">
      <h2>{formatTime(minutes, seconds)}</h2>
      <p>{isBreak ? breakLabel : workLabel}</p>
      <p>Ciclos completados: {cycles}</p>
    </div>
  );
};

export default Timer; 