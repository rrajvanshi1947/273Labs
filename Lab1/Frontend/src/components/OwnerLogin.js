import React, { Component } from 'react';
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class OwnerLogin extends Component {
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
     alert('Invalid email or password')
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
     axios.post("http://localhost:3001/owner-login", data).then(response => {
       console.log("Status Code : ", response.status);
       if (response.status === 200) {
         this.setState({
           authFlag: true
         });
       } else {
         this.setState({
           authFlag: false
         });
       }
     });
   };
    
    render() { 
      //redirect based on successful login
    let redirectVar = null;
    let userid = cookie.load("user");
    let usertype = cookie.load("usertype");
    if (cookie.load("user") && cookie.load("usertype") === 'owner') {
      var path = '/owner-dashboard/'+userid
      redirectVar = <Redirect to={path} />;
      // var path = '/profile/'+userid
      // redirectVar = <Redirect to='/owner-dashboard' />;
    }
    else if(cookie.load("user") && cookie.load("usertype") === 'traveler'){
      var path = '/profile/'+userid
      redirectVar = <Redirect to={path} />;
    }
    // else{}
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

            <br></br><br></br><br></br><br></br>

                <div className = "wrapper">
            <div className="image"><img src={require('./1491584478467.jpeg')} alt="Trulli" width="350" height="350" /></div>
            

            
            <div className="form">
            <div className="container">
            <div className="login-form">
              <div className="main-div2">
                <div className="panel">
                  <h1>Owner Login</h1>
               {/*   <h6>Need an account? <a href="#">Sign up</a></h6>   */}
                </div>
                  <br />
                <div className="form-group">
                  <input
                    onChange={this.emailChangeHandler}
                    type="text"
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
                  /></div>
                  <br />
                  
                  <br/>
                
                <button onClick={this.submitLogin} className="btn btn-primary">
                  Login
                </button>
                
                {/*<form><input type="checkbox" name="vehicle3" value="Boat" checked> I have a boat</input></form>*/}
              </div>
              <br></br>
              
            </div>
            </div>
          </div>
            </div>
            </div>
         );
    }
}
 
export default OwnerLogin;