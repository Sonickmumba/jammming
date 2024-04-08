/* eslint-disable react/prop-types */

const Playlist = ({ playlist }) => {
  return (
    <div className="list-container">
      {playlist.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.name}</h3>
          <div className="artist-album">
            <span>sonick</span>
            <span>Mumba</span>
          </div>
          <button className="add-button">-</button>
        </div>
      ))}

      <div className="div-button">
        <button>Save to spotify</button>
      </div>
    </div>
  );
};

export default Playlist;
