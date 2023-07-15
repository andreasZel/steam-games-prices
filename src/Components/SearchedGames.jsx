import "../CSS/SearchedGames.css";

export default function SearchedGames(props) {
  
  let NoGamesInDb = (
    <div className="NoGamesInDb">
      No Games Searched
    </div>
  )
  
  return (
    <div className="SearchedGames">
      <h2 className="search_Title">Games Searched:</h2>
      <div className="Searched_Games_Area">
      {props.SteamSavedGames.length > 0 ? props.SteamSavedGames : NoGamesInDb}
      </div>
    </div>
  );
}
