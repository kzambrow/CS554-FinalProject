import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';
// const axios = require('axios');

function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { Username, email, passwordOne, passwordTwo,islandName,inGameName } = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value,
        Username.value,
        islandName.value,
        inGameName.value
      );

    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signout-main">
      <p className="sign center">Sign Up</p>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <form className="form2" onSubmit={handleSignUp}>
        <div className="form-group">
          <label className="center" for="Username">Username</label>
          <input
            className="un form-control center"
            type="text"
            name="Username"
            id="Username"
            required
          />
        </div>
        <div className="form-group">
        <label className="center" for="email">Email</label>
          <input
            className="un form-control"
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        <div className="form-group">
        <label className="center" for="inGameName">In Game Name</label>
          <input
            className="un form-control"
            type="text"
            name="inGameName"
            id="inGameName"
            required
          />
        </div>
        <div className="form-group">
        <label className="center" for="islandName">Island Name</label>
          <input
            className="un form-control"
            type="text"
            name="islandName"
            id="islandName"
            required
          />
        </div>
        <div className="form-group">
        <label className="center" for="passwordOne">Password</label>
          <input
            className="pass form-control"
            type="password"
            name="passwordOne"
            id="passwordOne"
            required
          />
        </div>
        <div className="form-group">
        <label className="center" for="passwordTwo">Confirm Password</label>
          <input
            className="pass form-control"
            type="password"
            name="passwordTwo"
            id="passwordTwo"
            required
          />
        </div>

        <button className="submit" id="submitButton" name="submitButton" type="submit">
          Sign Up
        </button>
      </form>
      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignUp;
