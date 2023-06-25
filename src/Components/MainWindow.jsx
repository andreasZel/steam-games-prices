import "../CSS/MainWindow.css";
import SearchBar from "./SearchBar.jsx";
import GameInfoArea from "./GameInfoArea";
import SearchedGames from "./SearchedGames.jsx";
import StoreComponent from "./StoreComponent.jsx";

import GetDbGames from '../Functions/GetDbGames.jsx'
import { useEffect, useState } from "react";

export default function MainWindow() {
  
  const [SteamSavedGames, addremoveGames] = useState([]);
  const [DidSearch, Swapwindow] = useState(false);
  const [GameInfo, ChangeGameInfo] = useState(null);
  const [StoreComponents, UpdateStoreComponents] = useState(<StoreComponent />);

  useEffect(() => {
    GetDbGames({addremoveGames})
  }, []);
  if(DidSearch === false){
    return (
      <div className="MainWindow">
        <SearchBar 
        Swapwindow={Swapwindow} 
        ChangeGameInfo={ChangeGameInfo}
        UpdateStoreComponents={UpdateStoreComponents}
        />
        <SearchedGames SteamSavedGames={SteamSavedGames}/> 
      </div>
    );
  } else {
    return (
      <div className="MainWindow">
        <SearchBar 
        Swapwindow={Swapwindow}
        ChangeGameInfo={ChangeGameInfo}
        UpdateStoreComponents={UpdateStoreComponents}
        />
        <GameInfoArea 
        GameInfo={GameInfo} 
        />
      </div>
    );
  }
}
