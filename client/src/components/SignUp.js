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
    return <Redirect to="/home" />;
  }

  return (
    <div className="signin-main">
      <p className="sign" align="center">Sign Up</p>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <form className="form2" onSubmit={handleSignUp}>
        <div className="form-group">
          <input
            className="un form-control"
            type="text"
            align="center"
            placeholder="Username"
            name="Username"
            id="Username"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="un form-control"
            type="email"
            align="center"
            placeholder="Email"
            name="email"
            id="email"
            required
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <input
            className="pass form-control"
            type="password"
            align="center"
            placeholder="Password"
            name="passwordOne"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="pass form-control"
            type="password"
            align="center"
            placeholder="Confirm Password"
            name="passwordTwo"
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
