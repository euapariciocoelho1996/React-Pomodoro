import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Timer from './components/Timer';
import Controls from './components/Controls';
import ConfigPanel from './components/ConfigPanel';
import AudioPlayer from './components/AudioPlayer';

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

  const handleAudioReady = (audio) => {
    audioRef.current = audio;
  };

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
        audioRef.current.loop = true;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Erro ao tocar o som:', error);
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
        audioRef.current.loop = true;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
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
      <AudioPlayer volume={volume} onAudioReady={handleAudioReady} />
      <div className="pomodoro-container">
        <h1>Pomodoro Timer</h1>
        <Timer
          minutes={minutes}
          seconds={seconds}
          isBreak={isBreak}
          cycles={cycles}
          formatTime={formatTime}
        />
        <Controls
          isActive={isActive}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          openConfig={() => setIsConfigOpen(!isConfigOpen)}
        />
        {isConfigOpen && (
          <ConfigPanel
            workTime={workTime}
            breakTime={breakTime}
            volume={volume}
            isActive={isActive}
            setWorkTime={setWorkTime}
            setBreakTime={setBreakTime}
            handleVolumeChange={handleVolumeChange}
            testSound={testSound}
            handleConfigSave={handleConfigSave}
          />
        )}
      </div>
    </div>
  );
}

export default App;
