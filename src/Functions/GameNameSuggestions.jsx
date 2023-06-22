import GameNameAndIdS from "../assets/GameNameAndIdS.js";

export default function GameNameSuggestions({TypedText, updateSuggestionList}) {
        
    var suggestions = [];

    if (TypedText === "")
        return suggestions

    var reg = new RegExp(`^`+TypedText.toLowerCase())
    var filteredArray = GameNameAndIdS.filter(item => item.name.toLowerCase().match(reg));

    console.log(TypedText.length)

    if (TypedText.length < 4){
        filteredArray = filteredArray.slice(0, 30)
    }
    
    let Tmp = filteredArray.map(function(subarray) {
        return <li key={subarray.appid}>{subarray.name}</li>
    })

    
    console.log(Tmp)
    updateSuggestionList(() => {
        return Tmp;
    })
    
}