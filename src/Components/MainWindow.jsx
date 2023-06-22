import "../CSS/MainWindow.css";
import SearchBar from "./SearchBar.jsx";
import GameInfoArea from "./GameInfoArea";
import SearchedGames from "./SearchedGames.jsx";

import GetDbGames from '../Functions/GetDbGames.jsx'
import { useEffect, useState } from "react";

export default function MainWindow() {
  
  const [SteamSavedGames, addremoveGames] = useState([]);

  useEffect(() => {
    GetDbGames({addremoveGames})
  }, []);

  return (
    <div className="MainWindow">
      <SearchBar />
      <SearchedGames SteamSavedGames={SteamSavedGames}/> 
      {/*<GameInfoArea />*/}
    </div>
  );
}
