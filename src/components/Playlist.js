import React from "react";

const Playlist = ({ files, currentIndex, onItemClick }) => {
  return (
    <ul>
      {files.length > 0 &&
        files.map((file, index) => (
          <li key={index} onClick={() => onItemClick(index)}>
            {index === currentIndex ? "▶ " : ""} {file.name}
          </li>
        ))}
    </ul>
  );
};

export default Playlist;
