import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
//import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
//import SocialSignIn from './SocialSignIn';
const axios = require('axios');

function Post() {
    const { currentUser } = useContext(AuthContext);
    //const [pwMatch, setPwMatch] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();
        const { price, userId, ticketPrice, islandCode, sellTag, description, endTime } = e.target.elements;


        try {
            await axios.post('http://localhost:5000/Post/addPost', {
                price: price.value,
                userId: userId.value,
                ticketPrice: ticketPrice.value,
                islandCode: islandCode.value,
                sellTag: sellTag.value,
                description: description.value,
                endTime: endTime.value
            })

        } catch (error) {
            alert(error);
        }
    };

    if (!currentUser) {
        return <Redirect to="/signup" />;
    }

    return (
        <div className="post-main">
            <p className="post" align="center">Post</p>

            <form className="form2" onSubmit={handlePost}>
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="Price"
                        name="price"
                        id="price"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="UserID"
                        name="userId"
                        id="userId"
                        required
                    />
                </div>
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
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="Sell Tag"
                        name="sellTag"
                        id="sellTag"
                        required
                    />
                </div>
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
                        type="text"
                        align="center"
                        placeholder="End Time"
                        name="endTime"
                        id="endTime"
                        required
                    />
                </div>
                <button className="submit" id="submitButton" name="submitButton" type="submit">
                    Post
        </button>
            </form>
            <br />
        </div>
    );
}

export default Post;
