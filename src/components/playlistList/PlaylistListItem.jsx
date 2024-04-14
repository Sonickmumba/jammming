// import React from 'react'
import PropTypes from "prop-types";

const PlaylistListItem = ({ id, name }) => {
  return (
    <div className="card" id="local-playlist-card" key={id}>
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
