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

  // const handleSearch = async (query) => {
  //   if (query === "") return;
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const resp = await fetch(
  //       `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=2`,
  //       options
  //     );

  //     if (!resp.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await resp.json();
  //     const newTracks = data.tracks.items.map((item) => ({
  //       id: item.data.id,
  //       name: item.data.name,
  //       artist: item.data.artists.items[0].profile.name,
  //       album: item.data.albumOfTrack.name,
  //     }));
  //     setTracks(newTracks);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleSearch = async (query) => {
  //   try {
  //     setLoading(true);
  //     const data = await Spotify.search(query);
  //     setTracks(data);
  //   } catch (error) {
  //     setError(error.message);
  //     setLoading(false);
  //   }
  // };

  // Added
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await Spotify.getAccessToken();
        setAccessToken(token);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching access token
      }
    };
    fetchAccessToken();
  }, []);
  // end
  console.log(accessToken);

  const handleSearch = (query) => {
    if (query !== "") {
      setLoading(true);
      setError(null);

      // Use access token from state in the search method
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

  console.log(tracks);
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
          />
        </div>
      </div>
    </>
  );
}

export default App;
