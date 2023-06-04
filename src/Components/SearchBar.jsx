import "../CSS/SearchBar.css";
import SearchIcon from "../assets/search-icon.svg";
import { useState } from "react";

let style = {
  filter: "none",
};

export default function SearchBar() {
  const [isHoverd, FocusGain] = useState(style);

  function changeStyle() {
    FocusGain((previousStyle) => {
      return {
        filter:
          previousStyle.filter === "none"
            ? "drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.73))"
            : "none",
      };
    });
  }

  return (
    <div className="SearchBar" style={isHoverd}>
      <img className="Search_image" src={SearchIcon} />
      <input
        className="Search_input"
        onFocus={changeStyle}
        onBlur={changeStyle}
        type="text"
      ></input>
    </div>
  );
}
