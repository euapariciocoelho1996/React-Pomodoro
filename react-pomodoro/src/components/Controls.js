import React from 'react';
import './Controls.css';
import ConfigModal from './ConfigModal';

const Controls = ({ 
  isActive, 
  toggleTimer, 
  resetTimer,
  workTime,
  breakTime,
  volume,
  setWorkTime,
  setBreakTime,
  handleVolumeChange,
  testSound,
  stopSound,
  handleConfigSave,
  taskName,
  setTaskName,
  workLabel,
  breakLabel,
  setWorkLabel,
  setBreakLabel
}) => {
  return (
    <div className="controls">
      <button onClick={toggleTimer}>
        {isActive ? 'Pausar' : 'Iniciar'}
      </button>
      <button onClick={resetTimer}>Reiniciar</button>
      <ConfigModal
        workTime={workTime}
        breakTime={breakTime}
        volume={volume}
        isActive={isActive}
        setWorkTime={setWorkTime}
        setBreakTime={setBreakTime}
        handleVolumeChange={handleVolumeChange}
        testSound={testSound}
        stopSound={stopSound}
        handleConfigSave={handleConfigSave}
        taskName={taskName}
        setTaskName={setTaskName}
        workLabel={workLabel}
        breakLabel={breakLabel}
        setWorkLabel={setWorkLabel}
        setBreakLabel={setBreakLabel}
      />
    </div>
  );
};

export default Controls; 