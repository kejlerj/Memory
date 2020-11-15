
import React, { useEffect, useRef, useState } from "react"
import Cookies from 'js-cookie'
import Confetti from 'react-confetti'
import useWindowDimensions from './useWindowDimensions'
import { NavLink, Redirect } from "react-router-dom"
import { Popover, Button, IconButton, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { ArrowBack } from '@material-ui/icons'
import Field from "./Field"
import Leaderboard from "./Leaderboard"
import './Game.css'

function Game() {
    const [ count, setCount ] = useState(0)
    const [ clicks, setClicks ] = useState(0)
    const [ score, setScore ] = useState(0)
    const [ errorSnackbar, SeterrorSnackbar ] = useState(false)
    const [ cards, setCards ] = useState( [
        "⚖️", "🛵", "🐦", "🛒", "🔧",
        "⚖️", "🛵", "🐦", "🛒", "🔧",
        "🚕", "🚀", "⏳", "⏰", "💡",
        "🚕", "🚀", "⏳", "⏰", "💡"
    ]);
    const [ isVictory, setVictory ] = useState(false);
    const { height, width } = useWindowDimensions();
    const counter = useRef(null)
    const popoverRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const server = 'https://memory.jeremykejler.fr'
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined


    const handlePopover = () => {
      setAnchorEl(popoverRef.current)
    };
  
    const handleClose = () => {
      setAnchorEl(null)
    };

    const handleRestart = () => {
        // to have muttable array (and refresh state)
        setCards(() => shuffle(cards).slice())
        setCount(() => 0)
        setScore(() => 0)
        setClicks(() => 0)
        setVictory(() => false)
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        SeterrorSnackbar(() => false)
    }

    useEffect(() => {
        setCards(previous => shuffle(previous))
        counter.current = setInterval(() => {
            setCount(prev => prev + 1)
        }, 1000)
        return () => clearInterval(counter.current)
    }, [])

    useEffect(() => {
        if (isVictory === true)
        {
            clearInterval(counter.current)
            genScore()
            handlePopover()
        }
    }, [isVictory])
    
    useEffect(() => {
        fetch(server + '/score', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({pseudo: Cookies.get('pseudo'), score: score})
        }).then(result => result)
        .catch(err => SeterrorSnackbar(() => true))
    }, [score])

    const genScore = () => {
        let min_time = 20
        let min_clicks = cards.length / 2
        let time_pts = 5
        let click_pts = 20
        let score = 1000
        
        score -= ((clicks - min_clicks) * click_pts)
        score -= ((count - min_time) * time_pts)
        setScore(() => score)
    }

    const shuffle = (arr) => {
        var i, j

        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            [ arr[i], arr[j] ] = [ arr[j], arr[i] ]
        }
        return arr
    };

    const incrClick = () => {
        setClicks(prev => prev + 1)
    }

    if (!Cookies.get('pseudo') || Cookies.get('pseudo').length < 1)
        return <Redirect to='/'/>
    return (
        <div className='body'>
        {
            isVictory && 
                <Confetti
                    width={width}
                    height={height}
                />
        }
            <div ref={popoverRef} className='game_container'>
                <div className='header'>
                    <NavLink to='/'>
                        <IconButton>
                            <ArrowBack color="action"/>
                        </IconButton>
                    </NavLink>
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
                    <div className='leaderboard-button'>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handlePopover}
                            >
                                classement
                            </Button>
                    </div>
                    <div className='restart-button'>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleRestart}
                            >
                                Rejouer
                            </Button>
                    </div>
                </div>
            </div>
            <Popover
                id={id}
                open={open}
                disableScrollLock={true}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                PaperProps={{
                    style:{width: '600px'}
                }}
            >
                <Leaderboard onClose={handleClose} />
            </Popover>
            <Snackbar open={errorSnackbar} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} variant='error' >
                    Le score n'a pas pu etre sauvegardé ..
                </Alert>
            </Snackbar>
        </div>

    )
}

export default Game