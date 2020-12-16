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

function JoinQueue(props){
    const { currentUser } = useContext(AuthContext);
    const postId = props.location.postId;
    const userId = currentUser.user

}

export default JoinQueue