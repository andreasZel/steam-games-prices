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
Platforms,
platformsCapability
}) {
  var TypedText = steam_appid;

  return (
    <div className="SearchedGameTile" id={steam_appid} onClick={() => {
      
        setloading(true);
        console.log(loading);
        var clicked = true;

        let temp = CreateGame({ 
          clicked,
          TypedText, 
          ChangeGameInfo, 
          StoreComponents,
          UpdateStoreComponents,
          setCapability,
          Platforms,
          platformsCapability,
          Swapwindow,
          changeDisplay,
          onDisplay
        }).then((result) => {
          
          setloading(false);
          console.log(loading);
          console.log(temp);
          
          if (result != false) {
            changeDisplay(() => {return temp});
            Swapwindow(() => {return true});
          } else {
            updateText(() => {return "Invalid game Title";});
            Swapwindow(() => {return false});
          }

          console.log(StoreComponents);
        }).catch((error)=>{console.log(error)});
      }
      
    }>
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
