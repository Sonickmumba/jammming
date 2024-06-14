/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import styles from "./PlaylistList.module.css";

const PlaylistListItem = ({ id, name, selectPlaylist }) => {
  return (
    <div
      className={styles.card}
      id={styles.localPlaylistCard}
      key={id}
      onClick={() => selectPlaylist(id)}
    >
      <div className={styles.artistAlbum} id={styles.localPlaylistName}>
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
