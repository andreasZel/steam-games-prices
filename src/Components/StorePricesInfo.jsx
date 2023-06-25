import "../CSS/StorePricesInfo.css";
import mac_supported from "../assets/mac_supported.svg";
import windows_supported from "../assets/windows_supported.svg";
import StoreComponent from "./StoreComponent.jsx";

export default function StorePricesInfo(props) {
  return (
    <div className="StorePricesInfo">
      <div className="TitleInfoArea">
        <h1 className="Info_Title">Prices: </h1>
        <img className="Windows_platform" src={windows_supported} />
        <img className="Mac_platform" src={mac_supported} />
      </div>
      <div className="SalesStoresArea">
        <div className="Price_Diagram"></div>
        <div className="Stores">
          {props.stores}
          <StoreComponent />
        </div>
      </div>
    </div>
  );
}
