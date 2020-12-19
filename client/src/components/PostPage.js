import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';

import { AuthContext } from '../firebase/Auth';
import GetWaitingInfo from './GetWaitingInfo';
import Comments from './Comments';
// import { Beforeunload } from 'react-beforeunload';

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


function PostPage(props) {
    const postId = props.match.params.id;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState(undefined);
    const [queueId, setQueueId] = useState(undefined);
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {

        const cleanup = () => {
            console.log('removing from queue!!!')
            axios.post('http://localhost:5000/queue/leave', { queueId: queueId })

        }
        window.addEventListener('beforeunload', cleanup);

        async function fetchData() {
            try {
                //getting data for user profile
                const post = await axios.get("http://localhost:5000/post/" + postId);
                setPostData(post.data.data);
                const queue = await axios.post("http://localhost:5000/queue/join", {
                    userId: currentUser.id,
                    postId: postId,
                    inGameName: currentUser.inGameName
                })
                setQueueId(queue.data.data._id);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        return () => {
            window.removeEventListener('beforeunload', cleanup);
        }
    }, []);
    if (!currentUser) {
        return <Redirect to="/signup" />;
    }


    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    }

    else {
        // function handleModalLeave(){
        //     axios.post('http://localhost:5000/queue/',{queueId: queueId});
        // }
        return (
            <div>
            <div>
                {/* <Beforeunload onBeforeunload={() => {
                    axios.post('http://localhost:5000/queue/leave', { queueId: queueId })

                }}> */}
                    <br />
                    <br />
                    {/* <Button> <Link to={"/sell"}> Selling </Link> </Button> */}
                    {/* {DoPaginationf} */}

                    <Card className={classes.card} variant='outlined'>
                        <CardActionArea>
                            <CardContent>

                                <Typography variant='body2' color='textSecondary' component='p'>
                                    <br></br>
                                        Description: {postData.description}
                                    <br></br>
                                        Ticket Price: {postData.ticketPrice}<br />
                                    <br />
                                    <Button onClick={async() => {
                                        await axios.post('http://localhost:5000/queue/leave', { queueId: queueId });
                                        
                                    }}><Link to= {"/"}>Leave Island</Link></Button>

                                    {/* <br></br>
                                        Rating: {show.rating}
                                    <br></br>
                                        datePosted: {show.Date}
                                    <br></br>
                                        expirationTime: {show.endTime} */}
                                </Typography>
                            </CardContent>

                        </CardActionArea>
                    </Card>
                    <br />
                    <GetWaitingInfo queueId={queueId} postId={postId} />
                    

                {/* </Beforeunload > */}
                
            </div>
            <br />
            <br />
            <br />
            <Comments postInfo={postData}/>
            </div>
        );
    }

}

export default PostPage