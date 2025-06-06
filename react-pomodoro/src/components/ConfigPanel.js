import React from 'react';
import './ConfigPanel.css';

const ConfigPanel = ({
  workTime,
  breakTime,
  volume,
  isActive,
  setWorkTime,
  setBreakTime,
  handleVolumeChange,
  testSound,
  handleConfigSave
}) => {
  return (
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
      <div className="config-item">
        <label>Volume do Alarme:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <button onClick={testSound} className="test-sound-btn">
          Testar Som
        </button>
      </div>
      <button onClick={handleConfigSave}>Salvar</button>
    </div>
  );
};

export default ConfigPanel; 