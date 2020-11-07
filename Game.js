
import React, { useEffect, useRef, useState } from "react";
import Confetti from 'react-confetti';
import useWindowDimensions from './useWindowDimensions';
import Field from "./Field";
import './Game.css';


function Game() {
    const [ count, setCount ] = useState(() => 0)
    const [ clicks, setClicks ] = useState(() => 0)
    const [ cards, setCards ] = useState(() => [
        "⚖️", "🛵", "🐦", "🛒", "🔧",
        "⚖️", "🛵", "🐦", "🛒", "🔧",
        "🚕", "🚀", "⏳", "⏰", "💡",
        "🚕", "🚀", "⏳", "⏰", "💡"
    ]);
    const [ isVictory, setVictory ] = useState(false);
    const { height, width } = useWindowDimensions();
    const counter = useRef(null)

    useEffect(() => {
        setCards(previous => shuffle(previous))
        counter.current = setInterval(() => {
            setCount(prev => prev + 1)
        }, 1000);
        return () => clearInterval(counter.current);
    }, [])

    useEffect(() => {
        if (isVictory === true)
            clearInterval(counter.current);
    }, [isVictory])

    const score = () => {
        let min_time = 20
        let min_clicks = cards.length / 2
        let time_pts = 5
        let click_pts = 20
        let score = 1000
        
        score -= ((clicks - min_clicks) * click_pts)
        score -= ((count - min_time) * time_pts)
        return score > 0 ? score : 0 
    }



    const display_leaderboard = () => {

    }

    const shuffle = (arr) => {
        var i, j;

        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            [ arr[i], arr[j] ] = [ arr[j], arr[i] ]
        }
        return arr;    
    };



    const incrClick = () => {
        setClicks(prev => prev + 1)
    }

    return (
        <div className='body'>
        {
            isVictory && 
                <Confetti
                    width={width}
                    height={height}
                />
        }
            <div className='game_container'>
                <div className='header'>
                    <div className='title'>
                        <h1>Jeu du memory</h1>
                    </div>
                    <div className='counter'>
                        <p>{count} 🕓</p>
                        <p>{clicks} 🎲</p>
                    </div>
                </div>
                <div className='game'>

                    <Field
                        cards={cards}
                        incrClick={incrClick}
                        setVictory={setVictory}
                    />
                </div>
            </div>

        </div>

    )
}

export default Game