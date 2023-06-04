import "../CSS/GameInfoArea.css";
import StorePricesInfo from "./StorePricesInfo.jsx";
import StoreGameInfo from "./StoreGameInfo";

export default function GameInfoArea() {
  return (
    <div className="GameInfoArea">
      <StoreGameInfo />
      <StorePricesInfo />
    </div>
  );
}
