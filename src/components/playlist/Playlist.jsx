/* eslint-disable react/prop-types */

const Playlist = ({ playlist }) => {
  return (
    <form className="list-container">
      <input type="text" placeholder="" id="playlist-name" />
      {playlist.map((item) => (
        <div className="card" key={item.id}>
          <input value={item.name} className="track-name" />
          <div className="artist-album">
            {/* <span>{item.artist}</span> */}
            <input type="text" value={item.artist} className="track-art-alb" />
            <input type="text" value={item.album} className="track-art-alb" />
          </div>
          <button className="add-button">-</button>
        </div>
      ))}

      <div className="div-button">
        <button type="submit">Save to spotify</button>
      </div>
    </form>
  );
};

export default Playlist;
