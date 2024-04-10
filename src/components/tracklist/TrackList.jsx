import PropTypes from "prop-types";

const TrackList = ({ tracks, handleClick }) => {
  return (
    <div className="results-container">
      <h2 className="results">Results</h2>
      <div className="Tracklist-co">
        {tracks.map((track) => (
          <div className="card" key={track.id}>
            <h3>{track.name}</h3>
            <div className="artist-album">
              <span>{track.artist}</span>
              <span>{track.album}</span>
            </div>
            <button
              className="add-button"
              id={track.id}
              onClick={(e) => handleClick(e, track.id)}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default TrackList;
