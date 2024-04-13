// import React from 'react'

import { useState, useEffect } from "react";
import Spotify from "../util/spotify";

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);

  const getUserPlaylists = async () => {
    try {
      const playlistsFromSpotify = await Spotify.getUserPlaylists();
      const playlistData = playlistsFromSpotify.items.map((playlist) => {
        return {
          playlistId: playlist.id,
          playlistName: playlist.name,
        };
      });
      setPlaylists(playlistData);
      console.log(playlistsFromSpotify.items);
    } catch (error) {
      console.log("Error fetching playlist:", error);
    }
  };

  console.log(playlists);

  useEffect(() => {
    getUserPlaylists();
  }, []);

  return <div>PlaylistList</div>;
};

export default PlaylistList;
