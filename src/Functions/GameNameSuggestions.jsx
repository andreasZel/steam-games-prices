import GameNameAndIdS from "../assets/GameNameAndIdS.js";

export default function GameNameSuggestions({
  TypedText,
  updateSuggestionList,
  SuggestiOn,
  updateText,
}) {

    function handleSelect(selectedItem) {
            updateText(()=>{return selectedItem})
    }

  var suggestions = [];

  if (TypedText === "") return suggestions;

  var reg = new RegExp(`^` + TypedText.toLowerCase());
  var filteredArray = GameNameAndIdS.filter((item) =>
    item.name.toLowerCase().match(reg)
  );

  //Only show 30 first results if user hasn't
  //typed more than 4 letters because list is too
  //big to render
  if (TypedText.length <= 4) {
    filteredArray = filteredArray.slice(0, 30);
  }

  let Tmp = filteredArray.map(function (subarray) {
    return (
      <li
        key={subarray.appid}
        id={subarray.name}
        onClick={(event) => handleSelect(event.currentTarget.id)}
      >
        {subarray.name}
      </li>
    );
  });

  updateSuggestionList(() => {
    return Tmp;
  });

  SuggestiOn((previousStyle) => {
    return {
      ...previousStyle,
      visibility: filteredArray != null && TypedText != "" ? "" : "hidden",
    };
  });
}

