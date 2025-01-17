/* eslint-disable react/prop-types */
// import React from 'react'

import { useState, useEffect } from "react";
import Spotify from "../util/spotify";
import PlaylistListItem from "./PlaylistListItem";
import styles from "./PlaylistList.module.css";

const PlaylistList = ({ selectPlaylist }) => {
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
    } catch (error) {
      console.log("Error fetching playlist:", error);
    }
  };

  useEffect(() => {
    getUserPlaylists();
  }, []); 

  return (
    <div id={styles.localPlaylistsDiv}>
      <h2>My Local Playlists</h2>
      <div id={styles.playlistListContainer}>
        {playlists.map((playlist) => (
          <PlaylistListItem
            id={playlist.playlistId}
            name={playlist.playlistName}
            key={playlist.playlistId}
            selectPlaylist={selectPlaylist}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;
