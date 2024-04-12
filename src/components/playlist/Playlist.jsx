/* eslint-disable react/prop-types */

// import { useState, useEffect } from "react";

const Playlist = ({
  // playlist,
  handleRemoveTrack,
  handleSubmitPlaylist,
  handleChange,
  myPlaylist,
  myPlaylistName,
}) => {
  return (
    <form className="list-container" onSubmit={handleSubmitPlaylist}>
      <input
        name="playlistName"
        type="text"
        placeholder=""
        id="playlist-name"
        value={myPlaylistName}
        onChange={handleChange}
      />
      <div className="Playlist-track-container">
        {myPlaylist.map((item) => (
          <div className="card" key={item.id}>
            <div className="artist-album">
              <h3>{item.name}</h3>
              <p>
                {item.artist} | {item.album}
              </p>
            </div>
            <button
              className="add-button"
              onClick={(e) => handleRemoveTrack(e, item.id)}
            >
              -
            </button>
          </div>
        ))}
      </div>

      <div className="div-button">
        <button type="submit">Save to spotify</button>
      </div>
    </form>
  );
};

export default Playlist;
