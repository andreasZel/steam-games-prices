import "../CSS/MainWindow.css";
import SearchBar from "./SearchBar.jsx";
import GameInfoArea from "./GameInfoArea";
import SearchedGames from "./SearchedGames.jsx";
import StoreComponent from "./StoreComponent.jsx";
import Loading from "./Loading";
import mac_supported from "../assets/mac_supported.svg";
import mac_not_supported from "../assets/mac_not_supported.svg";
import windows_supported from "../assets/windows_supported.svg";
import windows_not_supported from "../assets/windows_not_supported.svg"


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
  const [Platforms, platformsCapability] = useState([mac_supported, windows_supported]);

  function setCapability(capability) {
    platformsCapability(() => {
      return([
        capability[0] == true ? mac_supported : mac_not_supported,
        capability[1] == true ? windows_supported : windows_not_supported
      ]);
    });
  }

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
      loading,
      setCapability,
      Platforms
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
        setCapability={setCapability}
        Platforms={Platforms}
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
        setCapability={setCapability}
        Platforms={Platforms}
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
        setCapability={setCapability}
        Platforms={Platforms}
        />
        <GameInfoArea 
        GameInfo={GameInfo} 
        StoreComponents={StoreComponents}
        />
      </div>
    );
  }
}
