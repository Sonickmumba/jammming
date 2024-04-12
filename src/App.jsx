import TrackList from "./components/tracklist/TrackList";
import SearchBar from "./components/searchBar/SearchBar";
import Playlist from "./components/playlist/Playlist";
// import options from "./components/util/options";
import "./App.css";
import { useState, useEffect } from "react";
import Spotify from "./components/util/spotify";
import Header from "./components/header/Header";

function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);

  const [accessToken, setAccessToken] = useState(null);

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

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await Spotify.getAccessToken();
        setAccessToken(token);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAccessToken();
  }, []);

  const handleSearch = (query) => {
    if (query !== "") {
      setLoading(true);
      setError(null);

      Spotify.search(query, accessToken)
        .then((data) => {
          setTracks(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
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
    <>
      <Header />
      <div className="app-contrainer">
        <SearchBar handleSearch={handleSearch} />
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
            // handleUpdatePlaylistName={handleUpdatePlaylistName}
          />
        </div>
      </div>
    </>
  );
}

export default App;
