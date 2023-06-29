import axios from "axios";
import GameNameAndIdS from "../assets/GameNameAndIdS.js";
import StorePricesInfo from "../Components/StorePricesInfo.jsx";
import StoreGameInfo from "../Components/StoreGameInfo.jsx";
import StoreComponent from "../Components/StoreComponent.jsx";

const BASE_URL = "http://localhost:3333/";

export default async function CreateGame({ 
  TypedText, 
  ChangeGameInfo,
  UpdateStoreComponents,
  chart,
  changeChart 
}) {

  var TempGame;
  var TempDeal;

  var Game = GameNameAndIdS.find(function (item) {
    return item.name.toLowerCase() === TypedText.toLowerCase();
  });

  if (Game === null) 
    return false;

  var GameId = {
    GameId: Game.appid.toString(),
  };

  await axios
    .post(`${BASE_URL}SteamGames/CreateGame/`, GameId)
    .then((response) => {
      TempGame = response.data;
    })
    .catch((error) => {
      if (error.response === 400) 
        return false;
    });

  var GameObjectId = {
    GameId: TempGame.id,
  };

  await axios
    .post(`${BASE_URL}SteamGames/GetGameDeals/`, GameObjectId)
    .then((response2) => {
      TempDeal = response2.data;
    })
    .catch((error) => {
      if (error.response === 400) 
        return false;
    });

  var Developers = TempGame.developers.join(", "); 
  var publishers = TempGame.publishers.join(", ");
  var genres = TempGame.genres.join(" | ");
  var metacritic = TempGame.metacritic == "false" ? "No Score" : TempGame.metacritic;

  var screenshots = TempGame.screenshots.map((index) => {
    return <img key={index} className="screenshot_imge" alt="screenshot" src={index}/>
  })

  var gameDeals = [[], [], []]
  
  console.log(TempDeal);

  if(TempDeal.deals === null)
    return false;

  gameDeals[0] = TempDeal.deals.map((index) => {
    return parseInt(index.storeId);
  })

  gameDeals[1] = TempDeal.deals.map((index) => {
    return parseFloat(index.retailPrice);
  })

  gameDeals[2] = TempDeal.deals.map((index) => {
    const dateObject = new Date(parseInt(index.date)*1000);
    const humanDateFormat = dateObject.toLocaleString("en-US")

    return humanDateFormat;
  })
  
  var StoreTitles = [
    "Steam", "GamersGate", "GreenManGaming", "Amazon", "GameStop", "Direct2Drive", "GOG",
    "Origin", "Get_Games", "Shiny_Loot", "Humble_Store", "Desura", "Uplay", "IndieGameStand",
    "Fanatical", "Gamesrocket", "Games_Republic", "SilaGames", "Playfield", "ImperialGames",
    "WinGameStore", "FunStockDigital", "GameBillet", "Voidu", "Epic_Games_Store", "Razer_Game_Store",  
    "Gamesplanet", "Gamesload", "TwoGame", "IndieGala", "Blizzard_Shop", "AllYouPlay", "DLGamer", "Noctre",
    "DreamGame", "Eneba", "kinguin", "allkeyshop"
  ]


  let Stores = [];

  for (let index = 0; index < gameDeals[0].length; index++){
    Stores.push(
      <StoreComponent
        key={gameDeals[0][index]}
        storeTitle={StoreTitles[gameDeals[0][index]]}
        price={gameDeals[1][index]}
        />
      );
  }

  console.log(Stores);

  
 

var Tmp = (
  <>
    <StoreGameInfo 
    name={TempGame.name}
    developers={Developers}
    publishers={publishers}
    header_image={TempGame.header_image}
    genres={genres}
    metacritic={metacritic}
    screenshots={screenshots}
    />
    <StorePricesInfo 
    StoreComponents={Stores}
    chart={chart}
    />
  </>
  );

  ChangeGameInfo(() => {
    return Tmp;
  });

  UpdateStoreComponents(()=>{return Stores});

  return true;
}
