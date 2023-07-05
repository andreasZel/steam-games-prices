import "../CSS/SearchedGameTile.css";

import CreateGame from "../Functions/CreateGame.jsx";

export default function SearchedGameTile({
Swapwindow,
onDisplay,
changeDisplay,
ChangeGameInfo,
StoreComponents,
UpdateStoreComponents,
id,
steam_appid,
Game_Title,
Searched_Games_Img,
Game_Price,
Store_Img,
setloading,
loading,
setCapability,
Platforms
}) {
  var TypedText = Game_Title;

  return (
    <div className="SearchedGameTile" id={id} onClick={() => {
      if (onDisplay === false) {
      
        setloading(true);
        console.log(loading);

        let temp = CreateGame({ 
          TypedText, 
          ChangeGameInfo, 
          UpdateStoreComponents,
          setCapability,
          Platforms
        }).then(() => {
          
          setloading(false);
          console.log(loading);
          console.log(temp);
          
          changeDisplay(() => {return temp})
          Swapwindow(() => {return true});
          console.log(StoreComponents);
        }).catch((error)=>{console.log(error)});
      }
      }}>
      <h3 className="Game_Title">{Game_Title}</h3>
      <img
        className="Searched_Games_Img"
        alt="CAPSULE IMG"
        src={Searched_Games_Img}
      />
      <h2 className="Game_Price">{Game_Price}</h2>
      <img className="Store_Img" alt="Store img" src={Store_Img} />
    </div>
  );
}
