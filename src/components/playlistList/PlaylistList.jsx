// import React from 'react'

import { useState, useEffect } from "react";
import Spotify from "../util/spotify";
import PlaylistListItem from "./PlaylistListItem";
import styles from "./PlaylistList.module.css";

const PlaylistList = () => {
  const [playlists, setPlaylists] = useState([]);

  const getUserPlaylists = async () => {
    try {
      const playlistsFromSpotify = await Spotify.getUserPlaylists();
      const playlistData = playlistsFromSpotify.map((playlist) => {
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
    <div id={styles["local-playlists-div"]}>
      <h2>My Local Playlists</h2>
      <div id="playlistList-container">
        {playlists.map((playlist) => (
          <PlaylistListItem
            id={playlist.playlistId}
            name={playlist.playlistName}
            key={playlist.playlistId}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;
