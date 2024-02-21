import React from "react";

const AudioUploader = ({ onFileChange }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);

    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div>
      <label htmlFor='audio-upload'>Upload Audio File:</label>
      <input id='audio-upload' type='file' accept='audio/mp3' onChange={handleChange} />
    </div>
  );
};

export default AudioUploader;
