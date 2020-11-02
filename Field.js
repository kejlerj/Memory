import React, { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import useWindowDimensions from './useWindowDimensions';
import Card from './Card';
import './Field.css';


function Field({cards})
{
    const [ selected, setSelected ] = useState([]);
    const [ found, setFound ] = useState([]);
    const [ isVictory, setVictory ] = useState(false);
    const { height, width } = useWindowDimensions();
    const timer = useRef(null)


    const isFound = index => {
        return found.filter(elem => elem === index).length;
    }

    const isSelected = index => {
        return selected.filter(elem => elem === index).length;
    }

    const match = () => {
        if (cards[selected[0]] === cards[selected[1]])
            return true;
        return false;
    };

    const checkVictory = () => {
        if (found.length === cards.length)
            setVictory(true)
    }

    useEffect(() => {
        if (selected.length == 2)
        {
            if (match())
            {
                setFound(prev => [...prev, ...selected])
                setSelected(() => [])
            }
            else
            {
                timer.current = setTimeout(() => {
                    setSelected(() => [])
                }, 1500)
            }
        }
    }, [selected])

    useEffect(() => {
        checkVictory()
    }, [found])

    const handleClick = (index) => {
        if (isFound(index))
            return;
        switch (selected.length)
        {
            case 0:
                setSelected(prev => [...prev, index])
                break;
            case 1:
                setSelected(prev => [...prev, index])
                break;
            default:
                clearTimeout(timer.current)
                setSelected(prev => [index])
        }
    };

    return (
        <div className='body'>
            <div className="field">
            {
                isVictory && 
                    <Confetti
                        width={width}
                        height={height}
                    />
            }
            {
                cards.map((icon, index) => (
                    <Card
                        symb = {icon}
                        key = {index} 
                        index = {index} 
                        flipped = {isSelected(index)}
                        found = {isFound(index)}
                        clickCard = {handleClick}
                    />
                ))
            }
            </div>
        </div>
    )
}
    export default Field