import "../CSS/StorePricesInfo.css";
import mac_supported from "../assets/mac_supported.svg";
import mac_not_supported from "../assets/mac_not_supported.svg";
import windows_supported from "../assets/windows_supported.svg";
import windows_not_supported from "../assets/windows_not_supported.svg"

export default function StorePricesInfo(props) {
  return (
    <div className="StorePricesInfo">
      <div className="TitleInfoArea">
        <h1 className="Info_Title">Prices: </h1>
        <img className="Windows_platform" src={
          props.windows == true ? windows_supported : windows_not_supported
          } />
        <img className="Mac_platform" src={
          props.windows == true ?mac_supported : mac_not_supported} />
      </div>
      <div className="SalesStoresArea">
        <div className="Price_Diagram"></div>
        <div className="Stores">
          {props.StoreComponents}
        </div>
      </div>
    </div>
  );
}
