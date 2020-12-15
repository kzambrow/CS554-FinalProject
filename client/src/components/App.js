import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './Landing';
import Landings from './Landings';
import Account from './Account';
import Navigation from './Navigation';
import SignIn from './SignIn';
import Chat from './Chat';
import Post from './Post';
import SignUp from './SignUp';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navigation />
          </header>
        </div>
        <Route exact path="/" component={Landing} />
        <Route exact path = "/sell" component = {Landings}/>
        <PrivateRoute path="/account" component = {Account}/>
        <PrivateRoute path="/chat" component={Chat} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/post" component={Post} />
      </Router>
    </AuthProvider>
  );
}

export default App;
