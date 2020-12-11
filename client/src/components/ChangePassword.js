import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { doChangePassword } from '../firebase/FirebaseFunctions';
import '../App.css';

function ChangePassword() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  // console.log(currentUser);

  const submitForm = async (event) => {
    event.preventDefault();
    const {
      currentPassword,
      newPasswordOne,
      newPasswordTwo
    } = event.target.elements;

    if (newPasswordOne.value !== newPasswordTwo.value) {
      setPwMatch('New Passwords do not match, please try again');
      return false;
    }

    try {
      await doChangePassword(
        currentUser.email,
        currentPassword.value,
        newPasswordOne.value
      );
      alert('Password has been changed, you will now be logged out');
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser.providerData[0].providerId === 'password') {
    return (
      <div className="signin-main">
        {pwMatch && <h4 className="error">{pwMatch}</h4>}
        <p className="sign" align="center">Change Password</p>
        <form className = "form3" onSubmit={submitForm}>
          <div className="form-group">
          <input
            className="pass form-control"
            type="password"
            align="center"
            placeholder="Current Password"
            name="current-password"
            id="current-password"
            required
          />
          </div>

          <div className="form-group">
            <input
              className="pass form-control"
              type="password"
              align="center"
              placeholder="New Password"
              name="new-password"
              id="new-password"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="pass form-control"
              type="password"
              align="center"
              placeholder="Confirm New Password"
              name="confirm-new-password"
              id="confirm-new-password"
              required
            />
          </div>

          <button className = "submit" align ="center" type="submit">Change Password</button>
        </form>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          You are signed in using a Social Media Provider, You cannot change
          your password
        </h2>
      </div>
    );
  }
}

export default ChangePassword;
