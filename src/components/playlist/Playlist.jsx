/* eslint-disable react/prop-types */

import { useState } from "react";

// import { useState, useEffect } from "react";

const Playlist = ({
  // playlist,
  handleRemoveTrack,
  handleSubmitPlaylist,
  // handleChange,
  myPlaylist,
  myPlaylistName,
  handleUpdatePlaylistName,
}) => {
  const [isEditing, setIsEditing] = useState(true);
  // const [myPlaylist, setMyPlaylist] = useState([]);
  // const [myPlaylistName, setMyPlaylistName] = useState("");
  // const [savePlaylist, setSavePlaylist] = useState([]);

  // useEffect(() => {
  //   setMyPlaylist(playlist);
  // }, [playlist]);

  // const handleSubmitPlaylist = (e) => {
  //   e.preventDefault();
  //   const newPlaylist = {
  //     id: new Date().toISOString(),
  //     name: myPlaylistName,
  //     playlist: myPlaylist,
  //   };
  //   setSavePlaylist((prev) => [...prev, newPlaylist]);
  //   setMyPlaylist([]);
  // };

  // const handleChange = (e) => {
  //   setMyPlaylistName(e.target.value);
  // };
  // console.log(savePlaylist);

  const handleChange = (e) => {
    handleUpdatePlaylistName(e.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

  return (
    <form className="list-container" onSubmit={handleSubmitPlaylist}>
      {isEditing ? (
        <input
        name="playlistName"
        type="text"
        placeholder=""
        id="playlist-name"
        value={myPlaylistName}
        onChange={handleChange}
        autoFocus
        onBlur={toggleEditing}
      />
      ) : (
        <h2 id="playlist-name" onClick={toggleEditing}>{myPlaylistName}</h2>
      )}
      {/* // <input
      //   name="playlistName"
      //   type="text"
      //   placeholder=""
      //   id="playlist-name"
      //   value={myPlaylistName}
      //   onChange={handleChange}
      // /> */}
      <div className="Playlist-track-container">
        {myPlaylist.map((item) => (
          <div className="card" key={item.id}>
            <div className="artist-album">
              <h3>{item.name}</h3>
              <p>{item.artist} | {item.album}</p>
              
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
