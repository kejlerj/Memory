import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Avatar,
    IconButton,
    Grid,
    ListSubheader,
    Snackbar,
} from '@material-ui/core';
import { EmojiEvents, ArrowBack } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import Skeleton from '@material-ui/lab/Skeleton';
import { yellow } from '@material-ui/core/colors';
import axios from 'axios';

import './Leaderboard.css';

function Leaderboard({ onClose }) {
    const [data, setData] = useState([]);
    const [dataSize, setDataSize] = useState(0);
    const [errorSnackbar, SeterrorSnackbar] = useState(false);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_LEADERBOARD_ADDR)
            .then((result) => setData(() => result.data))
            .catch(() => SeterrorSnackbar(() => true));
    }, []);

    useEffect(() => {
        if (Array.isArray(data)) setDataSize(() => data.length);
        else setDataSize(() => 0);
    }, [data]);

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        SeterrorSnackbar(() => false);
    };

    return (
        <div className='leaderboard'>
            <Grid container>
                <Grid item xs={12}>
                    <List>
                        <ListSubheader style={{ backgroundColor: 'white' }}>
                            <ListItem divider>
                                <ListItemIcon>
                                    <IconButton onClick={onClose}>
                                        <ArrowBack color='action' />
                                    </IconButton>
                                </ListItemIcon>
                                <EmojiEvents
                                    color='action'
                                    fontSize='large'
                                    style={{ color: yellow[700] }}
                                />
                                <ListItemText inset>
                                    <h2>Classement</h2>
                                </ListItemText>
                            </ListItem>
                        </ListSubheader>
                        {Array.isArray(data) &&
                            data.map((player, i) => (
                                <div key={i}>
                                    <ListItem button>
                                        <ListItemAvatar>
                                            <Avatar />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={player._id}
                                            secondary={'Score: ' + player.score}
                                        />
                                        <ListItemSecondaryAction>
                                            <ListItemText>
                                                {i + 1}
                                                <sup>e</sup>
                                            </ListItemText>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider variant='middle' />
                                </div>
                            ))}
                        {dataSize < 5 &&
                            Array.apply(null, Array(5 - dataSize)).map(
                                (player, i) => (
                                    <div key={i}>
                                        <ListItem button>
                                            <ListItemAvatar>
                                                <Skeleton
                                                    variant='circle'
                                                    width={40}
                                                    height={40}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText>
                                                <Skeleton width={100} />
                                                <Skeleton width={50} />
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <ListItemText>
                                                    {i + 1 + dataSize}
                                                    <sup>e</sup>
                                                </ListItemText>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider variant='middle' />
                                    </div>
                                )
                            )}
                    </List>
                </Grid>
            </Grid>
            <Snackbar
                open={errorSnackbar}
                autoHideDuration={6000}
                onClose={closeSnackbar}
            >
                <Alert onClose={closeSnackbar} severity='error'>
                    Le classement n'a pas pu etre téléchargé..
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Leaderboard;
