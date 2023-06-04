import "../CSS/SearchedGames.css";
import SearchedGameTile from "./SearchedGameTile.jsx";

export default function SearchedGames() {
  return (
    <div className="SearchedGames">
      <h2 className="search_Title">Games Searched:</h2>
      <div className="Searched_Games_Area">
        <SearchedGameTile />
        <SearchedGameTile />
        <SearchedGameTile />
        <SearchedGameTile />
        <SearchedGameTile />
        <SearchedGameTile />
        <SearchedGameTile />
        <SearchedGameTile />
        <SearchedGameTile />
        <SearchedGameTile />
      </div>
    </div>
  );
}
