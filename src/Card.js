
import React from 'react'
import ReactCardFlip from "react-card-flip";
import './Card.css'

const HIDDEN_SYMBOL = '❓';

// flipped = visible
// isFlipped = hidden

function Card({symb, index, flipped, found, clickCard}) {

  return (
    <ReactCardFlip isFlipped={!found && !flipped}>
      <div className='mycard visible' onClick={() => clickCard(index) }>
        <span className="symbol">
          {symb}
        </span>
      </div>

      <div className='mycard hidden' onClick={() => clickCard(index) }>
        <span className="symbol">
          {HIDDEN_SYMBOL}
        </span>
      </div>
    </ReactCardFlip>
  )
}

export default Card