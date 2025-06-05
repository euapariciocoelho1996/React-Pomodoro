import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Tempo acabou
            clearInterval(interval);
            setIsActive(false);
            playAlarm();
            
            if (!isBreak) {
              // Se estava em trabalho, vai para pausa
              setMinutes(breakTime);
              setIsBreak(true);
            } else {
              // Se estava em pausa, volta para trabalho
              setMinutes(workTime);
              setIsBreak(false);
              setCycles(prev => prev + 1);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, workTime, breakTime]);

  const playAlarm = () => {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audio.play();
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(workTime);
    setSeconds(0);
    setIsBreak(false);
  };

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfigSave = () => {
    if (!isActive) {
      setMinutes(workTime);
      setSeconds(0);
    }
    setIsConfigOpen(false);
  };

  return (
    <div className="App">
      <div className="pomodoro-container">
        <h1>Pomodoro Timer</h1>
        <div className="timer">
          <h2>{formatTime(minutes, seconds)}</h2>
          <p>{isBreak ? 'Pausa' : 'Trabalho'}</p>
          <p>Ciclos completados: {cycles}</p>
        </div>
        <div className="controls">
          <button onClick={toggleTimer}>
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>
          <button onClick={resetTimer}>Reiniciar</button>
          <button onClick={() => setIsConfigOpen(!isConfigOpen)}>
            Configurações
          </button>
        </div>

        {isConfigOpen && (
          <div className="config-panel">
            <h3>Configurações</h3>
            <div className="config-item">
              <label>Tempo de Trabalho (minutos):</label>
              <input
                type="number"
                min="1"
                max="60"
                value={workTime}
                onChange={(e) => setWorkTime(Number(e.target.value))}
                disabled={isActive}
              />
            </div>
            <div className="config-item">
              <label>Tempo de Pausa (minutos):</label>
              <input
                type="number"
                min="1"
                max="30"
                value={breakTime}
                onChange={(e) => setBreakTime(Number(e.target.value))}
                disabled={isActive}
              />
            </div>
            <button onClick={handleConfigSave}>Salvar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
