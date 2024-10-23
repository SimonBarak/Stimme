import React, { useEffect, useRef } from "react";

type PlayerProps = {
  src: string;
};

const PlayerSm: React.FC<PlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Play the audio whenever the src changes
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [src]);

  return (
    <audio ref={audioRef} src={src} controls>
      Your browser does not support the audio element.
    </audio>
  );
};

export default PlayerSm;
