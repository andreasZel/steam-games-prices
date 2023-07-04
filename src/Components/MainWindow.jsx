import "../CSS/MainWindow.css";
import SearchBar from "./SearchBar.jsx";
import GameInfoArea from "./GameInfoArea";
import SearchedGames from "./SearchedGames.jsx";
import StoreComponent from "./StoreComponent.jsx";
import Loading from "./Loading";

import CreateGame from "../Functions/CreateGame.jsx";
import GetDbGames from '../Functions/GetDbGames.jsx'
import { useEffect, useState } from "react";

export default function MainWindow() {
  
  const [SteamSavedGames, addremoveGames] = useState([]);
  const [DidSearch, Swapwindow] = useState(false);
  const [GameInfo, ChangeGameInfo] = useState(null);
  const [StoreComponents, UpdateStoreComponents] = useState(<StoreComponent />);
  const [onDisplay, changeDisplay] = useState(false);
  const [loading, changeloadingState] = useState(false);

  function setloading(state){
    changeloadingState(() => {
      return state;
    });
  }

  useEffect(() => {
    GetDbGames({
      addremoveGames,
      Swapwindow,
      onDisplay,
      changeDisplay,
      ChangeGameInfo,
      StoreComponents,
      UpdateStoreComponents,
      setloading,
      loading
    })
  }, []);

  if (loading === true){
    return (
      <div className="MainWindow">
        <SearchBar 
        Swapwindow={Swapwindow} 
        ChangeGameInfo={ChangeGameInfo}
        StoreComponents={StoreComponents}
        UpdateStoreComponents={UpdateStoreComponents}
        onDisplay={onDisplay}
        changeDisplay={() => {changeDisplay}}
        setloading={() => {setloading}}
        loading={loading}
        />
        <Loading />
      </div>
    );
  } else if(DidSearch === false){
    return (
      <div className="MainWindow">
        <SearchBar 
        Swapwindow={Swapwindow} 
        ChangeGameInfo={ChangeGameInfo}
        StoreComponents={StoreComponents}
        UpdateStoreComponents={UpdateStoreComponents}
        onDisplay={onDisplay}
        changeDisplay={() => {changeDisplay}}
        setloading={() => {setloading}}
        loading={loading}
        />
        <SearchedGames 
        SteamSavedGames={SteamSavedGames}
        setloading={() => {setloading}}
        loading={loading}
        /> 
      </div>
    );
  } else if(DidSearch === true){
    return (
      <div className="MainWindow">
        <SearchBar 
        Swapwindow={Swapwindow}
        ChangeGameInfo={ChangeGameInfo}
        StoreComponents={StoreComponents}
        UpdateStoreComponents={UpdateStoreComponents}
        onDisplay={onDisplay}
        changeDisplay={() => {changeDisplay}}
        setloading={() => {setloading}}
        loading={loading}
        />
        <GameInfoArea 
        GameInfo={GameInfo} 
        StoreComponents={StoreComponents}
        />
      </div>
    );
  }
}
