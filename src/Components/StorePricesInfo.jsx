import "../CSS/StorePricesInfo.css";
import go_back_arrow from "../assets/go_back_arrow.svg";

export default function StorePricesInfo(props) {
  
  function Go_Back() {
    props.Swapwindow(() => {return false;})
    props.changeDisplay(() => {return false;});
    console.log(props.onDisplay);
  }
  
  return (
    <div className="StorePricesInfo">
      <div className="TitleInfoArea">
      <img className="go_back_arrow" src={go_back_arrow} onClick={Go_Back}/>
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
