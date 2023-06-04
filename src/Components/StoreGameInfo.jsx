import "../CSS/StoreGameInfo.css";
import Metacritic from "../assets/Metacritic.svg";

export default function StoreGameInfo() {
  return (
    <>
      <div className="StoreGameInfo">
        <div className="GameTitleArea">
          <h1 className="SteamGameTitle">Game Title</h1>
          <h3 className="DeveloperPublisher">publisher, developer</h3>
        </div>
        <div className="GameImageArea">
          <img className="Header_img" alt="Header_img" />
          <img
            className="Metacritic_img"
            src={Metacritic}
            alt="Metacritic_img"
          />
          <div className="GenreScoreArea">
            <h4 className="Genre">Co-op | Shooter | Indie</h4>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <h1 className="MetacriticScore">63%</h1>
          </div>
        </div>
      </div>
      <div className="GameImagesArea">
        <h1 className="ScreenshotTitle"> Screenshots: </h1>
        <div className="Sreenshots">
          <img className="screenshot_imge" alt="screenshot" />
          <img className="screenshot_imge" alt="screenshot" />
          <img className="screenshot_imge" alt="screenshot" />
          <img className="screenshot_imge" alt="screenshot" />
          <img className="screenshot_imge" alt="screenshot" />
        </div>
      </div>
    </>
  );
}
