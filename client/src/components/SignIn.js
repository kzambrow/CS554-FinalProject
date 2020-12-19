import React, { useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset
} from '../firebase/FirebaseFunctions';

function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div >
      {/* <h1>Log in</h1> */}
      {/* <p className="sign" align="cneter">Log in</p>
      <form className="log-in form1" onSubmit={handleLogin}>
        <div className="form-group log-in-form" aligh="center">
          <label>
            Email:
            <input
              className="form-control"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <button type="submit" aligh="center">Log in</button>

        <button className="forgotPassword" onClick={passwordReset}>
          Forgot Password
        </button>
      </form> */}
      <div className="signin-main">
        <p className="sign" align="center">Sign In</p>
        <form className="form1" onSubmit={handleLogin}>
          <input
            className="un form-control"
            type="email"
            align="center"
            placeholder="Email"
            name="email"
            id="email"
            required
          />
          <input 
          className="pass form-control" 
          type="password" 
          align="center" 
          placeholder="Password" 
          name="password"
          required
          />
          <button className="submit" align="center">Sign In</button>
          <br/>
          <br/>
          <button className="forgot" onClick={passwordReset}>
          Forgot Password
        </button>
        </form>
        <br />
        <SocialSignIn />
      </div>
      <br />
    </div>
  );
}

export default SignIn;
