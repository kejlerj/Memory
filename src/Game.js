import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import Confetti from 'react-confetti';
import useWindowDimensions from './useWindowDimensions';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { Popover, Button, IconButton, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ArrowBack } from '@material-ui/icons';
import axios from 'axios';
import Field from './Field';
import Leaderboard from './Leaderboard';
import './Game.css';

function Game(props) {
    const [count, setCount] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [errorSnackbar, SeterrorSnackbar] = useState(false);
    const [isVictory, setVictory] = useState(false);
    const { height, width } = useWindowDimensions();
    const counter = useRef(null);
    const popoverRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const history = useHistory();
    const [field, setField] = useState(props.location.state.field);

    const handlePopover = () => {
        setAnchorEl(popoverRef.current);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRestart = () => {
        axios
            .post(process.env.REACT_APP_GAME_ADDR, {
                pseudo: Cookies.get('pseudo'),
            })
            .then((res) => {
                history.replace({
                    pathname: '/game/' + res.data.gameID,
                    state: { field: res.data.field },
                });
                Cookies.remove('token');
                Cookies.set('token', res.data.token, { sameSite: 'lax' });
                setCount(() => 0);
                setClicks(() => 0);
                setVictory(() => false);
                setField(() => res.data.field);
            })
            .catch(() => SeterrorSnackbar(() => true));
    };

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        SeterrorSnackbar(() => false);
    };

    useEffect(() => {
        if (count === 0) {
            counter.current = setInterval(() => {
                setCount((prev) => prev + 1);
            }, 1000);
            //return () => clearInterval(counter.current);
        }
    }, [count]);

    useEffect(() => {
        if (isVictory === true) {
            clearInterval(counter.current);
            handlePopover();
        }
    }, [isVictory]);

    return (
        <div className='body'>
            {isVictory && <Confetti width={width} height={height} />}
            <div ref={popoverRef} className='game_container'>
                <div className='header'>
                    <NavLink to='/'>
                        <IconButton>
                            <ArrowBack color='action' />
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
                        setVictory={setVictory}
                        setClicks={setClicks}
                        setCount={setCount}
                        cards={field}
                        gameID={props.match.params.gameID}
                    />
                    <div className='leaderboard-button'>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handlePopover}
                        >
                            classement
                        </Button>
                    </div>
                    <div className='restart-button'>
                        <Button
                            variant='contained'
                            color='primary'
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
                    style: { width: '600px' },
                }}
            >
                <Leaderboard onClose={handleClose} />
            </Popover>
            <Snackbar
                open={errorSnackbar}
                autoHideDuration={6000}
                onClose={closeSnackbar}
            >
                <Alert
                    onClose={closeSnackbar}
                    variant='filled'
                    severity='error'
                >
                    Le score n'a pas pu etre sauvegardé ..
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Game;
