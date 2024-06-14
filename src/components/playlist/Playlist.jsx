/* eslint-disable react/prop-types */
// import { useState } from "react";
import styles from './Playlist.module.css';


const Playlist = ({
  handleRemoveTrack,
  handleSavePlaylist,
  handleChange,
  myPlaylist,
  myPlaylistName,
}) => {
  return (
    <form className={styles.listContainer} onSubmit={handleSavePlaylist}>
      <input
        name="playlistName"
        type="text"
        placeholder=""
        id={styles.playlistName}
        value={myPlaylistName}
        onChange={handleChange}
      />
      <div className={styles.PlaylistTrackContainer}>
        {myPlaylist.map((item) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.artistAlbum}>
              <h3>{item.name}</h3>
              <p>
                {item.artist} | {item.album}
              </p>
            </div>
            <a
              className={styles.addButton}
              onClick={(e) => handleRemoveTrack(e, item)}
            >
              -
            </a>
          </div>
        ))}
      </div>

      <div className={styles.divButton}>
        <button type="submit">Save to spotify</button>
      </div>
    </form>
  );
};

export default Playlist;
