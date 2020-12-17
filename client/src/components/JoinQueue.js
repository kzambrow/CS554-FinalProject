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

function JoinQueue(props) {
    const { currentUser } = useContext(AuthContext);
    const [userId, setUserId] = useState(undefined);
    const [postId, setPostId] = useState(props.location.postId);
    const [postInfo, setPostInfo] = useState(undefined);

    const GetUser = () => {
        useEffect(() => {
            async function getData() {
                const userInfo = await axios.get(`http://localhost:5000/user/email/${currentUser.email}`);
                //console.log(userInfo); 
                setUserId(userInfo.data.data._id);
                console.log(userInfo.data.data._id);
            };
            getData();
        }, []);
        return(<div></div>);
    }
    function PostInfo() {
        useEffect(() => {
            async function getData() {
                const post = await axios.get(`http://localhost:5000/post/${postId}}`);
                setPostInfo(post);
                //console.log(userInfo); 
                // console.log(userInfo.data.data._id);
            };
            getData();
        }, []);

        if (postInfo && postInfo.success === true) {
            return (
                <div className="postInfo">
                    Type: Buying
                    <br></br>
					Posted by: {postInfo.data.creator}
                    <br></br>
					Price: {postInfo.data.price}
                    <br></br>
					Ticket Price: {postInfo.data.ticketPrice}
                    <br></br>
					Rating: {postInfo.data.rating}
                    <br></br>
					datePosted: {postInfo.data.createdAt}
                    <br></br>
					expirationTime: {postInfo.data.endTime}
                </div>
            )
        } else if (postInfo && postInfo.success === false) {
            return (
                <div>
                    Error<br />
                    {postInfo.error}
                </div>
            )
        }
    }
    return (
        <div>
            <GetUser />
            <PostInfo />
        </div>
    )
}

export default JoinQueue