import "../CSS/SearchBar.css";
import SearchIcon from "../assets/search-icon.svg";

import GameNameSuggestions from "../Functions/GameNameSuggestions.jsx";
import CreateGame from "../Functions/CreateGame.jsx";
import { useState } from "react";

let style = {
  filter: "none",
};

let Suggestionsstyle = {
  position: "absolute",
  top: "80px",
  paddingLeft: "4px",
  width: "75%",
  fontSize: "25px",
  justifySelf: "center",
  height: "300px",
  backgroundColor: "#747e72",
  filter: "drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.856))",
  overflowX: "hidden",
  transition: "0.1s",
  overflowY: "scroll",
  visibility: "hidden",
};

//might need to change props
export default function SearchBar({ 
  Swapwindow, 
  ChangeGameInfo, 
  StoreComponents, 
  UpdateStoreComponents, 
  onDisplay, 
  changeDisplay, 
  loading, 
  changeloadingState,
  platformsCapability,
  Platforms
}) {

  const [isHoverd, FocusGain] = useState(style);
  const [Suggestions, SuggestiOn] = useState(Suggestionsstyle);
  const [TypedText, updateText] = useState("");
  const [SuggestionList, updateSuggestionList] = useState(null);

  function changeStyle(style) {
    FocusGain(() => {
      return {
        filter: style[0] 
      };
    });

    SuggestiOn((previousStyle) => {
      return {
        ...previousStyle,
        animation: "fadeIn 0.1s",
        animationDelay: "0s",
        animationFillMode: "forwards",
        visibility: style[1]
      };
    });
  }

  const handleChange = (event) => {
    updateText(event.target.value);
  };

  return (
    <>
      <div className="SearchBar" style={isHoverd}>
        <img className="Search_image" src={SearchIcon} />
        <input
          value={TypedText}
          className="Search_input"
          onFocus={() => {changeStyle(["drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.73))", SuggestionList != null ? "" : "hidden"]);}}
          onBlur={() => {changeStyle(["none", "hidden"]);}}
          onKeyUp={(event) => {
            if (event.key != "Enter") {
              GameNameSuggestions({
                TypedText,
                updateSuggestionList,
                SuggestiOn,
                updateText,
              });
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              
              changeloadingState(() => {return true});
              console.log(loading);

              changeDisplay(() => {return false})

              SuggestiOn((previousStyle) => {
                return {
                  ...previousStyle,
                  animation: "fadeIn 0.1s",
                  animationDelay: "0s",
                  animationFillMode: "forwards",
                  visibility: "hidden", //! MIGHT NEED TWEAKING
                };
              });

              var clicked = false;

              let temp = CreateGame({ 
                clicked,
                TypedText, 
                ChangeGameInfo, 
                StoreComponents, 
                UpdateStoreComponents,
                Platforms,
                platformsCapability,
                Swapwindow,
                changeDisplay,
                onDisplay
              }).then( (result) => {
                
                if (result != false) {
                  Swapwindow(() => {return true});
                } else {
                  updateText(() => {return "Invalid game Title";});
                  Swapwindow(() => {return false});
                }
                
                changeloadingState(() => {return false});
                console.log(loading);
              });
              
            }
          }}
          onChange={handleChange}
          type="text"
        ></input>
      </div>
      <div className="Search_suggestions" style={Suggestions}>
        <ul className="SuggestionUl">{SuggestionList}</ul>
      </div>
    </>
  );
}
