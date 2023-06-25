import axios from "axios";
import GameNameAndIdS from "../assets/GameNameAndIdS.js";
import StorePricesInfo from "../Components/StorePricesInfo.jsx";
import StoreGameInfo from "../Components/StoreGameInfo";

const BASE_URL = "http://localhost:3333/";

export default async function CreateGame({ TypedText, ChangeGameInfo }) {
  var TempGame;
  var TempDeal;

  var Game = GameNameAndIdS.find(function (item) {
    return item.name.toLowerCase() === TypedText.toLowerCase();
  });

  if (Game === null) return;

  var GameId = {
    GameId: Game.appid.toString(),
  };

  await axios
    .post(`${BASE_URL}SteamGames/CreateGame/`, GameId)
    .then((response) => {
      TempGame = response.data;
    })
    .catch((error) => {
      if (error.response === 400) return;
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
      if (error.response === 400) return;
    });

  var Developers = TempGame.developers.join(", "); 
  var publishers = TempGame.publishers.join(", ");
  var genres = TempGame.genres.join(" | ");
  var metacritic = TempGame.metacritic == "false" ? "No Score" : TempGame.metacritic;

  var screenshots = TempGame.screenshots.map((index) => {
    return <img className="screenshot_imge" alt="screenshot" src={index}/>
  })

  console.log(TempDeal);

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
      <StorePricesInfo />
    </>
  );

  ChangeGameInfo(() => {
    return Tmp;
  });
}
