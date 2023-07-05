import "../CSS/StorePricesInfo.css";


export default function StorePricesInfo(props) {
  return (
    <div className="StorePricesInfo">
      <div className="TitleInfoArea">
        <h1 className="Info_Title">Prices: </h1>
        <img className="Windows_platform" src={props.Platforms[1]} />
        <img className="Mac_platform" src={props.Platforms[0]} />
      </div>
      <div className="SalesStoresArea">
        <div className="Price_Diagram">{props.chart}</div>
        <div className="Stores">
          {props.StoreComponents}
        </div>
      </div>
    </div>
  );
}
