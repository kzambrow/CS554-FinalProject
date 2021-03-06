import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import turnip from '../img/turnip.png'
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
const Landings = () => {
	
	const classes = useStyles();
 	const [ loading, setLoading ] = useState(true);
	const [ showsData, setShowsData ] = useState(undefined);
	const [visible, setVisible] = useState(4);
	
	let card = null;

	useEffect(() => {
		console.log('on load useeffect');
		async function fetchData() {
			try {
				//Assuming this is the address of the database (Will change if different)
				const { data } = await axios.get('http://localhost:5000/post/sell');
				setShowsData(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);



	
	const showMore = () => {
		setVisible((prevValue) => prevValue + 4);
	}
	

	const buildCard = (show) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
				<Card className={classes.card} variant='outlined'>
					

							<CardMedia
								className={classes.media}
								component='img'
								image={turnip}
								alt = 'No image'
								title='show image'
							/>

							<CardContent>

								<Typography variant='body2' color='textSecondary' component='p'>
									Type: Selling
									<br></br> 
									Posted by: 
									<Link to = {'/account/' + show.creator}> {show.displayName} </Link>
									<br></br>
									Price: {show.price}
									<br></br>
									Ticket Price: {show.ticketPrice}
									<br></br>
									Description: {show.description}
									<br></br>
									datePosted: {show.createdAt}
									<br></br>
									expirationTime: {show.endTime}
								</Typography>
							</CardContent>

							<Link  style = {{left: '25%'}} to = {`/posts/${show._id}`}> More Info</Link>
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
	} else{
		card =
		showsData &&
		showsData.data.slice(0,visible).map((show) => {
			return buildCard(show);
		});
		return (
			<div>
				<br />
				<br />
				 <Link  style = {{ position: 'absolute', left: '50%'}} to =  {"/" }> View Buying </Link>
				<br/><br/>
				
				<Grid container className={classes.grid} spacing={5}>
				{card}
				</Grid>
				<Button style = {{display: visible >= showsData.data.length? 'none' : 'block'}} onClick = {showMore}>Load More</Button>
			</div>
		);
	}
};

export default Landings;