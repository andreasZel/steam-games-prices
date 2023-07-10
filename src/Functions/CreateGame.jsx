import axios from "axios";
import GameNameAndIdS from "../assets/GameNameAndIdS.js";
import StorePricesInfo from "../Components/StorePricesInfo.jsx";
import StoreGameInfo from "../Components/StoreGameInfo.jsx";
import StoreComponent from "../Components/StoreComponent.jsx";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment/moment.js';

const BASE_URL = "http://localhost:3333/";

export default async function CreateGame({ 
  TypedText, 
  ChangeGameInfo,
  UpdateStoreComponents,
  setCapability,
  Platforms,
  Swapwindow,
  changeDisplay,
  onDisplay
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

    var Developers = "";
    var publishers = "";
    var genres = "";
    var metacritic = "";

    if (TempGame.developers != null)
      Developers = TempGame.developers.join(", "); 

    if (TempGame.publishers != null)
      publishers = TempGame.publishers.join(", ");

    if (TempGame.genres != null)  
      genres = TempGame.genres.join(" | ");

    metacritic = TempGame.metacritic == "false" ? "No" : TempGame.metacritic[0];

  var screenshots = TempGame.screenshots.map((index) => {
    return <img key={index} className="screenshot_imge" alt="screenshot" src={index}/>
  })

  var gameDeals = [[], []]
  var seriesForChart = [];
  var series_options = [];

  var StoreTitles = [
    "Steam", "GamersGate", "GreenManGaming", "Amazon", "GameStop", "Direct2Drive", "GOG",
    "Origin", "Get_Games", "Shiny_Loot", "Humble_Store", "Desura", "Uplay", "IndieGameStand",
    "Fanatical", "Gamesrocket", "Games_Republic", "SilaGames", "Playfield", "ImperialGames",
    "WinGameStore", "FunStockDigital", "GameBillet", "Voidu", "Epic_Games_Store", "Razer_Game_Store",  
    "Gamesplanet", "Gamesload", "TwoGame", "IndieGala", "Blizzard_Shop", "AllYouPlay", "DLGamer", "Noctre",
    "DreamGame", "Eneba", "kinguin", "allkeyshop"
  ]

  var StoreLinks = [
    "https://store.steampowered.com/", "https://www.gamersgate.com/offers/","https://www.greenmangaming.com/", 
    "https://www.amazon.com/pc-games/", "https://www.gamestop.com/video-games/pc-games", "https://www.direct2drive.com/",
    "https://www.gog.com/", "https://www.ea.com/games/library/pc-download", "https://getgames.bumpa.shop/", 
    "https://shinyloot.com/", "https://www.humblebundle.com/store", "https://www.desura.com/", "https://ubisoftconnect.com/",
    "http://indiegamestand.com/", "https://www.fanatical.com/", "https://gamesrocket.com/eu/", "https://gamesrepublic.com/",
    "https://store.silagames.com/", "https://www.facebook.com/playfieldgame/", "https://imperial.games/",
    "https://www.wingamestore.com/", "https://funstock.co.uk/", "https://www.gamebillet.com/", "https://www.voidu.com/en/",
    "https://store.epicgames.com/en-US/", "https://www.razer.com/gamestore/", "https://us.gamesplanet.com/", "https://www.gamesload.eu/home.html",
    "https://2game.com/gr/", "https://www.indiegala.com/", "https://eu.shop.battle.net/en-gb", "https://www.allyouplay.com/", 
    "https://www.dlgamer.com/us/", "https://www.noctre.com/", "https://www.dreamgame.com/en/", "https://www.eneba.com/el/", 
    "https://www.kinguin.net/", "https://www.allkeyshop.com/"
  ]

  let Stores = [];
  const timestampMillis = Date.now();

  console.log(TempDeal);
  console.log(TempGame);

  if(TempDeal.deals != null) {

    var uniqueStores = [TempDeal.deals[0].storeId];

    gameDeals[0] = TempDeal.deals.map((index) => {
      
      if (!uniqueStores.includes(index.storeId))
        uniqueStores.push(index.storeId);

      return parseInt(index.storeId);
    })

    var timestamps = [];
    gameDeals[1] = TempDeal.deals.map((index) => {
      timestamps.push(moment.unix(parseInt(index.date))._i)
      return parseFloat(index.retailPrice);
    })

    for (let z = 0; z < uniqueStores.length; z++){
      seriesForChart[parseInt(uniqueStores[z])] = [];
    }

    TempDeal.deals.map((index) => {
      seriesForChart[parseInt(index.storeId)].push([moment.unix(parseInt(index.date))._i, parseFloat(index.retailPrice)]);
    })

    for (let z = 0; z < uniqueStores.length; z++){
      series_options[z] = {
        name: StoreTitles[uniqueStores[z]],
        data: seriesForChart[parseInt(uniqueStores[z])],
      };
    }
  }else {
    series_options[0] = {
      name: "Steam",
      data: [[timestampMillis, 0]],
    };

    Stores.push(
      <StoreComponent
        key={0}
        storeTitle={"Steam"}
        price={"free"}
        StoreLinks={StoreLinks[0]}
        />
      );
  }

  console.log(seriesForChart)

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
             return Highcharts.dateFormat('%d/%m/%Y',this.value);
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
    series: series_options
  }

  let pass_chart = (
    <HighchartsReact
    highcharts={Highcharts}
    options={options} />
  );

  for (let index = 0; index < gameDeals[0].length; index++){
    
    if ((String((timestampMillis))).slice(0, 6) === (String(timestamps[index])).slice(0, 6)) {
      Stores.push(
        <StoreComponent
          key={index}
          storeTitle={StoreTitles[gameDeals[0][index]]}
          price={gameDeals[1][index]}
          StoreLinks={StoreLinks[gameDeals[0][index]]}
          />
        );
    }
    
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
    Platforms={Platforms}
    Swapwindow={Swapwindow}
    changeDisplay={changeDisplay}
    onDisplay={onDisplay}
    />
  </>
  );

  ChangeGameInfo(() => {
    return Tmp;
  });

  setCapability(TempGame.platforms)
  UpdateStoreComponents(()=>{return Stores});

  return true;
}
