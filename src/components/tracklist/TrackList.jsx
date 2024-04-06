// import React from 'react'

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

export default TrackList;
