import "../CSS/SearchedGameTile.css";

export default function SearchedGameTile(props) {
  return (
    <div className="SearchedGameTile" id={props.id}>
      <h3 className="Game_Title">{props.Game_Title}</h3>
      <img className="Searched_Games_Img" alt="CAPSULE IMG" src={props.Searched_Games_Img}/>
      <h2 className="Game_Price">{props.Game_Price}</h2>
      <img className="Store_Img" alt="Store img" src={props.Store_Img}/>
    </div>
  );
}
