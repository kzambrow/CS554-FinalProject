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
import PostPage from './PostPage';
import SignUp from './SignUp';
import EditAccount from './EditAccount';
import ChangePassword from './ChangePassword';
import JoinQueue from './JoinQueue';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
//<PrivateRoute exact path="/changepassword" component={ChangePassword} />

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navigation />
          </header>
        </div>
        <div className="chat-compensation">
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Landing} />
        <Route exact path = "/sell" component = {Landings}/>
        <Route path="/account/:id" component = {Account}/>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path = "/posts/:id" component = {PostPage} />
        <PrivateRoute path="/post" component={Post} />
        <PrivateRoute path="/editaccount" component={EditAccount} />
        <PrivateRoute path="/changePassword" component={ChangePassword} />
        <PrivateRoute exact path="/joinqueue" component={JoinQueue} />
        </div>
        <div className="chat-main-div">
            <Chat/>
          </div>
        
        
      </Router>
    </AuthProvider>
  );
}

export default App;
