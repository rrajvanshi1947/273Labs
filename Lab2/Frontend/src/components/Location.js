import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { throws } from 'assert';
import cookie from "react-cookies";
import Zip from 'react-zipcode'

class Location extends Component {
  //call the constructor method
  constructor(props){
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
        country : "",
  streetAddress : "",
           unit : "",
          city  : "",
         state  : "",
       zipcode  : "",
          Error : '',
            id  : '',
        ownerid  : '',
        authFlag: false
    }
    //Bind the handlers to this class
    this.saveLocationHandler = this.saveLocationHandler.bind(this)
    this.countryChangeHandler = this.countryChangeHandler.bind(this)
    this.streetAddressChangeHandler = this.streetAddressChangeHandler.bind(this)
    this.unitSuiteChangeHandler = this.unitSuiteChangeHandler.bind(this)
    this.cityChangeHandler = this.cityChangeHandler.bind(this)
    this.stateChangeHandler = this.stateChangeHandler.bind(this)
    this.zipCodeChangeHandler = this.zipCodeChangeHandler.bind(this)
} 


countryChangeHandler=(val)=>{
  this.setState({ 
      country: val 
  })
}

streetAddressChangeHandler=(e)=>{
  this.setState({
      streetAddress : e.target.value
  })
}

unitSuiteChangeHandler=(e)=>{
  this.setState({
      unit : e.target.value
  })
}

cityChangeHandler=(e)=>{
  this.setState({
      city : e.target.value
  })
}

stateChangeHandler=(val)=>{
  this.setState({ 
      state : val 
  })
}

zipCodeChangeHandler=(e)=>{
  // alert(typeof(e))
  // alert('Zipcode can only be a number!')
  var f = e.target.value.replace(/[^0-9]/g, "") 
  this.setState({
      zipcode : f
  })
}

//Basic form validation method
validateLocationDetails=(cb)=>{
  console.log("inside validate",this.state.state)
   
  if(this.state.country=="" || this.state.streetAddress=="" || this.state.unit=="" || this.state.city=="" ||
      this.state.state=="" || this.state.zipcode==""){
          console.log('here')
          alert('Please fill out all the fields. ')
          this.setState({Error : "Please fill all the fields before moving further."})
         
          
  }else{
      console.log('validate else');
      cb()
  }
}

//In below method, user is trying to send a request to node to save the location data to database
saveLocationHandler=(e)=>{
//   console.log(typeof(this.state.zipcde));
// if(typeof(this.state.zipcde) !== Number ){
//     alert('Zipcode must be a number')
//     return
//   }
  


  var f = cookie.load("user")
  console.log(f);
  e.preventDefault();
  console.log('saveLocationHandler client triggered');
  this.validateLocationDetails(()=>{
      //prevent page from refresh
      e.preventDefault();
      const data = {
        country : this.state.country,
  streetAddress : this.state.streetAddress,
           unit : this.state.unit,
          city  : this.state.city,
         state  : this.state.state,
       zipcode  : this.state.zipcode,
       ownerid  : f
      }
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      console.log(data);
      //make a post request with the user data
      axios.post('http://localhost:3001/location',data)
          .then(response => {
              console.log("Elli..........",response.data);
              if (response.status === 200) {
                this.setState({
                  authFlag: true              
                });
                console.log("hello");
              } else {
                this.setState({
                  authFlag: false
                });
              }
            });
          });
        }

            
    render() { 
      let redirect = null;
    if (this.state.authFlag) {
      redirect = <Redirect to="/details" />;
    }
        return ( <div>
          {redirect}
            <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <h1 style={{ fontSize: 40 }}>HomeAway</h1>
                </a>
              </div>
              <ul className="nav navbar-nav">
                <li>
                  <Link to="#">Account Settings</Link>
                </li>
                <li>
                  <Link to="#">Inbox</Link>
                </li>
                <li>
                  <Link to="#">Property details</Link>
                </li>
                <li className="active">
                  <Link to="#">Property archive</Link>
                </li>
                <li>
                  <Link to="/location">Add new property</Link>
                </li>
                <li>
                <Link to="/owner-login" onClick={this.handleLogout}>
                Sign out
              </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
            
            <div className="container">
          <h4 style={{ color: "blue" }}>Welcome</h4>
          <br />
          <ul className="nav navbar-nav">
            <li>
              <Link to="/location">
                <h4>Location</h4>{" "}
              </Link>
            </li>
            <br />
            <li>
              <Link to="/details">
                <h4> Details</h4>{" "}
              </Link>
            </li>
            <br />
            <li className="active">
              <Link to="#">
                <h4>Booking options</h4>{" "}
              </Link>
            </li>
            <br />
            <li>
              <Link to="/photos">
                <h4>Photos</h4>{" "}
              </Link>
            </li>
            <br />
            <li>
              <Link to="#">
                <h4>Security</h4>
              </Link>
            </li>
            <br />
            <li>
              <Link to="#">
                <h4>Payment</h4>
              </Link>
            </li>
            <br />
            <li>
              <Link to="pricing">
                <h4>Pricing</h4>
              </Link>
            </li>
          </ul>
        </div>
            
         {/*}   <div className="container" style={{textAlign:"left"}}>
            <div>
          <h8 style={{ color: "blue" }}>Welcome</h8>
          <br />
          <ul className="nav navbar-nav">
            <li>
              <Link to="/location">
                <h8>Location</h8>{" "}
              </Link>
            </li>
            <br />
            <li>
              <Link to="/details">
                <h8> Details</h8>{" "}
              </Link>
            </li>
            <br />
            <li class="active">
              <Link to="/booking-options">
                <h8>Booking options</h8>{" "}
              </Link>
            </li>
            <br />
            <li>
              <Link to="/photos">
                <h8>Photos</h8>{" "}
              </Link>
            </li>
            <br />
            <li>
              <Link to="/security">
                <h8>Security</h8>
              </Link>
            </li>
            <br />
            <li>
              <Link to="/payment">
                <h8>Payment</h8>
              </Link>
            </li>
            <br />
            <li>
              <Link to="/pricing">
                <h8>Pricing</h8>
              </Link>
            </li>
          </ul>
        </div>  */}

           
                <div class="login-form">
                    <div class="main-div2">
                        <div class="panel">
                            <span style={{color : "red"}}>{this.state.Error}</span>
                            <h2>Location Details</h2>
                        </div>
                        
                        <div class="form-group">
                            <CountryDropdown  value = {this.state.country} onChange={(val) => this.countryChangeHandler(val)} class="form-control"/>
                        </div>
                        
                        <div class="form-group">
                            <input value={this.state.streetAddress} onChange = {this.streetAddressChangeHandler} type="text" class="form-control" name="streetAddress" placeholder="Street Address" required/>
                        </div>
                        <div class="form-group">
                            <input value={this.state.unit} onChange = {this.unitSuiteChangeHandler} type="text" class="form-control" name="unit" placeholder="Unit, Suite, Building, Etc" required/>
                        </div>
                        <div class="form-group">
                            <input value={this.state.city} onChange = {this.cityChangeHandler} type="text" class="form-control" name="city" ref="city" placeholder="City" required/>
                        </div>
                        <div class="form-group">
                        <RegionDropdown country={this.state.country}
                        value={this.state.state} onChange={(val) => this.stateChangeHandler(val)} class="form-control"/>
                        </div>
                        <div class="form-group">
                        <input value={this.state.zipcode} type = "number" onChange = {this.zipCodeChangeHandler} type="text" class="form-control" name="zipcode" placeholder="ZipCode" required/>
                        </div>
                        <div>
                        <a class="my-button" title="Relevant Title" href="/owner-dashboard/">Cancel</a>
                        <button className="btn btn-primary" title="Relevant Title" onClick={this.saveLocationHandler} > Next </button>
                        </div>              
                    </div>
                    </div>
                
            </div>
             );
    }
}
 
export default Location;