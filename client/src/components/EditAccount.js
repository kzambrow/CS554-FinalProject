import React, { useContext } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
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
        try {
            await axios.post('http://localhost:5000/user/editUser', {
                id: currentUser.id,
                displayName: user,
                inGameName: inGame,
                islandName: island
            })

        } catch (error) {
            alert(error);
        }
    };

    if (!currentUser) {
        return <Redirect to="/signup" />;
    }

    return (
        <div className="signin-main">
            <nav className="navigation">
                <ul>
                    <li>
                        <NavLink exact to="/changePassword" activeClassName="active" className="logo">
                            Change your Password
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div align="center">
            <UploadProfilePic />
            </div>
            <p className="sign" align="center">Edit Account Info</p>
            <form className="form2" onSubmit={handleEdit}>
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="Username"
                        name="Username"
                        id="Username"
                    />
                </div>
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="In Game Name"
                        name="inGameName"
                        id="inGameName"
                    />
                </div>
                <div className="form-group">
                    <input
                        className="un form-control"
                        type="text"
                        align="center"
                        placeholder="Island Name"
                        name="islandName"
                        id="islandName"
                    />
                </div>

                <button className="submit" id="submitButton" name="submitButton" type="submit">
                    Save Info
        </button>
            </form>
            <br />
        </div>
    );
}

export default EditAccount;
