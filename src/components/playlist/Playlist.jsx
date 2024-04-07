/* eslint-disable react/prop-types */
const Playlist = ({ playlist }) => {
  return (
    <div className="list-container">
      {/* <div className="results">Results</div> */}
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

      <button>Save to spotify</button>
    </div>
  );
};

export default Playlist;
