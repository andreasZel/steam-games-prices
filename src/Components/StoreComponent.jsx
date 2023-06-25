import "../CSS/StoreComponent.css";
import SteamLogo from "../assets/steamlogo.svg";

export default function StoreComponent(props) {
  return (
    <div className="StoreComponent">
      <img className="StoreIcon" alt="Store Icon" src={SteamLogo}/>
      <h2 className="TitleofStore"> {props.storeTitle}</h2>
      <h1 className="StoreGamePrice"> {props.price} </h1>
      <button className="VisitStoreBtn">Go</button>
    </div>
  );
}
