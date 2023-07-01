import axios from "axios";
import GameNameAndIdS from "../assets/GameNameAndIdS.js";
import StorePricesInfo from "../Components/StorePricesInfo.jsx";
import StoreGameInfo from "../Components/StoreGameInfo.jsx";
import StoreComponent from "../Components/StoreComponent.jsx";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BASE_URL = "http://localhost:3333/";

export default async function CreateGame({ 
  TypedText, 
  ChangeGameInfo,
  UpdateStoreComponents
}) {

  var TempGame;
  var TempDeal;
  var GameExistsInDb = false;

  var Game = GameNameAndIdS.find(function (item) {
    return item.name.toLowerCase() === TypedText.toLowerCase();
  });

  if (Game === null) 
    return false;

  var GameId = {
    GameId: Game.appid.toString(),
  };

  await axios.get(`${BASE_URL}SteamGames/`).then((response) => {
    let gamesInDb = response;
    console.log(gamesInDb);
    if (gamesInDb.data != null) {
      for (let i = 0; i < gamesInDb.data.length; i++){
        if (Game.appid.toString() === gamesInDb.data[i].steam_appid)
          GameExistsInDb = true;
      }
    }
  });

  console.log(GameExistsInDb)
  
  await axios
    .post(`${BASE_URL}SteamGames/${GameExistsInDb === false ? "CreateGame/" : "UpdateGame/"}`, GameId)
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

  var gameDeals = [[], [], [[]]]
  
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
    return [parseInt(index.date)*1000, parseFloat(index.retailPrice)];
  })

  console.log(gameDeals[2])

  const options = {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: TempGame.name
    },
    xAxis:[{
      labels:{
         formatter:function(){
             return Highcharts.dateFormat('%Y/%M/%d',this.value);
         }
      }
    }],
    yAxis: {
      title: {
        text: 'Price'
      },
      labels: {
        formatter: function() {
          return this.value + ' €';
        }
      },
      plotLines: [{
        value: 0,
        width: 2,
        color: 'silver'
      }]
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}€)<br/>',
      valueDecimals: 2,
      split: true
    },
    series: {
      // general options for all series
      compare: 'value',
      showInNavigator: true,
    },
    series: [{
      name: "price",
      data: gameDeals[2]
    }]
  }

  let pass_chart = (
    <HighchartsReact
    highcharts={Highcharts}
    options={options} />
  );
  
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
    chart={pass_chart}
    />
  </>
  );

  ChangeGameInfo(() => {
    return Tmp;
  });

  UpdateStoreComponents(()=>{return Stores});

  return true;
}
