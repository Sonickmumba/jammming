// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import TrackList from "./components/tracklist/TrackList";
import "./App.css";

const tracks = [
  {
    id: 1,
    name: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
  },
  {
    id: 2,
    name: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
  },
  {
    id: 3,
    name: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
  },
  {
    id: 4,
    name: "Hey Jude",
    artist: "The Beatles",
    album: "Single",
  },
  {
    id: 5,
    name: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
  },
  {
    id: 6,
    name: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
  },
];

function App() {
  return (
    <>
      <TrackList tracks={tracks} />
    </>
  );
}

export default App;
