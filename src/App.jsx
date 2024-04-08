import TrackList from "./components/tracklist/TrackList";
import SearchBar from "./components/searchBar/SearchBar";
import Playlist from "./components/playlist/Playlist";
import options from "./components/util/options";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);

  const handleClick = (e, id) => {
    e.preventDefault();
    const isTrackInPlaylist = playlist.some((track) => track.id === id);
    if (!isTrackInPlaylist) {
      setPlaylist((prev) => {
        const trackToAdd = tracks.find((track) => track.id === id);
        return [...prev, trackToAdd];
      });
    }
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

  const handleRemoveTrack = (e, id) => {
    e.preventDefault();
    setPlaylist((prev) => prev.filter((track) => track.id !== id));
  };

  const [myPlaylist, setMyPlaylist] = useState([]);
  const [savePlaylist, setSavePlaylist] = useState([]);
  const [myPlaylistName, setMyPlaylistName] = useState("");

  const handleSubmitPlaylist = (e) => {
    e.preventDefault();
    const newPlaylist = {
      id: new Date().toISOString(),
      name: myPlaylistName,
      playlist: playlist,
    };
    setSavePlaylist((prev) => [...prev, newPlaylist]);
    setPlaylist([]);
  };

  const handleChange = (e) => {
    setMyPlaylistName(e.target.value);
  };

  useEffect(() => {
    setMyPlaylist(playlist);
  }, [playlist]);

  console.log(savePlaylist);
  return (
    <div className="app-contrainer">
      <SearchBar handleSearch={handleSearch} />
      {/* <div> */}
      <div className="track-play-list-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>sonick</p>
        )}
        <TrackList tracks={tracks} handleClick={handleClick} />
        <Playlist
          playlist={playlist}
          handleRemoveTrack={handleRemoveTrack}
          myPlaylist={myPlaylist}
          handleSubmitPlaylist={handleSubmitPlaylist}
          handleChange={handleChange}
          myPlaylistName={myPlaylistName}
        />
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;
