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

//display different information for authenticated vs non authenticated

function Account(props){
    console.log(props.match.params.id); 
    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading ] = useState(true);
    const [profilePost, setProfilePost ] = useState(undefined); 
    const [userData, setUserData] = useState(undefined); 
    const [userId, setUserId] = useState(props.match.params.id); 
    const [multerImage, setMulterImage] = useState("/imgs/turnip.png");

    const { currentUser } = useContext(AuthContext);
    console.log(currentUser.id); 
    useEffect(() => {
        async function fetchData() {
            try {
                //getting data for user profile
                const { data } = await axios.get(`http://localhost:5000/byUser/${userId}`);
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
                                image={show.image && show.image.original ? show.image.original : noImage}
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
    
    let card = null;
    card =
        profilePost &&
        profilePost.data.map((show) => {
            return buildCard(show);
    });

    //GET User Info to be displayed on the side
    useEffect(() => {
        async function getData(){
            const userInfo = await axios.get(`http://localhost:5000/user/${userId}`); 
            //console.log(userInfo); 
            setUserData(userInfo);
            setLoading(false);  
            console.log(userInfo);
        };
        getData();
        async function getImage() {
            
            try {
                const profile = await axios.get(`http://localhost:5000/images/${userData.data.data.email}`); 
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
                console.log(multerImage);
            } catch (e) {
                setMulterImage("/imgs/turnip.png");
                console.log(e);
            }
        }
        getImage();
    }, [userId]);

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
                            Island Code: ABCD 
                            <br></br>
                            Ingame Name: GAMER1
                            <br></br>
                            Nintendo ID: 1234567 
                            <br></br>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
        
        //authenticated view 
        userData && currentUser && currentUser.id == userId && (userCard = 
            <Card className={classes.card} variant='outlined'>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component='img'
                        image={noImage}
                        title='show image'
                    />
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            <br></br>
                            Username: {currentUser.displayName}
                            <br></br>
                            Island Code: ABCD 
                            <br></br>
                            Ingame Name: GAMER1
                            <br></br>
                            Nintendo ID: 1234567 
                            <br></br>
                            Email: {currentUser.email}
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
                <Button> <Link to =  {"/sell" }> Selling </Link> </Button>
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