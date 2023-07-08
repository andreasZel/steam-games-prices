import "../CSS/StoreComponent.css";
import Steam from "../assets/steamlogo.svg";     
import Origin from "../assets/Origin.svg";        
import Fanatical from "../assets/Fanatical.svg";   
import WinGameStore from "../assets/WinGameStore.svg"; 
import Gamesplanet from "../assets/Gamesplanet.svg";  
import DreamGame from "../assets/DreamGame.svg";     
import GamersGate from "../assets/GamersGate.svg";       
import Get_Games from "../assets/Get_Games.svg";       
import Gamesrocket from "../assets/Gamesrocket.svg";     
import FunStockDigital from "../assets/FunStockDigital.svg";   
import Gamesload from "../assets/Gamesload.svg";        
import Eneba from "../assets/Eneba.svg";            
import GreenManGaming from "../assets/GreenManGaming.svg"; 
import Shiny_Loot from "../assets/Shiny_Loot.svg";    
import Games_Republic from "../assets/Games_Republic.svg"; 
import GameBillet from "../assets/GameBillet.svg";     
import TwoGame from "../assets/TwoGame.svg";         
import kinguin from "../assets/kinguin.svg";       
import Amazon from "../assets/Amazon.svg";      
import Humble_Store from "../assets/Humble_Store.svg"; 
import SilaGames from "../assets/SilaGames.svg";   
import Voidu from "../assets/Voidu.svg";       
import IndieGala from "../assets/IndieGala.svg";    
import allkeyshop from "../assets/allkeyshop.svg";   
import GameStop from "../assets/GameStop.svg";           
import Desura from "../assets/Desura.svg";             
import Playfield from "../assets/Playfield.svg";          
import Epic_Games_Store from "../assets/Epic_Games_Store.svg";   
import Blizzard_Shop from "../assets/Blizzard_Shop.svg";      
import Direct2Drive from "../assets/Direct2Drive.svg";   
import Uplay from "../assets/Uplay.svg";          
import ImperialGames from "../assets/ImperialGames.svg";  
import Razer_Game_Store from "../assets/Razer_Game_Store.svg";
import AllYouPlay from "../assets/AllYouPlay.svg";     
import GOG from "../assets/GOG.svg";  
import IndieGameStand from "../assets/IndieGameStand.svg";  
import DLGamer from "../assets/DLGamer.svg";  
import Noctre from "../assets/Noctre.svg";  

export default function StoreComponent(props) {
  function btnClick() {
    window.open(props.StoreLinks);
  }
  
  return (
    <div className="StoreComponent">
      <img className="StoreIcon" alt="Store Icon" src={`src/assets/`+props.storeTitle+`.svg`}/>
      <h2 className="TitleofStore"> {props.storeTitle}</h2>
      <h1 className="StoreGamePrice"> {props.price} €</h1>
      <button className="VisitStoreBtn" onClick={btnClick} target="_blank">Go</button>
    </div>
  );
}