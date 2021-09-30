import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
    CardContent,
    Grid,
    Slider,
    Switch,
    TextField,
    Button,
    Card,
    Typography,
    Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './Menu.css';

function Menu() {
    const [pseudo, setPseudo] = useState('');
    const [errorSnackbar, SeterrorSnackbar] = useState(false);
    const history = useHistory();

    // const [ darkmode, setDarkmode ] = useState(false);
    const marks = [
        {
            value: 12,
            label: '12',
        },
        {
            value: 20,
            label: '20',
        },
        {
            value: 30,
            label: '30',
        },
    ];

    function valuetext(value) {
        return value;
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        SeterrorSnackbar(() => false);
    };

    const onClickPlay = () => {
        axios
            .post(process.env.REACT_APP_GAME_ADDR, {
                pseudo: pseudo,
            })
            .then((res) => {
                Cookies.set('pseudo', pseudo, { sameSite: 'lax' });
                Cookies.set('token', res.data.token, { sameSite: 'lax' });
                history.push({
                    pathname: '/game/' + res.data.gameID,
                    state: { field: res.data.field },
                });
            })
            .catch(() => SeterrorSnackbar(() => true));
    };

    return (
        <div className='menu'>
            <Grid container justify='center' alignItems='center'>
                <Grid item xs={10} sm={8} lg={5}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant='h4'
                                align='center'
                                paragraph={true}
                            >
                                Jeu du Memory
                            </Typography>
                            <Grid container justify={'center'}>
                                <Grid xs={10}>
                                    <Typography
                                        variant='subtitle2'
                                        align='justify'
                                    >
                                        Toutes les cartes sont étalées faces
                                        cachées.
                                    </Typography>
                                    <Typography
                                        variant='subtitle2'
                                        align='justify'
                                    >
                                        Le joueur retourne 2 cartes :
                                    </Typography>
                                    <Typography
                                        variant='subtitle2'
                                        align='justify'
                                        paragraph={true}
                                    >
                                        <ul>
                                            <li>
                                                Si les deux cartes ne vont pas
                                                ensemble, les cartes sont
                                                retournées face cachée à
                                                l'endroit exact où elles
                                                étaient.
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                Si c'est la même image qui
                                                apparaît sur les deux cartes le
                                                joueur les laisse face visible
                                                et en retourne à nouveau deux.
                                            </li>
                                        </ul>
                                    </Typography>
                                    <Typography
                                        variant='subtitle2'
                                        align='justify'
                                        paragraph={true}
                                    >
                                        Le but est de retourner toutes les
                                        paires en un minimum de coup et de
                                        temps.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={3} sm={4} md={5} />
                                <Grid item xs={6} sm={4} md={2}>
                                    <TextField
                                        id='outlined-basic'
                                        label='Pseudo'
                                        variant='outlined'
                                        name='pseudo'
                                        value={pseudo}
                                        onChange={(event) =>
                                            setPseudo(event.target.value)
                                        }
                                        style={{
                                            width: '100%',
                                            marginBottom: '15px',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            {/*
                                    <Grid container>
                                        <Grid item xs={3} sm={4} md={5}/>
                                        <Grid item xs={6} sm={4} md={2}>
                                            <Slider
                                                min={12}
                                                max={30}
                                                defaultValue={20}
                                                valueLabelFormat={valuetext}
                                                getAriaValueText={valuetext}
                                                aria-labelledby="discrete-slider-restrict"
                                                step={null}
                                                valueLabelDisplay="auto"
                                                marks={marks}
                                            />
                                        </Grid>
                                    </Grid>
                                */}

                            {/*
                                <Grid container justify={'center'}>
                                    <Switch
                                        checked={darkmode}
                                        onChange={() => setDarkmode(prev => !prev)}
                                        color="primary"
                                        name="switchMode"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                                */}

                            <Grid container justify='center'>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    disabled={!pseudo}
                                    onClick={() => onClickPlay()}
                                >
                                    Jouer
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Snackbar
                open={errorSnackbar}
                autoHideDuration={1500}
                onClose={closeSnackbar}
            >
                <Alert
                    onClose={closeSnackbar}
                    variant='filled'
                    severity='error'
                >
                    La partie n'a pas pu etre lancé ...
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Menu;

// State pour pseudo / nombre de carte / darkmode
// Envoyer pseudo et nb carte a game
// changer darkmode en live
// disable button si aucun pseudo n'est selectionné

/////////////////////////////////////////////////////

// Onclick sur button jouer => fetch launch
// Partager le token avec la boucle de jeu
// Retirer pseudo des cookies (y mettre le token ?)
