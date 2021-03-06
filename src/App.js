import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Link, Switch, Route } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import Home from './Home'
import Profile from './Profile'
import './App.css';
import ClarifaiHandler from './clarifai_handler'
import FirebaseHandler from './firebase_handler';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      uniqueId: 0
    };
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
  }

  render() {
    return (
      <div>
        {!this.state.isLoggedIn && (
          <div class= "main">
            <div class="sidebar">
              <div class="logo"><img src={require('./media/upick.png')} />
              </div>
              <div class="description"><p>Decide where you want to eat in the click of a button. We will find the right restaurant based on your day to day meal purchases!</p>
              </div>
              <div class="login">
                <GoogleLogin
                  clientId="671198457660-d5gotcj5u380n416mtgcrj44364affs0.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={this.responseGoogleSuccess}
                  onFailure={this.responseGoogleFailure}
                    />
                </div>
            </div>

          </div>


        )}

        {this.state.isLoggedIn && (
          <div>
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/" exact>You Pick</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <LinkContainer to="/" exact>
                    <NavItem>Home</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/Profile">
                    <NavItem>Profile</NavItem>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Switch>
              <Route exact path="/" render={() => <Home uniqueId={this.state.uniqueId} />}></Route>
              <Route path="/Profile" component={Profile}></Route>
              <Route path="/map" component={Map}></Route>
            </Switch>
          </div>

        )}
      </div>

    );
  }

  responseGoogleSuccess(response){
    this.setState({isLoggedIn: true, uniqueId: response.googleId});
    console.log(this.state);
    const cl = new ClarifaiHandler();
    cl.generateFakeInfo();
    let score = cl.searchFood(response.googleId);
  }
  responseGoogleFailure(response){
    console.log("cannot log you in");
  }
}

export default App;
