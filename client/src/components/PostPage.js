import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import noImage from '../img/no-image.png';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { AuthContext } from '../firebase/Auth';

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

    const GetPost = () => {
        const classes = useStyles();
        const [loading, setLoading] = useState(true);
        const [postData, setPostData] = useState(undefined);
        const { currentUser } = useContext(AuthContext);


        useEffect(() => {
            async function fetchData() {
                try {
                    //getting data for user profile
                    const post = await axios.get("http://localhost:5000/post/" + postId);
                    setPostData(post.data.data);
                    const queue = await axios.post("http://localhost:5000/queue/join", {
                        userId: currentUser.id,
                        postId: postId
                    })
                    setLoading(false);
                } catch (e) {
                    console.log(e);
                }
            }
            fetchData();
        }, []);


        if (loading) {
            return (
                <div>
                    <h2>Loading....</h2>
                </div>
            );
        }
        else {
            return (
                //This only appears on Page 1 
                <div>
                    <br />
                    <br />
                    {/* <Button> <Link to={"/sell"}> Selling </Link> </Button> */}
                    {/* {DoPaginationf} */}

                    <Card className={classes.card} variant='outlined'>
                        <CardActionArea>

                            {/* <CardMedia
                                className={classes.media}
                                component='img'
                                image={show.image && show.image.original ? show.image.original : noImage}
                                title='show image'
                            /> */}

                            <CardContent>

                                <Typography variant='body2' color='textSecondary' component='p'>
                                    <br></br>
                                        Description: {postData.description}
                                    <br></br>
                                        Ticket Price: {postData.ticketPrice}
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

                </div>
            );
        }
    };
    function GetCode() {

        const { currentUser } = useContext(AuthContext);
        const [islandCode, setIslandCode] = useState(undefined);
        const classes = useStyles();
        useEffect(() => {
            const getCode = async () => {
                // const userInfo = await axios.get(`http://localhost:5000/user/email/${currentUser.email}`);
                try {
                    const queue = await axios.post('http://localhost:5000/queue/find', {
                        userId: currentUser.id,
                        postId: postId
                    })
                    const code = await axios.post('http://localhost:5000/queue/getCode', {
                        postId: postId,
                        queueId: queue.data.data._id
                    })
                    setIslandCode(code.data.data);
                } catch (e) {
                    console.log(e.response)
                }
            }
            getCode();

        }, []);
        let card = null;

        islandCode && (card =
            <Card className={classes.card} variant='outlined'>
                <CardActionArea>
                    {/* <CardMedia
                        className={classes.media}
                        component='img'
                        image={noImage}
                        title='show image'
                    /> */}
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            <br></br>
                            Code: {islandCode}
                            <br></br>
                            Island Code: ABCD
                            <br></br>
                            Ingame Name: GAMER1
                            <br></br>
                            Nintendo ID: 1234567

                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );

        return (
            <Grid container className={classes.grid} spacing={5}>
                {card}
            </Grid>

        );
    };
    return (
        <div>
            <GetPost />
            <GetCode />
            <br />
            <Link className='showlink' to='/'>Homepage</Link>

        </div>
    );
}

export default PostPage