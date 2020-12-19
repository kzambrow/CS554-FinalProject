import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import noImage from '../img/no-image.png';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { AuthContext } from '../firebase/Auth';
import GetCode from './GetCode';
const axios = require('axios');


const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontWeight: 'bold'
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    media: {
        height: '100%',
        width: '100%'
    },
    button: {
        color: '#1e8678',
        fontWeight: 'bold',
        fontSize: 12
    }
});


const GetWaitingInfo = props => {
    const [track, setTrack] = useState('');
    const queueId = props.queueId;
    const postId = props.postId;
    const classes = useStyles();
    const [errorMsg, setErrorMsg] = useState(undefined);

    useEffect(() => {
        let repeat;
        async function fetchData() {
            if (track !== -1) {
                try {
                    const res = await axios.post('http://localhost:5000/queue/check', {
                        postId: postId,
                        queueId: queueId
                    })

                    setTrack(res.data.data);
                    console.log(track);

                    repeat = setTimeout(fetchData, 3000); // request again after 3 second
                } catch (error) {
                    setErrorMsg(error.response.data.error);
                }
            } else {
                repeat = undefined;
            }
        }
        if (track !== -1) fetchData();

        return () => {
            if (repeat && track !== -1) {
                clearTimeout(repeat);
            }
        }
    }, [track]);
    // console.log(track);

    if (errorMsg) {
        return (
            <Grid container className={classes.grid} spacing={5}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant='body2' color='textSecondary' component='p'>
                                {errorMsg}
                                
                            </Typography>
                        </CardContent>
                    </CardActionArea><br />
                </Card>
            </Grid>

        )
    }

    if (track === -1) {
        return (
            <GetCode queueId={queueId} postId={postId} />
        );
    } else {
        if (track) {
            return (
                <Grid container className={classes.grid} spacing={5}>
                    <Card className={classes.card} variant='outlined'>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    <ul>
                                        {track.map((user) => {
                                            return (
                                                <li>{user}</li>
                                            )
                                        })}
                                    </ul>
                                </Typography>
                            </CardContent>
                        </CardActionArea><br />
                    </Card>
                </Grid>

            )
        }
        return (
            <div>User List Here</div>
        )
    }

};

export default GetWaitingInfo;