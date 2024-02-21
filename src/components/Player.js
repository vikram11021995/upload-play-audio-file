import React, { useState, useEffect, useRef } from "react";

const Player = ({ src, onEnded }) => {
  const audioRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("ended", onEnded);
    };
  }, [onEnded]);

  return <audio ref={audioRef} src={src} />;
};

export default Player;
