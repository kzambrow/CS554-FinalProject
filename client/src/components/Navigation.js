import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
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
        
          <a activeClassName="active" href="/">Turnip Exchange</a>
          <a activeClassName="active" href="/">Home</a>
          <a href={'/account/' + currentUser.id}>Account</a>
          <a href="/chat">Chat</a>
          <a href="#signout" onClick={doSignOut}> Sign Out</a>
          {/* <NavLink exact to="/" activeClassName="active" className="logo">
              Landing
          </NavLink>
          
         
            <NavLink exact to={'/account/' + currentUser.id} activeClassName="active">
              Account
            </NavLink>
         
            <NavLink exact to="/chat" activeClassName="active">
              Chat
            </NavLink> */}   
      </div>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className="navigation">
      <div class = "topnav">
      <a href="/">Turnip Exchange</a>
          <a href="/">Home</a>
          <a href='/signup' >Sign Up</a>
          <a href="/signin">Sign In</a>
      </div>
      {/* <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Landing
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/signup" activeClassName="active">
            Sign-up
          </NavLink>
        </li>

        <li>
          <NavLink exact to="/signin" activeClassName="active">
            Sign-In
          </NavLink>
        </li>
      </ul> */}
    </nav>
  );
};

export default Navigation;
