import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Route, Redirect} from 'react-router'; 
import noImage from '../img/no-image.png';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import Account from './Account'; 
import '../App.css';

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
const Landing = (props) => {
	const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
	const [ loading, setLoading ] = useState(true);
	const [ showsData, setShowsData ] = useState(undefined);
	const [visible, setVisible] = useState(6);
	//const [creatorID, setCreatorID] = useState(undefined); 
	//const [user, setUser] = useState(undefined); 

	let card = null;

	useEffect(() => {
		async function fetchData() {
			try {
				//getting data for main page
				const { data } = await axios.get('http://localhost:5000/post/buy');
				setShowsData(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);
	
	const showMore = () => {
		setVisible((prevValue) => prevValue + 6);
	}
	
	// useEffect(() => {
	// 	console.log('in setUser useEffect'); 
	// 		async function fetchUser() {
	// 			try {
	// 				const user = await axios.get(`http://localhost:5000/user/${creatorID}`);
	// 				setUser(user);
	// 				setLoading(false);
	// 				console.log('in fetchUser, user is ', user); 
	// 			} catch (e) {
	// 				console.log(e);
	// 			}
	// 		}
	// 		fetchUser();
	// }, [creatorID]);

	//console.log('out of setUser useEffect , creator is ', creatorID);
	
	const buildCard = (show) => { 
		// setCreatorID(show.creator);
		// console.log('creator is ,' , creatorID); 

		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
				<Card className={classes.card} variant='outlined'>
							<CardMedia
								className={classes.media}
								component='img'
								image='/imgs/turnip.png'
								alt = {noImage}
								title='show image'
							/>

							<CardContent>
		
								<Typography variant='body2' color='textSecondary' component='p'>
									Type: Buying
									<br></br>
									Posted by: 
									{/* <Link to ={{pathname: '/account',
										state:{
											user:user
										}
									}}>a</Link>	
																	 */}
									<Link to = {'/account/' + show.creator}> {show.displayName} </Link>
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
				</Card>
			</Grid>
		);
	};
	

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} 
	else{
		card =
		showsData &&
		showsData.data.slice(0,visible).map((show) => {
			return buildCard(show);
		});
		return (
			<div>
				<br />
				<br />
				<Button> <Link to =  {"/sell" }> Selling </Link> </Button>
				<Grid container className={classes.grid} spacing={5}>
				{card}
				</Grid>
			<button onClick = {showMore}>Load More</button>
			</div>
		);
	}
};

export default Landing;