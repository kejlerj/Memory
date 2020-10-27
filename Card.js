
import React, { useState } from 'react'
import './Card.css'

const HIDDEN_SYMBOL = '❓';

function Card(symbol) {
    const [feedback, setFeedback] = useState("hidden");

    var handleClick = () => {
        setFeedback(feedback === "visible" ? "hidden" : "visible");
    };

    return (
        <div className={`card ${feedback}`} onClick={() => handleClick()}>
        <span className="symbol">
          {feedback === 'hidden' ? HIDDEN_SYMBOL : symbol.symb}
        </span>
      </div>  
    )
}

export default Card