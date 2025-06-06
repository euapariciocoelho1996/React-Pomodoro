import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Controls from './Controls';
import AudioPlayer from './AudioPlayer';
import './Pomodoro.css';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [volume, setVolume] = useState(0.5);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer acabou
            if (isBreak) {
              // Fim da pausa
              setIsBreak(false);
              setMinutes(workTime);
              setCycles(prev => prev + 1);
            } else {
              // Fim do trabalho
              setIsBreak(true);
              setMinutes(breakTime);
            }
            if (audio) {
              audio.play();
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
  }, [isActive, minutes, seconds, isBreak, workTime, breakTime, audio]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(workTime);
    setSeconds(0);
    setCycles(0);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const testSound = () => {
    if (audio) {
      audio.play();
    }
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const handleConfigSave = () => {
    if (!isActive) {
      setMinutes(workTime);
      setSeconds(0);
    }
  };

  return (
    <div className="pomodoro-container">
      <h1>Pomodoro Timer</h1>
      <Timer
        minutes={minutes}
        seconds={seconds}
        isBreak={isBreak}
        cycles={cycles}
      />
      <Controls
        isActive={isActive}
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
        workTime={workTime}
        breakTime={breakTime}
        volume={volume}
        setWorkTime={setWorkTime}
        setBreakTime={setBreakTime}
        handleVolumeChange={handleVolumeChange}
        testSound={testSound}
        stopSound={stopSound}
        handleConfigSave={handleConfigSave}
      />
      <AudioPlayer
        volume={volume}
        onAudioReady={setAudio}
      />
    </div>
  );
};

export default Pomodoro; 