import React, { useEffect, useState, useContext } from 'react';
import noImage from '../img/no-image.png';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
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

function CurrentUserAccount(props){

    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [ loading, setLoading ] = useState(true);
    const [ buying, setBuying ] = useState(true);
    const [profileData, setProfileData ] = useState(undefined);
    const [authUser, setAuthUser] = useState(props.user); 
    const [userData, setUserData] = useState(undefined); 


    useEffect(() => {
        async function fetchData() {
            try {
                //getting data for user profile
                const { data } = await axios.get('http://localhost:5000/post/buy');
                setProfileData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);
    
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
        profileData &&
        profileData.data.map((show) => {
            return buildCard(show);
    });

    useEffect(() => {
        async function getData(){
            const userInfo = await axios.get(`http://localhost:5000/user/email/${authUser.email}`); 
            //console.log(userInfo); 
            setUserData(userInfo); 
            console.log(userInfo); 
        };
        getData();
    }, []);
    let userCard = null; 
        
         userData && (userCard = 
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
                            Username: {userData.data.data.displayName}
                            <br></br>
                            Island Code: ABCD 
                            <br></br>
                            Ingame Name: GAMER1
                            <br></br>
                            Nintendo ID: 1234567 
                            <br></br>
                            redirect to change password
                            <br></br>
                            redirect to Edit profile
                            <br></br>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
    );

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

export default CurrentUserAccount; 