import React, { Component } from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import { FormErrors } from './FormErrors';
import './Form.css';
import { connect } from "react-redux";
import OwnerDashboard from "./OwnerDashboard";
import setAuthorizationToken from "./SetAuthorizationToken";
import cookie from "react-cookies";

class SignupOwner extends Component {
  constructor(){
    super()
    this.state = { 
      firstname: '',
      lastname: '',
      email: '',
      password: '',

      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      authFlag: false
     }
     this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
     this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    //  this.emailChangeHandler = this.emailChangeHandler.bind(this);
    //  this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
     this.submitNewUser = this.submitNewUser.bind(this);
     this.handleUserInput = this.handleUserInput.bind(this);
    }

    componentWillMount() {
     this.setState({
       authFlag: false
     });
   }

    firstnameChangeHandler(e){
      this.setState({firstname: e.target.value})
    }

    lastnameChangeHandler(e){
      this.setState({lastname: e.target.value})
    }

    // emailChangeHandler(e){
    //   this.setState({email: e.target.value})
    // }

    // passwordChangeHandler(e){
    //   this.setState({password: e.target.value})
    // }

    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
                    () => { this.validateField(name, value) });
    }
  
    validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let emailValid = this.state.emailValid;
      let passwordValid = this.state.passwordValid;
  
      switch(fieldName) {
        case 'email':
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid ? '' : ' is invalid';
          break;
        case 'password':
          passwordValid = value.length >= 6;
          fieldValidationErrors.password = passwordValid ? '': ' is too short. 6 characters required';
          break;
        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      emailValid: emailValid,
                      passwordValid: passwordValid
                    }, this.validateForm);
    }
  
    validateForm() {
      this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }
  
    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }



    submitNewUser = (e) => {
      if(this.state.firstname === '' || this.state.lastname === '' || this.state.email === '' || this.state.email === ''){
      alert('Please fill out all the fields')
      return
      }

      var headers = new Headers();
      //prevent page from refresh
      e.preventDefault();
      const data = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email : this.state.email,
          password : this.state.password
      }
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.post('http://localhost:3001/signup-owner',data)
          .then(response => {
              console.log(response);
      console.log("Status Code : ", response.status);
      const token = response.data.token;
      // console.log(token);
      localStorage.setItem("jwt", token);
      setAuthorizationToken(token);
       if(response.status === 202){

                this.setState({
           authFlag: true
         });
              }
             else if(response.data.status === 401){
              alert('Email already exists! Use another email.')
             this.setState({
           authFlag: false
         });
       }
              
          });
  }

    render() { 
    //   let redirectVar = null;
    // if (this.state.authFlag) {
    //   // let userid = cookie.load("user");
    //   // if (cookie.load("user") && cookie.load('usertype') === 'traveler') {
        
    //     let userid = cookie.load("user");
    //   var path = "/owner-dashboard/"+userid;
    //   redirectVar = <Redirect to={path} />;
    // }
     let redirectVar = null;
    if (this.state.authFlag) {
      // let userid = cookie.load("user");
      // if (cookie.load("user") && cookie.load('usertype') === 'traveler') {
        
        // let userid = cookie.load("user");
      var path = "/owner-dashboard/";
      redirectVar = <Redirect to={path} />;
    }
    else{}
        return ( 
            <div>
               {redirectVar}   
                <div>
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/"><h1 style = {{fontSize: 40}}>HomeAway</h1></a>
                        </div>
                    </div>
    
                </nav>
                </div>
                <div className="container">
                  <div className="login-form">
                    <div className="main-div">
                      <div className="panel">
                        <h1>Sign up for HomeAway</h1>
                        <h6>Already have an account? <a href="/owner-login">Log in</a></h6>
                        <FormErrors formErrors={this.state.formErrors} />
                      </div>
                        <br />
                      <div className="form-group">
                        <input
                          onChange={this.firstnameChangeHandler}
                          type="text"
                          className="form-control"
                          name="firstname"
                          placeholder="First Name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          onChange={this.lastnameChangeHandler}
                          type="text"
                          className="form-control"
                          name="lastname"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                      <div className="form-group" className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <input
                          value = {this.state.email}
                          onChange={this.handleUserInput}
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email address"
                          required
                        />
                      </div>
                      <div className="form-group" className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                        <input
                        value = {this.state.password}
                          onChange={this.handleUserInput}
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          required
                        />
                        <br />
                    {/*    <div><a href="#">Forgot Password?</a></div>
                    </div>   */}
                      <button type='submit' onClick={this.submitNewUser} className="btn btn-primary" disabled={!this.state.formValid}>
                        Sign me up
                      </button>
                      
                      {/*<form><input type="checkbox" name="vehicle3" value="Boat" checked> I have a boat</input></form>*/}
                    </div>
                    <br></br>
                    
                  </div>
                </div>
              </div>
              </div> );
    }
}
 
export default SignupOwner;