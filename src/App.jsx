import TrackList from "./components/tracklist/TrackList";
import SearchBar from "./components/searchBar/SearchBar";
import Playlist from "./components/playlist/Playlist";
import options from "./components/util/options";
import "./App.css";
import { useState } from "react";

function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = (e, id) => {
    e.preventDefault();
    setPlaylist((prev) => {
      const trackToAdd = tracks.find((track) => track.id === id);
      return [...prev, trackToAdd];
    });
  };

  const handleSearch = async (query) => {
    if (query === "") return;
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch(
        `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=2`,
        options
      );

      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await resp.json();
      const newTracks = data.tracks.items.map((item) => ({
        id: item.data.id,
        name: item.data.name,
        artist: item.data.artists.items[0].profile.name,
        album: item.data.albumOfTrack.name,
      }));
      setTracks(newTracks);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <div>
        <div className="container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <TrackList tracks={tracks} handleClick={handleClick} />
          )}
          <Playlist playlist={playlist} />
        </div>
      </div>
    </div>
  );
}

export default App;
