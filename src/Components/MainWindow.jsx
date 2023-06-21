import "../CSS/MainWindow.css";
import SearchBar from "./SearchBar.jsx";
import GameInfoArea from "./GameInfoArea";
import SearchedGames from "./SearchedGames.jsx";

export default function MainWindow() {
  
  return (
    <div className="MainWindow">
      <SearchBar />
      <SearchedGames /> 
      {/*<GameInfoArea />*/}
    </div>
  );
}
