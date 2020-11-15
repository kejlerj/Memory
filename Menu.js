import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie'
import { CardContent, Grid, Slider, Switch, TextField, Button, Card, Typography } from '@material-ui/core';
import './Menu.css';

function Menu() {
    const [ pseudo, setPseudo ] = useState('');
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

    return (
        <div className='menu'>
            <Grid container justify='center' alignItems='center'>
                <Grid item xs={10} sm={8} lg={5}>
                    <Card>
                        <CardContent>
                            <Typography variant='h4' align='center' paragraph={true}>
                                Jeu du Memory
                            </Typography>
                            <Grid container justify={'center'}>
                                <Grid xs={10}>
                                    <Typography variant='subtitle2' align='justify'>
                                        Toutes les cartes sont étalées faces cachées.
                                    </Typography>
                                    <Typography variant='subtitle2' align='justify'>
                                        Le joueur retourne 2 cartes :
                                    </Typography>
                                    <Typography variant='subtitle2' align='justify' paragraph={true}>
                                        <ul>
                                            <li>
                                                Si les deux cartes ne vont pas ensemble, les cartes sont retournées face cachée à l'endroit exact où elles étaient.
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                Si c'est la même image qui apparaît sur les deux cartes le joueur les laisse face visible et en retourne à nouveau deux.
                                            </li>
                                        </ul>
                                    </Typography>
                                    <Typography variant='subtitle2' align='justify' paragraph={true}>
                                        Le but est de retourner toutes les paires en un minimum de coup et de temps.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={3} sm={4} md={5}/>
                                <Grid item xs={6} sm={4} md={2}>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Pseudo" 
                                        variant="outlined"
                                        name='pseudo'
                                        value={pseudo}
                                        onChange={(event) => setPseudo(event.target.value)}
                                        style = {{width: '100%', marginBottom: '15px'}}
                                    />
                                </Grid>
                            </Grid>
                            {
                                /*
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
                                */
                            }

                            {
                                /*
                                <Grid container justify={'center'}>
                                    <Switch
                                        checked={darkmode}
                                        onChange={() => setDarkmode(prev => !prev)}
                                        color="primary"
                                        name="switchMode"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                                */
                            }
 
                            <Grid container justify='center'>
                                    <Button 
                                        variant="contained" 
                                        component={NavLink}
                                        to='/game'
                                        color="primary"
                                        disabled={!pseudo}
                                        onClick={() => Cookies.set('pseudo', pseudo)}
                                    >
                                        Jouer
                                    </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Menu;

// State pour pseudo / nombre de carte / darkmode
// Envoyer pseudo et nb carte a game
// changer darkmode en live
// disable button si aucun pseudo n'est selectionné