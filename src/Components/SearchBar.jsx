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
export default function SearchBar({ Swapwindow, ChangeGameInfo, StoreComponents, UpdateStoreComponents, onDisplay, changeDisplay, setloading}) {
  const [isHoverd, FocusGain] = useState(style);
  const [Suggestions, SuggestiOn] = useState(Suggestionsstyle);
  const [TypedText, updateText] = useState("");
  const [SuggestionList, updateSuggestionList] = useState(null);

  function changeStyle() {
    FocusGain((previousStyle) => {
      return {
        filter:
          previousStyle.filter === "none"
            ? "drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.73))"
            : "none",
      };
    });

    SuggestiOn((previousStyle) => {
      return {
        ...previousStyle,
        animation: "fadeIn 0.1s",
        animationDelay: "0s",
        animationFillMode: "forwards",
        visibility:
          previousStyle.visibility === "hidden" &&
          SuggestionList != null &&
          TypedText != ""
            ? ""
            : "hidden",
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
          onFocus={changeStyle}
          onBlur={changeStyle}
          onKeyUp={() => {
            GameNameSuggestions({
              TypedText,
              updateSuggestionList,
              SuggestiOn,
              updateText,
            });
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              
              SuggestiOn((previousStyle) => {
                return {
                  ...previousStyle,
                  animation: "fadeIn 0.1s",
                  animationDelay: "0s",
                  animationFillMode: "forwards",
                  visibility: "hidden", //! MIGHT NEED TWEAKING
                };
              });

              if (onDisplay === false) {

                setloading(true);
                console.log(loading);

                let temp = CreateGame({ 
                  TypedText, 
                  ChangeGameInfo, 
                  StoreComponents, 
                  UpdateStoreComponents
                }).then( () => {

                  setloading(false);
                  console.log(loading);
                  
                  changeDisplay(() => {return temp})
                  Swapwindow(() => {return true});
                });
              }
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
