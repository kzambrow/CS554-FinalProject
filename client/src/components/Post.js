import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
//import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
//import SocialSignIn from './SocialSignIn';
const axios = require('axios');

function Post() {
    const { currentUser } = useContext(AuthContext);
    var button;

    const handlePost = async (e) => {
        e.preventDefault();
        const { price, ticketPrice, islandCode, sell, description, endTime } = e.target.elements;


        try {
            console.log(button);
            await axios.post('http://localhost:5000/Post/addPost', {
                creator: currentUser.id,
                sell: button,
                price: price.value,
                ticketPrice: ticketPrice.value,
                islandCode: islandCode.value,
                description: description.value,
                endTime: endTime.value
            })

        } catch (error) {
            console.log(error.response.data)
            alert(error);
        }
    };

    if (!currentUser) {
        return <Redirect to="/signup" />;
    }

    const sellButton = async () => {
        button = true;
        console.log(button);
    }

    const buyButton = async () => {
        button = false;
        console.log(button);
    }

    return (
        <div className="post-main" align="center">
            <p className="post" align="center">Post</p>

            <form className="form2" onSubmit={handlePost}>
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="number"
                        align="center"
                        placeholder="Price"
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
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="Ticket Price"
                        name="ticketPrice"
                        id="ticketPrice"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="Island Code"
                        name="islandCode"
                        id="islandCode"
                        required
                    />
                </div>
                <div className="form-group">
                </div>
                <div id="sell" class="dropdown" name="sell" align="center" >
                    <div className="radio">
                        <label>
                            <input name="test" type="radio" onChange={sellButton} />Selling</label>
                        <label>
                            <input name="test" type="radio" onChange={buyButton} />Buying</label>
                    </div>
                </div>
                <br></br>
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="Description"
                        name="description"
                        id="description"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="date"
                        align="center"
                        placeholder="End Time"
                        name="endTime"
                        id="endTime"
                        required
                    />
                </div>
                <button className="submit" id="submitButton" name="submitButton" type="submit" align="center">
                    Post
        </button>
            </form>
            <br />
            
        </div>

    );
}

export default Post;
