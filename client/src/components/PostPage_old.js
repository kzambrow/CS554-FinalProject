import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../img/no-image.png';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';
import '../App.css';
import { AuthContext } from '../firebase/Auth';



const useStyles = makeStyles({
	card: {
		maxWidth: 550,
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



const PostPage = (props) => {
	const [postId, setPostId] = useState(props.match.params.id);
	const [userInfo, setUserInfo] = useState(undefined);
	const [showData, setShowData] = useState(undefined);
	const [issue, setIssue] = useState(false);
	const classes = useStyles();
	const { currentUser } = useContext(AuthContext);
	console.log(currentUser);


	const GetCode = () => {
		const [islandCode, setIslandCode] = useState(undefined);
		useEffect(() => {
			const getCode = async () => {
				const code = await axios({
					method: 'get',
					url: 'http://localhost:5000/queue/getCode',
					postId: postId,
					userId: userInfo._id
				})
				setIslandCode(code.data.data);
			}
			getCode();
		}, [])
		if (islandCode) {
			return (
				<div>
					{islandCode}
				</div>
			)
		} else {
			return <div>Still waiting</div>
		}
	}


	const GetPost = (postId) => {
		const [loading, setLoading] = useState(true);

		useEffect(
			() => {
				console.log("useEffect fired")
				async function fetchData() {
					try {
						const { data } = await axios.get("http://localhost:5000/post/" + props.match.params.id);
						console.log(data);
						let show = data.data;
						setShowData(show);
						const userInfo = await axios.get(`http://localhost:5000/user/email/${currentUser.email}`);
						setUserInfo(userInfo.data.data);
						const queueInfo = await axios({
							method: 'post',
							url: 'http://localhost:5000/queue/join',
							postId: postId,
							userId: userInfo._id
						})
						console.log(queueInfo)
						setLoading(false);
					} catch (e) {
						setIssue(true);
					}
				}
				fetchData();
			},
			[]
		);
		if (loading) {
			return (
				<div>
					<h2>Loading....</h2>
				</div>
			);
		} else {
			return (
				<div>
					<Card className={classes.card} variant='outlined'>
						<CardMedia
							className={classes.media}
							component='img'
							image={showData.image && showData.image.original ? showData.image.original : noImage}
							title='show image'
						/>

						<CardContent>

							<Typography variant='body2' color='textSecondary' component='p'>
								Type: Buying
                        <br></br>
                        Posted by: {showData.creator}
								<br></br>
                        Price: {showData.price}
								<br></br>
                        Ticket Price: {showData.ticketPrice}
								<br></br>
                        Rating: {showData.rating}
								<br></br>
                        datePosted: {showData.createdAt}
								<br></br>
                        expirationTime: {showData.endTime}
								<br></br>
                        Comments: {showData.comments}
							</Typography>
						</CardContent>

						<Link className='showlink' to='/'>Homepage</Link>

					</Card>

				</div>
			)
		}

	}
	if (issue) {
		return (<div>
			<h1>404: Post does not exist!</h1>
			<br />
			<Link to='/'>Back Home Page</Link>
		</div>)
	}
	return (
		<div>
			<GetPost postId={postId} />
			{/* <GetCode userId={userInfo.id} postId={postId} /> */}
		</div>

	)

}

export default PostPage;