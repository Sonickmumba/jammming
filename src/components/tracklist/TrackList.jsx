// import React from 'react'
import PropTypes from "prop-types";

const TrackList = (props) => {
  return (
    <div>
      {props.tracks.map((track) => (
        <div className="card" key={track.id}>
          <h3>{track.name}</h3>
          <div className="artist-album">
            <span>{track.artist}</span>
            <span>{track.album}</span>
          </div>
          <button className="add-button">+</button>
        </div>
      ))}
    </div>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TrackList;
