
import React, { useEffect, useState } from "react";
import Field from "./Field";

function Game() {
    const [cards, setCards] = useState(() => [
        "⚖️", "🛵", "🐦", "🛒", "🔧",
        "⚖️", "🛵", "🐦", "🛒", "🔧",
        "🚕", "🚀", "⏳", "⏰", "💡",
        "🚕", "🚀", "⏳", "⏰", "💡"
    ]);

    
    const shuffle = (arr) => {
        var i, j;

        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            [ arr[i], arr[j] ] = [ arr[j], arr[i] ]
        }
        return arr;    
    };

    useEffect(() => {
        setCards(previous => shuffle(previous))
    }, [])


    return (
        <Field
            cards={cards}
        />
    )
}

export default Game