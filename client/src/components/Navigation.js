import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
import Navbar from 'react-bootstrap/Navbar'; 
import Nav from 'react-bootstrap/Nav'; 
import button from 'react-bootstrap/Button'; 

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <NavLink exact to={'/account/' + currentUser.id} activeClassName="active">
            Account
          </NavLink>
          <NavLink exact to="/chat" activeClassName="active">
            Chat
          </NavLink>
          <SignOutButton />
      </Nav>
    </Navbar>

    // <nav className="navigation">
    //   <ul>
    //     <li>
    //       <NavLink exact to="/" activeClassName="active" className="logo">
    //         Landing
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink exact to={'/account/' + currentUser.id} activeClassName="active">
    //         Account
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink exact to="/chat" activeClassName="active">
    //         Chat
    //       </NavLink>
    //     </li>
    //     <li>
    //       <SignOutButton />
    //     </li>
    //   </ul>
    // </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className="navigation">
      <ul>
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
      </ul>
    </nav>
  );
};

export default Navigation;
