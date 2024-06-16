import TrackList from "./components/trackList/TrackList";
import SearchBar from "./components/searchBar/SearchBar";
import Playlist from "./components/playlist/Playlist";
import "./App.css";
import { useState, useEffect } from "react";
import Spotify from "./components/util/spotify";
import Header from "./components/header/Header";

function App() {
  // console.log(process.env)
  const [tracks, setTracks] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);

  const [myPlaylist, setMyPlaylist] = useState([]);
  const [myPlaylistName, setMyPlaylistName] = useState("");

  const [accessToken, setAccessToken] = useState(null);

  const [playlistId, setPlaylistId] = useState(null);

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

  const handleSearch = (query) => {
    if (query !== "") {
      Spotify.search(query, accessToken)
        .then((data) => {
          setTracks(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  const handleRemoveTrack = (e, trackToRemove) => {
    e.preventDefault();
    setPlaylist((prev) =>
      prev.filter((track) => track.id !== trackToRemove.id)
    );
  };

  const handleSavePlaylist = async (e) => {
    e.preventDefault();
    const urls = playlist.map((tr) => tr.uri);
    await Spotify.savePlaylist(myPlaylistName, urls, playlistId);
    setPlaylist([]);
  };

  const handleChange = (e) => {
    setMyPlaylistName(e.target.value);
  };

  // for selecting playlist
  const selectPlaylist = async (id) => {
    console.log(id);
    try {
      const playlistData = await Spotify.getPlaylist(id);
      setMyPlaylistName(playlistData.name);
      const playlistData2 = playlistData.tracks.items.map((playTrack) => {
        return {
          id: playTrack.track.id,
          name: playTrack.track.name,
          artist: playTrack.track.artists[0]?.name || "Unknown Artist",
          album: playTrack.track.album.name,
        };
      });
      setPlaylist(playlistData2);
      setPlaylistId(id);
    } catch (error) {
      console.log("Error failed to load playlist tracks:", error);
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await Spotify.getAccessToken();
        setAccessToken(token);
      } catch (error) {
        setError(error.message);
      }
      // finally {
      //   setLoading(false);
      // }
    };
    fetchAccessToken();
  }, []);

  useEffect(() => {
    setMyPlaylist(playlist);
  }, [playlist]);

  console.log(error);

  return (
    <>
      <Header />
      <div className="app-container">
        <SearchBar handleSearch={handleSearch} />
        <div className="track-play-list-container">
          <TrackList
            tracks={tracks}
            handleAddTrackToPlaylist={handleAddTrackToPlaylist}
            selectPlaylist={selectPlaylist}
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
