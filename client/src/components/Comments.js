import React, {useContext, useState, useEffect, useRef} from "react";
import { AuthContext } from '../firebase/Auth';
import '../App.css';
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

const Comments = props => {
    const [comment, setComment] = useState("");
    const { currentUser } = useContext(AuthContext);
    const classes = useStyles();
    const postInfo = props.postInfo;


    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            userId: currentUser.id,
            name: currentUser.displayName,
            comment: comment,
        };
        axios.patch(`localhost:5000/posts/${postInfo.id}`,messageObject)
    }

    function handleChange(e) {
        setComment(e.target.value);
    }


    return(
        <div>
            <div>
            <form onSubmit={sendMessage}>
                <textarea className="chat-text-field" value={comment} onChange={handleChange} placeholder="Message..." />
                <button className="chat-submit">Send</button>
            </form>
            </div>
            <div>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        {postInfo.comments.map(item => (
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.displayName}
                                    {item.comment}
                                </Typography>
                            </CardContent>
                        ))}
                        
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )
};


export default Comments;