import React from 'react';
import Swal from 'sweetalert2';
import './ConfigModal.css';

const ConfigModal = ({
  workTime,
  breakTime,
  volume,
  isActive,
  setWorkTime,
  setBreakTime,
  handleVolumeChange,
  testSound,
  stopSound,
  handleConfigSave,
  workLabel,
  setWorkLabel
}) => {
  const showConfigModal = () => {
    Swal.fire({
      title: 'Configurações do Pomodoro',
      html: `
        <div class="config-container">
          <div class="config-item">
            <label>Rótulo de Trabalho</label>
            <input
              type="text"
              id="workLabel"
              class="swal2-input"
              value="${workLabel}"
              placeholder="Trabalho"
            >
          </div>
          <div class="config-item">
            <label>Tempo de Trabalho (minutos)</label>
            <input
              type="number"
              id="workTime"
              class="swal2-input"
              min="1"
              max="60"
              value="${workTime}"
              ${isActive ? 'disabled' : ''}
            >
          </div>
          <div class="config-item">
            <label>Tempo de Pausa (minutos)</label>
            <input
              type="number"
              id="breakTime"
              class="swal2-input"
              min="1"
              max="30"
              value="${breakTime}"
              ${isActive ? 'disabled' : ''}
            >
          </div>
          <div class="config-item">
            <label>Volume do Alarme</label>
            <input
              type="range"
              id="volume"
              class="swal2-range"
              min="0"
              max="1"
              step="0.1"
              value="${volume}"
            >
            <div class="sound-buttons">
              <button id="testSound" class="swal2-confirm swal2-styled test-sound-btn">
                <i className="fas fa-play"></i> Testar Som
              </button>
              <button id="stopSound" class="swal2-cancel swal2-styled stop-sound-btn">
                <i className="fas fa-stop"></i> Parar
              </button>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#8B0000',
      cancelButtonColor: '#666',
      customClass: {
        popup: 'config-modal',
        title: 'config-title',
        confirmButton: 'config-save-btn',
        cancelButton: 'config-cancel-btn'
      },
      didOpen: () => {
        const workLabelInput = document.getElementById('workLabel');
        const workTimeInput = document.getElementById('workTime');
        const breakTimeInput = document.getElementById('breakTime');
        const volumeInput = document.getElementById('volume');
        const testSoundBtn = document.getElementById('testSound');
        const stopSoundBtn = document.getElementById('stopSound');

        workLabelInput.addEventListener('input', (e) => {
          setWorkLabel(e.target.value);
        });

        workTimeInput.addEventListener('input', (e) => {
          setWorkTime(Number(e.target.value));
        });

        breakTimeInput.addEventListener('input', (e) => {
          setBreakTime(Number(e.target.value));
        });

        volumeInput.addEventListener('input', (e) => {
          handleVolumeChange({ target: { value: e.target.value } });
        });

        testSoundBtn.addEventListener('click', () => {
          testSound();
        });

        stopSoundBtn.addEventListener('click', () => {
          stopSound();
        });

        workLabelInput.value = workLabel;
      },
      preConfirm: () => {
        handleConfigSave();
      }
    });
  };

  return (
    <button
      onClick={showConfigModal}
      className="config-button"
    >
      <i className="fas fa-cog"></i>
      Configurações
    </button>
  );
};

export default ConfigModal; 