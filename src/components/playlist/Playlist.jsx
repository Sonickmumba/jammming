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
