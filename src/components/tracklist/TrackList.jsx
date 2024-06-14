import PropTypes from "prop-types";
import PlaylistList from "../playlistList/PlaylistList";
import styles from './TrackList.module.css';

const TrackList = ({ tracks, handleAddTrackToPlaylist, selectPlaylist }) => {
  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.results}>Results</h2>
      <div className={styles.TrackListCo}>
        {tracks.map((track) => (
          <div className={styles.card} key={track.id}>
            <div className={styles.artistAlbum}>
              <h3>{track.name}</h3>
              <p>
                {track.artist} | {track.album}
              </p>
            </div>
            <a
              className={styles.addButton}
              id={track.id}
              onClick={(e) => handleAddTrackToPlaylist(e, track)}
            >
              +
            </a>
          </div>
        ))}
      </div>
      <PlaylistList selectPlaylist={selectPlaylist} />
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
  selectPlaylist: PropTypes.func.isRequired,
};

export default TrackList;
