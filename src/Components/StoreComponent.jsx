import "../CSS/StoreComponent.css";
import SteamLogo from "../assets/steamlogo.svg";

export default function StoreComponent() {
  return (
    <div className="StoreComponent">
      <img className="StoreIcon" alt="Store Icon" src={SteamLogo}/>
      <h2 className="TitleofStore"> Steam </h2>
      <h1 className="StoreGamePrice"> 39.99$ </h1>
      <button className="VisitStoreBtn">Go</button>
    </div>
  );
}
