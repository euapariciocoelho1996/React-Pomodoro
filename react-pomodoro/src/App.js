import React, { useState, useEffect, useRef } from 'react';
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
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Inicializar o áudio quando o componente montar
  useEffect(() => {
    const audio = new Audio();
    
    // Configurar o áudio com múltiplos formatos para melhor compatibilidade
    audio.src = './sound/alarm-clock-90867.mp3';
    audio.type = 'audio/mpeg';
    audio.volume = volume;
    audio.preload = 'auto';
    
    // Adicionar listeners para eventos de áudio
    audio.addEventListener('error', (e) => {
      console.error('Erro no carregamento do áudio:', e);
      console.error('Detalhes do erro:', e.target.error);
    });

    audio.addEventListener('canplaythrough', () => {
      console.log('Áudio carregado com sucesso');
    });

    // Tentar carregar o áudio
    audio.load();
    
    audioRef.current = audio;

    // Função para testar o som
    const testSound = async () => {
      if (!audioRef.current) return;
      
      try {
        // Verificar se o áudio está pronto para reprodução
        if (audioRef.current.readyState >= 2) {
          audioRef.current.currentTime = 0;
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }, 1000);
              })
              .catch(error => {
                console.error('Erro na promessa de reprodução:', error);
              });
          }
        } else {
          console.log('Áudio ainda não está pronto para reprodução');
        }
      } catch (error) {
        console.error('Erro ao testar o som:', error);
      }
    };

    // Testar o som após um pequeno delay para garantir que o áudio foi carregado
    setTimeout(testSound, 1000);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume]);

  // Atualizar o volume quando ele mudar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            playAlarm();
            
            if (!isBreak) {
              setMinutes(breakTime);
              setIsBreak(true);
            } else {
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

  const playAlarm = async () => {
    if (!audioRef.current) return;
    
    try {
      if (audioRef.current.readyState >= 2) {
        audioRef.current.currentTime = 0;
        audioRef.current.loop = true; // Ativar loop
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Erro ao tocar o som:', error);
            // Tentar tocar o som novamente após interação do usuário
            const playOnClick = async () => {
              try {
                if (audioRef.current && audioRef.current.readyState >= 2) {
                  audioRef.current.loop = true;
                  await audioRef.current.play();
                }
                document.removeEventListener('click', playOnClick);
              } catch (error) {
                console.error('Erro ao tocar o som após clique:', error);
              }
            };
            document.addEventListener('click', playOnClick);
          });
        }

        // Parar o som após 7 segundos
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.loop = false;
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }, 7000);
      } else {
        console.log('Áudio ainda não está pronto para reprodução');
      }
    } catch (error) {
      console.error('Erro ao tocar o som:', error);
    }
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

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const testSound = async () => {
    if (!audioRef.current) return;
    
    try {
      if (audioRef.current.readyState >= 2) {
        audioRef.current.currentTime = 0;
        audioRef.current.loop = true; // Ativar loop
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Parar o som após 7 segundos
              setTimeout(() => {
                if (audioRef.current) {
                  audioRef.current.loop = false;
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
              }, 7000);
            })
            .catch(error => {
              console.error('Erro na promessa de reprodução:', error);
            });
        }
      } else {
        console.log('Áudio ainda não está pronto para reprodução');
      }
    } catch (error) {
      console.error('Erro ao testar o som:', error);
    }
  };

  return (
    <div className="App">
      <audio
        ref={audioRef}
        src="./sound/alarm-clock-90867.mp3"
        preload="auto"
        style={{ display: 'none' }}
      />
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
        )}
      </div>
    </div>
  );
}

export default App;
