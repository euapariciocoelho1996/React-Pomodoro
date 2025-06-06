import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ volume, onAudioReady }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    
    audio.src = './sound/alarm-clock-90867.mp3';
    audio.type = 'audio/mpeg';
    audio.volume = volume;
    audio.preload = 'auto';
    
    audio.addEventListener('error', (e) => {
      console.error('Erro no carregamento do áudio:', e);
      console.error('Detalhes do erro:', e.target.error);
    });

    audio.addEventListener('canplaythrough', () => {
      console.log('Áudio carregado com sucesso');
      if (onAudioReady) {
        onAudioReady(audio);
      }
    });

    audio.load();
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume, onAudioReady]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <audio
      ref={audioRef}
      src="./sound/alarm-clock-90867.mp3"
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

export default AudioPlayer; 