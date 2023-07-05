import axios from "axios";
import SearchedGameTile from "../Components/SearchedGameTile.jsx";
import SteamLogo from "../assets/steamlogo.svg";

const BASE_URL = "http://localhost:3333/";

export default async function GetDbGames({
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
}) {
  var TempGames;

  await axios.get(`${BASE_URL}SteamGames/`).then((response) => {
    TempGames = response;
  });

  let Tmp = TempGames.data.map((index) => {
    return (
      <SearchedGameTile
        key={index.id}
        Swapwindow={Swapwindow}
        onDisplay={onDisplay}
        changeDisplay={changeDisplay}
        ChangeGameInfo={ChangeGameInfo}
        StoreComponents={StoreComponents}
        UpdateStoreComponents={UpdateStoreComponents}
        id={index.id}
        steam_appid={index.steam_appid}
        Game_Title={index.name}
        Searched_Games_Img={index.capsule_image}
        Game_Price={index.price[0].priceOnDate}
        Store_Img={SteamLogo}
        setloading={setloading}
        loading={loading}
        setCapability={setCapability}
        Platforms={Platforms}
      />
    );
  });

  addremoveGames(() => {
    return Tmp;
  });
}
