import "../CSS/SearchedGames.css";
import GetDbGames from '../Functions/MainWindowFunctions.jsx'

import { useEffect, useState } from "react";

export default function SearchedGames() {

  const [SteamSavedGames, addremoveGames] = useState([]);

  useEffect(() => {
    GetDbGames({addremoveGames})
  }, []);

  return (
    <div className="SearchedGames">
      <h2 className="search_Title">Games Searched:</h2>
      <div className="Searched_Games_Area">
      {SteamSavedGames}
      </div>
    </div>
  );
}
