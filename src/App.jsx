import TrackList from "./components/tracklist/TrackList";
import SearchBar from "./components/searchBar/SearchBar";
import Playlist from "./components/playlist/Playlist";
import "./App.css";
import { useState, useEffect } from "react";
import Spotify from "./components/util/spotify";
import Header from "./components/header/Header";

function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);

  const [myPlaylist, setMyPlaylist] = useState([]);
  const [savePlaylist, setSavePlaylist] = useState([]);
  const [myPlaylistName, setMyPlaylistName] = useState("");

  const [accessToken, setAccessToken] = useState(null);

  const handleAddTrackToPlaylist = (e, trackToAdd) => {
    e.preventDefault();

    const isTrackInPlaylist = playlist.some(
      (track) => track.id === trackToAdd.id
    );
    if (!isTrackInPlaylist) {
      setPlaylist((prev) => {
        const toAdd = tracks.find((track) => track.id === trackToAdd.id);
        return [...prev, toAdd];
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

  const handleRemoveTrack = (e, trackToRemove) => {
    e.preventDefault();
    setPlaylist((prev) =>
      prev.filter((track) => track.id !== trackToRemove.id)
    );
  };

  const handleSavePlaylist = (e) => {
    e.preventDefault();
    const urls = playlist.map((tr) => tr.uri);
    setSavePlaylist(urls);
    Spotify.savePlaylist(myPlaylistName, urls);
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
      <div className="app-container">
        <SearchBar handleSearch={handleSearch} />
        <div className="track-play-list-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <p>sonick</p>
          )}
          <TrackList
            tracks={tracks}
            handleAddTrackToPlaylist={handleAddTrackToPlaylist}
          />
          <Playlist
            playlist={playlist}
            handleRemoveTrack={handleRemoveTrack}
            myPlaylist={myPlaylist}
            handleSavePlaylist={handleSavePlaylist}
            handleChange={handleChange}
            myPlaylistName={myPlaylistName}
          />
        </div>
      </div>
    </>
  );
}

export default App;
