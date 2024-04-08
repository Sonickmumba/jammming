/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

const Playlist = ({ playlist, handleRemoveTrack }) => {
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    setMyPlaylist(playlist);
  }, [playlist]);

  const handleSubmitPlaylist = (e) => {
    e.preventDefault();
    console.log(myPlaylist);
  };

  return (
    <form className="list-container" onSubmit={handleSubmitPlaylist}>
      <input
        name="playlistName"
        type="text"
        placeholder=""
        id="playlist-name"
      />
      {myPlaylist.map((item) => (
        <div className="card" key={item.id}>
          <div className="track-name">{item.name}</div>
          <div className="artist-album">
            {/* <span>{item.artist}</span> */}
            <span className="track-art-alb">{item.artist}</span>
            <span className="track-art-alb">{item.album}</span>
          </div>
          <button
            className="add-button"
            onClick={(e) => handleRemoveTrack(e, item.id)}
          >
            -
          </button>
        </div>
      ))}

      <div className="div-button">
        <button type="submit">Save to spotify</button>
      </div>
    </form>
  );
};

export default Playlist;
