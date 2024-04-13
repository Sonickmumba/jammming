// import React from 'react'

import { useState, useEffect } from "react";
import Spotify from "../util/spotify";
import PlaylistListItem from "./PlaylistListItem";

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

  return (
    <>
      {playlists.map((playlist) => (
        <PlaylistListItem
          id={playlist.playlistId}
          name={playlist.playlistName}
          key={playlist.playlistId}
        />
      ))}
    </>
  );
};

export default PlaylistList;
