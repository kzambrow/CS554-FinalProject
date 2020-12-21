import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
import Navbar from 'react-bootstrap/Navbar'; 
import Nav from 'react-bootstrap/Nav'; 
import button from 'react-bootstrap/Button'; 
import {doSignOut} from '../firebase/FirebaseFunctions';
const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};
const NavigationAuth = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <nav className="navigation">
    <div class = "topnav">
          <img class = "logo" src = "/imgs/turnip_logo.png" alt="No-img"/>
          <Link to="/">Turnip Exchange</Link>
          <Link to={'/account/' + currentUser.id}>Account</Link>
          <Link to={'/post/addpost'}>Add Post</Link>
          <Link to="#signout" onClick={doSignOut}> Sign Out</Link>  
      </div>
    </nav>
  );
};
const NavigationNonAuth = () => {
  return (
    <nav className="navigation">
      <div class = "topnav">
          <img class = "logo" src = "/imgs/turnip_logo.png" alt="No-img"/>
          <Link to="/">Turnip Exchange</Link>
          <Link to='/signup' >Sign Up</Link>
          <Link to="/signin">Sign In</Link>
      </div>
    </nav>
  );
};
export default Navigation;