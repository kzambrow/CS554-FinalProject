import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
//import SocialSignIn from './SocialSignIn';
const axios = require('axios');

function Post() {
    const { currentUser } = useContext(AuthContext);
    const [ posted, setPosted ] = useState(false);
    var button;

    const handlePost = async (e) => {
        e.preventDefault();
        const { price, ticketPrice, islandCode, sell, description, endTime } = e.target.elements;


        try {
            await axios.post('http://localhost:5000/Post/addPost', {
                creator: currentUser.id,
                sell: button,
                price: price.value,
                ticketPrice: ticketPrice.value,
                islandCode: islandCode.value,
                description: description.value,
                endTime: endTime.value
            })
            setPosted(true);
        } catch (error) {
            alert(error);
        }
    };

    if (!currentUser) {
        return <Redirect to="/signup" />;
    }

    if (posted) {
        return <Redirect to="/" />;
    }

    //const redir = async () => {
    //    return <Redirect to="/home" />;
    //}

    const sellButton = async () => {
        button = true;
    }

    const buyButton = async () => {
        button = false;
    }

    return (
        <div className="add-post ">
            <h1 className="post center">Post</h1>
            <br>
            </br>

            <form className="form2 center" onSubmit={handlePost}>
                <div className="form-group center">
                <label for="price">Price  <br></br></label>
                    <input
                        className="un form-control"
                        type="number"
                        name="price"
                        id="price"
                        required
                    />
                </div>
                {/* <div className="form-group">
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="Creator"
                        name="creator"
                        id="creator"
                        required
                    />
                </div> */}
                <div className="form-group center">
                <label for="ticketPrice">Ticket Price <br></br></label>
                    <input
                        className="un form-control"
                        type="text"
                       
                       
                        name="ticketPrice"
                        id="ticketPrice"
                        required
                    />
                </div>
                <div className="form-group center">
                    <label for = "islandCode"> Island Code <br></br></label>
                    <input
                        className="un form-control"
                        type="text"
                       
                        
                        name="islandCode"
                        id="islandCode"
                        required
                    />
                </div>
                <div className="form-group center">
                </div>
                <div id="sell" class="dropdown" >
                    <div className="radio center">
                        <label>
                            <input name="test" type="radio" onChange={sellButton} />Selling</label>
                        <label>
                            <input name="test" type="radio" onChange={buyButton} />Buying</label>
                    </div>
                </div>
                <br></br>
                <div className="form-group center">
                    <label for = "description">Description <br></br></label>
                    <input
                        className="un form-control"
                        type="text"
                        
                        
                        name="description"
                        id="description"
                        required
                    />
                </div>
                <div className="form-group center">
                    <label for = "endTime"> End Time:</label>
                    <input
                        className="un form-control"
                        type="datetime-local"
                    
                        name="endTime"
                        id="endTime"
                        required
                    />
                </div>
                <button className="submit center" id="submitButton" name="submitButton" type="submit" >
                    Post
                </button>
            </form>
            <br />
            
        </div>

    );
}

export default Post;
