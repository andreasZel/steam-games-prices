import "../CSS/SearchBar.css";
import SearchIcon from "../assets/search-icon.svg";
import { useState } from "react";

let style = {
  filter: "none",
};

let Suggestionsstyle = {
  position: "absolute",
  top: "80px",
  width: "75%",
  justifySelf: "center",
  height: "300px",
  backgroundColor: "#747e72",
  filter: "drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.856))",
  overflowX: "hidden",
  transition: "1s",
  overflowY: "scroll",
  display: "none",
};

export default function SearchBar() {
  const [isHoverd, FocusGain] = useState(style);
  const [Suggestions, SuggestiOn] = useState(Suggestionsstyle);

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
        animation: "fadeIn 1s",
        animationDelay: "0s",
        animationFillMode: "forwards",
        display: previousStyle.display === "none" 
        ? "" 
        : "none",
      };
    });
  }

  return (
    <>
      <div className="SearchBar" style={isHoverd}>
        <img className="Search_image" src={SearchIcon} />
        <input
          className="Search_input"
          onFocus={changeStyle}
          onBlur={changeStyle}
          type="text"
        ></input>
      </div>
      <div className="Search_suggestions" style={Suggestions}></div>
    </>
  );
}
