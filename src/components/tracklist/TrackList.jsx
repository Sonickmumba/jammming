import PropTypes from "prop-types";
import PlaylistList from "../playlistList/PlaylistList";

const TrackList = ({ tracks, handleAddTrackToPlaylist }) => {
  return (
    <div className="results-container">
      <h2 className="results">Results</h2>
      <div className="TrackList-co">
        {tracks.map((track) => (
          <div className="card" key={track.id}>
            <div className="artist-album">
              <h3>{track.name}</h3>
              <p>
                {track.artist} | {track.album}
              </p>
            </div>
            <a
              className="add-button"
              id={track.id}
              onClick={(e) => handleAddTrackToPlaylist(e, track)}
            >
              +
            </a>
          </div>
        ))}
      </div>
      <PlaylistList />
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
  handleAddTrackToPlaylist: PropTypes.func.isRequired,
};

export default TrackList;
