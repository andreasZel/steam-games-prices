import "../CSS/SearchedGameTile.css";

export default function SearchedGameTile() {
  return (
    <div className="SearchedGameTile">
      <h3 className="Game_Title">Game Title:</h3>
      <img className="Searched_Games_Img" alt="CAPSULE IMG" />
      <h2 className="Game_Price">39.99 $</h2>
      <img className="Store_Img" alt="Store img"></img>
    </div>
  );
}
