import React, { useState, useEffect } from "react"
import Cookies from 'js-cookie'
import { List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListItemSecondaryAction, Divider, Avatar, IconButton, Grid, ListSubheader, Snackbar } from '@material-ui/core';
import { EmojiEvents, ArrowBack } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import Skeleton from '@material-ui/lab/Skeleton'
import { yellow } from '@material-ui/core/colors'
import './Leaderboard.css'


function Leaderboard({onClose}) {
    const [data, setData] = useState([])
    const [ dataSize, setDataSize ] = useState(0)
    const [ errorSnackbar, SeterrorSnackbar ] = useState(false)
    const server = 'https://memory.jeremykejler.fr'

    useEffect(() => {
        fetch(server + '/leaderboard')
            .then(result => result.json())
            .then(data => setData(() => data))
            .catch(err => SeterrorSnackbar(() => true))
    }, [])

    useEffect(() => {
        if (Array.isArray(data))
            setDataSize(() => data.length)
        else 
            setDataSize(() => 0)
    }, [data])

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        SeterrorSnackbar(() => false)
    }

    return (
        <div className='leaderboard'>
            <Grid container>
                <Grid item xs={12}>
                    <List>
                        <ListSubheader style={{backgroundColor:'white'}}>
                            <ListItem divider>
                                <ListItemIcon>
                                    <IconButton onClick={onClose}>
                                        <ArrowBack color="action" />
                                    </IconButton>
                                </ListItemIcon>
                                <EmojiEvents color="action" fontSize='large' style={{ color: yellow[700] }}/>
                                <ListItemText inset>
                                <h2>Classement</h2>
                                </ListItemText>
                            </ListItem>
                        </ListSubheader>
                        {
                            Array.isArray(data) && data.map((player, i) => (
                                <div key={i}>
                                    <ListItem button selected={(player.pseudo === Cookies.get('pseudo'))}>
                                        <ListItemAvatar>
                                            <Avatar src="/broken-image.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText primary={player.pseudo} secondary={'Score: ' + player.score}/>
                                        <ListItemSecondaryAction>
                                            <ListItemText>
                                                {i + 1}
                                                <sup>e</sup>
                                            </ListItemText>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                </div>
                            ))
                        }
                        {
                            Array.apply(null, Array(10 - dataSize)).map((player, i) => (
                                <div key={i}>
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Skeleton variant='circle' width={40} height={40}/>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <Skeleton width={100}/>
                                            <Skeleton width={50}/>
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <ListItemText>
                                                {i + 1 + dataSize}
                                                <sup>e</sup>
                                            </ListItemText>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider variant="middle"/>
                                </div>
                            ))
                        }
                    </List>
                </Grid>
            </Grid>
            <Snackbar open={errorSnackbar} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} >
                    Le score n'a pas pu etre sauvegardé ..
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Leaderboard

