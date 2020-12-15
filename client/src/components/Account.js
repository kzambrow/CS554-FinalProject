import React, { useEffect, useState, useContext } from 'react';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import UploadProfilePic from './UploadProfilePic';
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

function Account(props){
    const ProfilePosts = (props) => {
        const regex = /(<([^>]+)>)/gi;
        const classes = useStyles();
        const [ loading, setLoading ] = useState(true);
        const [ buying, setBuying ] = useState(true);
        //const [ searchData, setSearchData ] = useState(undefined);
        const [ profileData, setProfileData ] = useState(undefined);
        const [ searchTerm, setSearchTerm ] = useState('');

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
    
        //set Data for the previous Page
        // const setPrevPage = () => {
        //     if (pageData.page >= 1) {
        //       const prevData = {
        //         next: pageData.page,
        //         previous: pageData.page - 2,
        //         page: pageData.page - 1,
                
        //       };
        //       setPageData(prevData);
        //     }
        //   };
        
        //   // Set Data for next Page
        //   const setNextPage = () => {
        //       const nextData = {
        //         previous: pageData.page,
        //         next: pageData.page + 2,
        //         page: pageData.page + 1,
                
        //       };
        //       setPageData(nextData);
        //   };
    
        //   const DoPagination = (
        //     <div>
        //     <Button>
        //     <Link
        //       className="btn btn-dark"
        //       to={"/page/" + pageData.previous}
        //       onClick={setPrevPage}
        //     >
        //       Previous
        //     </Link>
        //     </Button>
            
        //     <Button>
        //     <Link
        //       className="btn btn-dark"
        //       to={"/page/" + pageData.next}
        //       onClick={setNextPage}
        //     >
        //       Next
        //     </Link>
        //     </Button>
        //     </div>
        //   );
    
        //   const DoPaginationf = (
        //     <Button>
        //     <Link
        //       className="btn btn-dark"
        //       to={"/page/" + pageData.next}
        //       onClick={setNextPage}
        //     >
        //       Next
        //     </Link>
        //     </Button>
        //   );
        
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
        if (loading) {
            return (
                <div>
                    <h2>Loading....</h2>
                </div>
            );
        // } else if(pageData.page >= 1) {
        //     return (
        //         <div>
        //             <br />
        //             <br />
        //             <Button> <Link to =  {"/sell" }> Selling </Link> </Button>
        //             {DoPagination}
        //             <Grid container className={classes.grid} spacing={5}>
        //                 {card}
        //             </Grid>
        //         </div>
        //     );
        }
        else{
            return (
                //This only appears on Page 1 
                <div>
                    <br />
                    <br />
                    <Button> <Link to =  {"/sell" }> Selling </Link> </Button>
                    {/* {DoPaginationf} */}
                    <Grid container className={classes.grid} spacing={5}>
                        {card}
                    </Grid>
                </div>
            );
        }
    };
    function AccountInfo(){
        const {currentUser}= useContext(AuthContext);
        const [userData, setUserData] = useState(undefined); 
        const classes = useStyles();
        async function getData(){
            const userInfo = await axios.get(`http://localhost:5000/user/email/${currentUser.email}`); 
            console.log(userInfo); 
            setUserData(userInfo); 
            //console.log(userInfo);
        }
        getData(); 
        console.log("userData is ", userData);
        let card = null; 
        
        userData && (card = 
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

                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
        
        return(
            <Grid container className={classes.grid} spacing={5}>
                {card}
            </Grid>
        );
    };
    return(
        <div>
            <h2>Account Page</h2>
            <ProfilePosts />
            <ChangePassword />
            <SignOutButton />
            <AccountInfo />
            <UploadProfilePic />
        </div>
    );
}

export default Account