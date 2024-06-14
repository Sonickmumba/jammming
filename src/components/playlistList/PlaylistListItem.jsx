/* eslint-disable react/prop-types */
// import React from 'react'
import PropTypes from "prop-types";
import styles from "./PlaylistList.module.css";

const PlaylistListItem = ({ id, name, selectPlaylist }) => {
  return (
    <div
      className={styles.card}
      id="local-playlist-card"
      key={id}
      onClick={() => selectPlaylist(id)}
    >
      <div className="artist-album" id="local-playlist-name">
        <p>{name}</p>
      </div>
    </div>
  );
};

PlaylistListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PlaylistListItem;
