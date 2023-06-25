import "../CSS/StoreGameInfo.css";
import Metacritic from "../assets/Metacritic.svg";

export default function StoreGameInfo(props) {
  return (
    <>
      <div className="StoreGameInfo">
        <div className="GameTitleArea">
          <h1 className="SteamGameTitle">{props.name}</h1>
          <h3 className="DeveloperPublisher">{props.developers}, {props.publishers}</h3>
        </div>
        <div className="GameImageArea">
          <img className="Header_img" alt="Header_img" src={props.header_image} />
          <img
            className="Metacritic_img"
            src={Metacritic}
            alt="Metacritic_img"
          />
          <div className="GenreScoreArea">
            <h4 className="Genre">{props.genres}</h4>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <h1 className="MetacriticScore">{props.metacritic}</h1>
          </div>
        </div>
      </div>
      <div className="GameImagesArea">
        <h1 className="ScreenshotTitle"> Screenshots: </h1>
        <div className="Sreenshots">
          {props.screenshots}
        </div>
      </div>
    </>
  );
}
