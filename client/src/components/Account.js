import React, { useEffect, useState } from 'react';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import noImage from '../img/no-image.png';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';

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

//todo add a profile picture option in sign up
//provide links to change password
//display user info
//ask about pagenum 
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
            profileData.map((show) => {
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

    return(
        <div>
            <h2>Account Page</h2>
            <ProfilePosts />
            <ChangePassword />
            <SignOutButton />
        </div>
    );
}

export default Account