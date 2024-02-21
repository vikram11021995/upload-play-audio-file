import React, { useState, useEffect, useRef } from 'react';
import AudioUploader from './components/AudioUploader';
import AudioFile from './components/AudioFile';
import Playlist from './components/Playlist';

const App = () => {
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const audioRef = useRef();

  const handleFileChange = (file) => {
    setFiles([...files, file]);
  };

  const handleItemClick = (index) => {
    setCurrentFileIndex(index);
  };

  const handleEnded = () => {
    setCurrentFileIndex((prevIndex) =>
      prevIndex === files.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('audioPlayerState', JSON.stringify({
        currentFileIndex,
        currentTime: audioRef.current?.currentTime || 0
      }));
    });

    const storedState = localStorage.getItem('audioPlayerState');
    if (storedState) {
      const { currentFileIndex, currentTime } = JSON.parse(storedState);
      setCurrentFileIndex(currentFileIndex);
      if (audioRef.current) {
        audioRef.current.currentTime = currentTime;
      }
    }
  }, []);

  const currentFile = files[currentFileIndex];

  return (
    <div>
      <AudioUploader onFileChange={handleFileChange} />
      {currentFile && (
        <>
          <AudioFile
            key={currentFileIndex}
            src={URL.createObjectURL(currentFile)}
            onEnded={handleEnded}
            ref={audioRef}
          />
          <Playlist
            files={files}
            currentIndex={currentFileIndex}
            onItemClick={handleItemClick}
          />
        </>
      )}
    </div>
  );
};

export default App;


