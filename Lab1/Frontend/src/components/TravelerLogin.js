import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import { connect } from 'react-redux';
import { login } from '../redux/reducer';
import Profile from "./Profile";


class TravelerLogin extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      authFlag: false
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  //username change handler to update state variable with the text entered by the user
  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/traveler-login", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true
        });
        
      } else {
        alert('Invalid email or password')
        this.setState({
          authFlag: false
        });
      }
    });
  };

  // state = {  }
  //   submit= function(){
  //     alert("login button clicked");
  //   }
  render() {

        let {isLoginPending, isLoginSuccess, loginError} = this.props;


    //redirect based on successful login
    let redirectVar = null;
    let userid = cookie.load("user");
    if (cookie.load("user") && cookie.load('usertype') === 'traveler') {
      var path = '/profile'
      redirectVar = <Redirect to={path} />;
    }
    else{}
    // let redirect = null;
    // if (this.state.authFlag) {
    //   redirect = <Redirect to="/create" />;
    // }
    return (
      <div>
        {redirectVar}
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <h1 style={{ fontSize: 40 }}>HomeAway</h1>
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h1>Login to HomeAway</h1>
                <h6>
                  Need an account? <a href="/signup-traveler">Sign up</a>
                </h6>
              </div>
              <br />
              <div className="form-group">
                <input
                  onChange={this.emailChangeHandler}
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email address"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={this.passwordChangeHandler}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                />
                <br />
                <div>
                  <a href="#">Forgot Password?</a>
                </div>
              </div>
              <button
                type="submit"
                onClick={this.submitLogin}
                className="btn btn-primary"
              >
                Login
              </button>

              {/*<form><input type="checkbox" name="vehicle3" value="Boat" checked> I have a boat</input></form>*/}
            </div>
            <br />
          </div>
        </div>
        <div className="message">
          { isLoginPending && <div>Please wait...</div> }
          { isLoginSuccess && <div>Success.</div> }
          { loginError && <div>{loginError.message}</div> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelerLogin);

// export default TravelerLogin;
