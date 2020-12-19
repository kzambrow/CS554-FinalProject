import React, { useEffect, useState, useContext } from 'react';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import UploadProfilePic from './UploadProfilePic';
import noImage from '../img/no-image.png';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { AuthContext } from '../firebase/Auth';
import CurrentUserAccount from './CurrentUserAccount';


const axios = require('axios');

const useStyles = makeStyles({
	card: {
		maxWidth: 250,
		height: 'auto',
		marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100,
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
//Add nintendo id attribute to user 
//fix page changing issue on accounts

function Account(props){
    //console.log(props.match.params.id); 
    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading ] = useState(true);
    const [profilePost, setProfilePost ] = useState(undefined); 
    const [userData, setUserData] = useState(undefined); 
    const [userId, setUserId] = useState(props.match.params.id); 
    const [multerImage, setMulterImage] = useState("/imgs/turnip.png");

    const { currentUser } = useContext(AuthContext);
    //console.log(currentUser.id); 

    //Get all the posts posted by the user
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`http://localhost:5000/post/byUser/${userId}`);
                setProfilePost(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [userId]);
    
    const buildCard = (show) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                    <CardMedia
								className={classes.media}
								component='img'
								image='/imgs/turnip.png'
								alt = 'No image'
								title='show image'
							/>
                            <CardContent>
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    Type: {show.sell ? "Selling": "Buying"}
                                    <br></br>
                                    Price: {show.price}
                                    <br></br>
                                    Ticket Price: {show.ticketPrice}
                                    <br></br>
                                    Rating: {show.rating}
                                    <br></br>
                                    datePosted: {show.Date}
                                    <br></br>
                                    expirationTime: {show.endTime}
                                </Typography>
                            </CardContent>
                        
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };
    
    console.log('profilePost is ', profilePost); 
    let card = null;
    card =
        profilePost && profilePost.data &&(
        buildCard(profilePost.data)
    );

    //GET User Info to be displayed on the side
    useEffect(() => {
        async function getData(){
            const userInfo = await axios.get(`http://localhost:5000/user/${userId}`); 
            //console.log(userInfo); 
            setUserData(userInfo);  
        };
        getData();
        // try{
        // let newimageSource = userData.imageData;
        // let finalimageSource = newimageSource.replaceAll("\\", "/").replace("../client/public", "");
        // if (finalimageSource.includes(".png")) {
        //     finalimageSource = finalimageSource.replace(".png", "_medium.png");
        // }
        // if (finalimageSource.includes(".jpeg")) {
        //     finalimageSource = finalimageSource.replace(".jpeg", "_medium.jpeg");
        // }
        // if (finalimageSource.includes(".jpg")) {
        //     finalimageSource = finalimageSource.replace(".jpg", "_medium.jpg");
        // }
        // setMulterImage(finalimageSource);
        // console.log('multer image is ' + multerImage);
        // } catch (e) {
        //     setMulterImage("/imgs/turnip.png");
        //     console.log(e);
        // }

            setLoading(false);
    }, [userId]);

    useEffect(() => {
        async function getImage() {
            
            try {
                const profile = await axios.get(`http://localhost:5000/images/${userId}`); 
                let newimageSource = profile.data.data.imageData;
                let finalimageSource = newimageSource.replaceAll("\\", "/").replace("../client/public", "");
                if (finalimageSource.includes(".png")) {
                    finalimageSource = finalimageSource.replace(".png", "_medium.png");
                }
                if (finalimageSource.includes(".jpeg")) {
                    finalimageSource = finalimageSource.replace(".jpeg", "_medium.jpeg");
                }
                if (finalimageSource.includes(".jpg")) {
                    finalimageSource = finalimageSource.replace(".jpg", "_medium.jpg");
                }
                setMulterImage(finalimageSource);
                console.log('multer image is ' + multerImage);
            } catch (e) {
                setMulterImage("/imgs/turnip.png");
                console.log(e);
            }
        }
        getImage();
    }, [userId]);


    //console.log('userData is, ' + userData);
    //console.log('userData email is, ' + userData.data.data.email);

    let userCard = null; 

        //non authenticated view
         userData && (userCard = 

            <Card className={classes.card} variant='outlined'>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component='img'
                        image={multerImage}
                        title='show image'
                    />
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            <br></br>
                            Username: {userData.data.data.displayName}
                            <br></br>
                            Island Code: {userData.data.data.islandName} 
                            <br></br>
                            Ingame Name: {userData.data.data.inGameName}
                            <br></br>
                            Nintendo ID: 1234567 
                            <br></br>
                            Stars: {userData.data.data.star}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
        
        //authenticated view 
        userData && multerImage && currentUser && currentUser.id === userId && (userCard = 
            <Card className={classes.card} variant='outlined'>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component='img'
                        image={multerImage}
                        title='show image'
                    />
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' component='p'>
                        <br></br>
                            Username: {userData.data.data.displayName}
                            <br></br>
                            Island Code: {userData.data.data.islandName} 
                            <br></br>
                            Ingame Name: {userData.data.data.inGameName}
                            <br></br>
                            Nintendo ID: 1234567 
                            <br></br>
                            Email: {currentUser.email}
                            <br></br>
                            Stars: {userData.data.data.star}
                            <br></br>
                            <br></br>
                            <Link to = '/editaccount'> Edit Profile</Link>
                            <br></br>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
    
    )
    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    }
    else{
        return (
            <div>
                <br />
                <br />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
                <div>
                    {userCard}
                </div>
            </div>
        );
    }
}

export default Account; 