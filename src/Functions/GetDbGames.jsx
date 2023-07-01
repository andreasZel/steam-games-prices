import axios from "axios";
import SearchedGameTile from "../Components/SearchedGameTile.jsx";
import SteamLogo from "../assets/steamlogo.svg";

const BASE_URL = "http://localhost:3333/";

export default async function GetDbGames(props) {
  var TempGames;
  var suggestions;

  await axios.get(`${BASE_URL}SteamGames/`).then((response) => {
    TempGames = response;
  });

  let Tmp = TempGames.data.map((index) => {
    return (
      <SearchedGameTile
        key={index.id}
        id={index.id}
        steam_appid={index.steam_appid}
        Game_Title={index.name}
        Searched_Games_Img={index.capsule_image}
        Game_Price={index.price[0].priceOnDate}
        Store_Img={SteamLogo}
      />
    );
  });

  props.addremoveGames(() => {
    return Tmp;
  });
}
