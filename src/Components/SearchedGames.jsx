import "../CSS/SearchedGames.css";

export default function SearchedGames(props) {

  return (
    <div className="SearchedGames">
      <h2 className="search_Title">Games Searched:</h2>
      <div className="Searched_Games_Area">
      {props.SteamSavedGames.length > 0 ? props.SteamSavedGames : "No Games Searched"}
      </div>
    </div>
  );
}
