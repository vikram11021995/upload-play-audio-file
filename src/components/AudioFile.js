import React, { useRef, useEffect } from 'react';

const AudioFile = ({ src, onEnded }) => {
  const audioRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = src;
    audio.play();

    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('ended', onEnded);
    };
  }, [src, onEnded]);

  return <audio ref={audioRef} controls />;
};

export default AudioFile;

