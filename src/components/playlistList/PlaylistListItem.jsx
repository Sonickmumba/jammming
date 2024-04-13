// import React from 'react'
import PropTypes from "prop-types";

const PlaylistListItem = ({ id, name }) => {
  return (
    <div className="card" key={id}>
      <div className="artist-album">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

PlaylistListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PlaylistListItem;
