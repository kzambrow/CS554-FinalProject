import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../img/no-image.png';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import '../App.css';
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
const Landing = (props) => {
	const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [showsData, setShowsData] = useState(undefined);
	const [visible, setVisible] = useState(4);
	const [userData, setUserData] = useState(undefined);


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
		setVisible((prevValue) => prevValue + 4);
	}

	const buildCard = (show) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
				<Card className={classes.card} variant='outlined'>


					<CardMedia
						className={classes.media}
						component='img'
						image={show.image && show.image.original ? show.image.original : noImage}
						title='show image'
					/>

					<CardContent>

						<Typography variant='body2' color='textSecondary' component='p'>
							Type: Buying
									<br></br>
									Posted by: {show.creator}
							<br></br>
									Price: {show.price}
							<br></br>
									Ticket Price: {show.ticketPrice}
							<br></br>
									Description: {show.description ? <p>{show.description}</p> : "None available"}
							<br></br>
									datePosted: {show.createdAt}
							<br></br>
									expirationTime: {show.endTime}<br />
						</Typography>
					</CardContent>

					{/* <Button><Link to={'/joinqueue'} postId={show.id}></Link></Button> */}
					<Button><Link to={`/posts/${show._id}`} userInfo={userData}> More Info</Link></Button>
				</Card>
			</Grid>
		);
	};

	const UserInfo = () => {
		const { currentUser } = useContext(AuthContext);
		const classes = useStyles();
		useEffect(() => {
			async function getData() {
				if (currentUser) {
					const userInfo = await axios.get(`http://localhost:5000/user/email/${currentUser.email}`);
					//console.log(userInfo); 
					setUserData(userInfo);
					console.log(userInfo);
				}
			};
			getData();
		}, []);
	}
	UserInfo();



	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	}
	else {
		card =
			showsData &&
			showsData.data.slice(0, visible).map((show) => {
				return buildCard(show);
			});
		return (
			<div>
				<br />
				<br />
				<Button> <Link to={"/sell"} userInfo={userData}> Selling </Link> </Button>

				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
				<Button style={{ display: visible >= showsData.data.length ? 'none' : 'block' }} onClick={showMore}>Load More</Button>
			</div>
		);
	}
};

export default Landing;