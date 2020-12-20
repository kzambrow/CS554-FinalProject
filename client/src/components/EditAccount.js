import React, { useContext } from 'react';
import { Redirect, NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
//import SocialSignIn from './SocialSignIn';
import UploadProfilePic from './UploadProfilePic';
const axios = require('axios');

function EditAccount() {
    const { currentUser } = useContext(AuthContext);

    const handleEdit = async (e) => {
        //console.log(currentUser);
        e.preventDefault();
        const { Username, islandName, inGameName } = e.target.elements;
        let user = Username.value;
        let island = islandName.value;
        let inGame = inGameName.value;
        if (Username.value === "") {
            user = currentUser.displayName;
        }
        if (islandName.value === "") {
            island = currentUser.islandName;
        }
        if (inGameName.value === "") {
            inGame = currentUser.inGameName;
        }
        if (islandName.value === "" && currentUser.islandName === undefined) {
            island = "No Name";
        }
        if (inGameName.value === "" && currentUser.inGameName === undefined) {
            inGame = "No Name";
        }
        
        await axios.post('http://localhost:5000/user/editUser', {
            id: currentUser.id,
            displayName: user,
            inGameName: inGame,
            islandName: island
        })
        .then((data) => {
            if (data.data.success) {
                alert("Profile successfully updated!");
                //setMulterImage("/imgs/turnip.png");

            }
        })

        .catch ((error) => {
            alert(error);
        })
    };

    if (!currentUser) {
        return <Redirect to="/signup" />;
    }

    return (
        <div className="editAcc">
            <div class="center">
                    <UploadProfilePic />
            </div>
            <p className="sign center" >Edit Account Info</p>
            <br />
            <form className="form2" onSubmit={handleEdit}>

                <div className="form-group">
                    <label for="Username">
                    </label>
                    <input
                        className="un form-control center"
                        type="text"
                        
                        placeholder="Username"
                        name="Username"
                        id="Username"
                    />
                </div>
                <br />
                <div className="form-group">
                <label for="inGameName">
                </label>
                    <input
                        className="un form-control center"
                        type="text"
                        
                        placeholder="In Game Name"
                        name="inGameName"
                        id="inGameName"
                    />
                </div>
                <br />
                <div className="form-group">
                <label for="islandName">
                </label>
                    <input
                        className="un form-control center"
                        type="text"
                        
                        placeholder="Island Name"
                        name="islandName"
                        id="islandName"
                    />
                </div>
                <br />
                <button className="submit" id="submitButton" name="submitButton" type="submit">
                    Save Info
                </button>
            </form>
            <br />
            <Link exact to="/changePassword">
                    Change your Password
            </Link>
            <br />
        </div>
    );
}

export default EditAccount;
