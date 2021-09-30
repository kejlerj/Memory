import React, { useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Card from './Card';
import './Field.css';

function Field({ cards, setClicks, setVictory, setCount, gameID }) {
    const [selected, setSelected] = useState([]);
    const [field, setField] = useState(cards);
    const timer = useRef(null);
    const isSelected = (index) => {
        return selected.filter((elem) => elem === index).length;
    };

    const handleClick = (index) => {
        axios
            .post(
                process.env.REACT_APP_GAME_ADDR + '/' + gameID + '/action',
                {
                    cardIndex: index,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + Cookies.get('token'),
                    },
                }
            )
            .then((res) => {
                setClicks(() => res.data.nbClick);
                setVictory(() => res.data.isVictory);
                setField(() => res.data.field);
                if (res.data.isVictory === true) setCount(() => res.data.count);
            })
            .catch((err) => console.log(err));

        switch (selected.length) {
            case (0, 1):
                setSelected((prev) => [...prev, index]);
                timer.current = setTimeout(() => {
                    setSelected(() => []);
                }, 1500);
                break;
            default:
                clearTimeout(timer.current);
                setSelected(() => [index]);
        }
    };

    return (
        <div className='field'>
            {Array.isArray(field) &&
                field.map((card, index) => (
                    <Card
                        symb={card.icon}
                        key={index}
                        index={index}
                        flipped={card.status === 'VISIBLE' || isSelected(index)}
                        found={card.status === 'FOUND'}
                        clickCard={handleClick}
                    />
                ))}
        </div>
    );
}
export default Field;
