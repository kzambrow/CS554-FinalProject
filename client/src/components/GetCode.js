import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import noImage from '../img/no-image.png';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { AuthContext } from '../firebase/Auth';
import Countdown from 'react-countdown';


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

//TODO
//provide links to change password
//display user info
//display different information for authenticated vs non authenticated
//ask about updating user schema to include island code, nintendo ID
function GetCode(props) {
    const postId = props.postId;
    const queueId = props.queueId;



    const { currentUser } = useContext(AuthContext);
    const [islandCode, setIslandCode] = useState(undefined);
    // const [queueId, setQueueId] = useState(undefined);

    const classes = useStyles();
    useEffect(() => {
        const getCode = async () => {
            // const userInfo = await axios.get(`http://localhost:5000/user/email/${currentUser.email}`);
            try {
                // const queue = await axios.post('http://localhost:5000/queue/find', {
                //     userId: currentUser.id,
                //     postId: postId
                // })
                // setQueueId(queue.data.data._id);
                const code = await axios.post('http://localhost:5000/queue/getCode', {
                    postId: postId,
                    queueId: queueId
                })
                setIslandCode(code.data.data);
            } catch (e) {
                console.log(e.response)
            }
        }
        // console.log(queueId)
        if (queueId) getCode();

    }, []);
    let card = null;

    islandCode && (card =
        <Card className={classes.card} variant='outlined'>
            <CardActionArea>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        <br></br>
                            Code: {islandCode}
                        <br></br>


                    </Typography>
                </CardContent>
            </CardActionArea><br />
            Time left:
            <Countdown date={Date.now() + 300000} />
        </Card>
    );
    if (islandCode!='Waiting.....') {
        return (
            <Grid container className={classes.grid} spacing={5}>
                {card}
            </Grid>

        );
    } else {
        return (
            <Grid container className={classes.grid} spacing={5}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant='body2' color='textSecondary' component='p'>
                                <br></br>
                            Waiting.....
                                <br></br>


                            </Typography>
                        </CardContent>
                    </CardActionArea><br />
                </Card>
            </Grid>
        )
    }


}

export default GetCode;