import React, { useState } from 'react';
import Card from './Card';
import './Field.css';


function Field()
{
    const [selected1, setSelected1] = useState(-1);
    const [selected2, setSelected2] = useState(-1);
    var cards = [
        "⚖️", "🛵", "🐦", "🛒", "🔧",
        "⚖️", "🛵", "🐦", "🛒", "🔧",
        "🚕", "🚀", "⏳", "⏰", "💡",
        "🚕", "🚀", "⏳", "⏰", "💡"   
      ];
    
    var shuffle = (arr) => {
        var i, j, temp;

        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;    
    };

    var match = () => {
        if (cards[selected1] === cards[selected2])
            return true;
        return false;
    };

    var handleClick = (feedback) => {
        console.log(1);
        if (selected1)
        {
            setSelected2(1);
            setTimeout(() => {
                if (match())
                {
                    // card1.feedback = visible
                    // card2.feedback = visible
                }
                else
                {
                    // card1.feedback = hidden
                    // card2.feedback = hidden
                }
                setSelected1(-1);
                setSelected2(-1);
            }, 2000);
        }
        else
            setSelected1(1);
    };

    cards = shuffle(cards);
    return (
        <div className="field">

            {cards.map((card, index) => (
                <Card symb={card} key={index} onClick={handleClick}/>
            ))}

        </div>
    )
}
    export default Field
