import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';

import '../App.css';
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
	const [ searchData, setSearchData ] = useState(undefined);
	const [ showsData, setShowsData ] = useState(undefined);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [pageData, setPageData] = useState({
		page: parseInt(props.match.params.pagenum),
		next: 1,
		previous: null
	  });
	let card = null;

	useEffect(() => {
		console.log('on load useeffect');
		async function fetchData() {
			try {
				//Changing this to load based off page number given
				//Change to get from database
				const { data } = await axios.get(` http://api.tvmaze.com/shows?page=${props.match.params.pagenum}`);
				setShowsData(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [props.match.params.pagenum]);

	useEffect(
		() => {
			console.log('search useEffect fired');
			async function fetchData() {
				try {
					console.log(`in fetch searchTerm: ${searchTerm}`);
					const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + searchTerm);
					setSearchData(data);
					setLoading(false);
				} catch (e) {
					console.log(e);
				}
			}
			if (searchTerm) {
				fetchData();
			}
		},
		[ searchTerm ]
	);

	//set Data for the previous Page
	
	const setPrevPage = () => {
		if (pageData.page >= 1) {
		  const prevData = {
			next: pageData.page,
			previous: pageData.page - 2,
			page: pageData.page - 1,
			
		  };
		  setPageData(prevData);
		}
	  };
	
	  // Set Data for next Page
	  const setNextPage = () => {
		  const nextData = {
			previous: pageData.page,
			next: pageData.page + 2,
			page: pageData.page + 1,
			
		  };
		  setPageData(nextData);
	  };

	  const DoPagination = (
		<div>
		<Button>
        <Link
          className="btn btn-dark"
          to={"/shows/page/" + pageData.previous}
          onClick={setPrevPage}
        >
          Previous
        </Link>
		</Button>
		
		<Button>
        <Link
          className="btn btn-dark"
          to={"/shows/page/" + pageData.next}
          onClick={setNextPage}
        >
          Next
        </Link>
		</Button>
		</div>
	  );

	  const DoPaginationf = (
		<Button>
        <Link
          className="btn btn-dark"
          to={"/shows/page/" + pageData.next}
          onClick={setNextPage}
        >
          Next
        </Link>
		</Button>
	  );
	const searchValue = async (value) => {
		setSearchTerm(value);
	};
	const buildCard = (show) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
				<Card className={classes.card} variant='outlined'>
					<CardActionArea>
						<Link to={`/shows/${show.id}`}>
							<CardMedia
								className={classes.media}
								component='img'
								image={show.image && show.image.original ? show.image.original : noImage}
								title='show image'
							/>

							<CardContent>
		
								<Typography variant='body2' color='textSecondary' component='p'>
									
									Price: {show.price}
									Ticket Price: {show.ticketPrice}
									Rating: {show.rating}
									datePosted: {show.Date}
									expirationTime: {show.ExpirationTime}
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	if (searchTerm) {
		card =
			searchData &&
			searchData.map((shows) => {
				let { show } = shows;
				return buildCard(show);
			});
	} else {
		card =
			showsData &&
			showsData.map((show) => {
				return buildCard(show);
			});
	}

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else if(pageData.page >= 1) {
		return (
			<div>
				<SearchShows searchValue={searchValue} />
				<br />
				<br />
		
				{DoPagination}
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}
	else{
		return (
			//This only appears on Page 1 
			<div>
				<SearchShows searchValue={searchValue} />
				<br />
				<br />
		
				{DoPaginationf}
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}
};

export default Landing;