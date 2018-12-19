import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import cookie from "react-cookies";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      meals: "",
      floorarea: "",
      houserules: "",
      locationtype: '',
      theme: '',
      general: '',
      kitchen: "",
      dining: "",
      outside: "",
      attractions: '',
      entertainment: '',
      suitability: '',
      leisureactivities: '',
      localservices: '',
      authFlag: false,
      ownerid: ''
    };
    this.mealsChangeHandler = this.mealsChangeHandler.bind(this);
this.floorAreaChangeHandler = this.floorAreaChangeHandler.bind(
      this
    );
    this.houseRulesChangeHandler = this.houseRulesChangeHandler.bind(this);
    this.locationTypeChangeHandler = this.locationTypeChangeHandler.bind(this);
    this.themeChangeHandler = this.themeChangeHandler.bind(this);
    this.generalChangeHandler = this.generalChangeHandler.bind(this);
    this.kitchenChangeHandler = this.kitchenChangeHandler.bind(this);
this.outsideChangeHandler = this.outsideChangeHandler.bind(
      this
    );
    this.attractionsChangeHandler = this.attractionsChangeHandler.bind(this);
    this.entertainmentChangeHandler = this.entertainmentChangeHandler.bind(this);
    this.suitabilityChangeHandler = this.suitabilityChangeHandler.bind(this);
    this.leisureActivitiesChangeHandler = this.leisureActivitiesChangeHandler.bind(this);
     this.localServicesChangeHandler = this.localServicesChangeHandler.bind(this);
    this.diningChangeHandler = this.diningChangeHandler.bind(this);
    
  }

  mealsChangeHandler = e => {
    this.setState({
      meals: e.target.value
    });
  };

  floorAreaChangeHandler = e => {
    this.setState({
      floorarea: e.target.value
    });
  };

  houseRulesChangeHandler = e => {
    this.setState({
      houserules: e.target.value
    });
  };

  locationTypeChangeHandler = e => {
    this.setState({
      locationtype: e.target.value
    });
  };

  themeChangeHandler = e => {
    this.setState({
      theme: e.target.value
    });
  };

  generalChangeHandler = e => {
    this.setState({
      general: e.target.value
    });
  };

  kitchenChangeHandler = e => {
    this.setState({
      kitchen: e.target.value
    });
  };

  diningChangeHandler = e => {
    this.setState({
      dining: e.target.value
    });
  };

  entertainmentChangeHandler = e => {
    this.setState({
      entertainment: e.target.value
    });
  };

  outsideChangeHandler = e => {
    this.setState({
      outside: e.target.value
    });
  };

  suitabilityChangeHandler = e => {
    this.setState({
      suitability: e.target.value
    });
  };

  attractionsChangeHandler = e => {
    this.setState({
      attractions: e.target.value
    });
  };

  leisureActivitiesChangeHandler = e => {
    this.setState({
      leisureactivities: e.target.value
    });
  };

  localServicesChangeHandler = e => {
    this.setState({
      localservices: e.target.value
    });
  };



  submit = e => {
    var f = cookie.load('user')
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
     meals: this.state.meals,
      floorarea: this.state.floorarea,
      houserules: this.state.houserules,
      locationtype: this.state.locationtype,
      theme: this.state.theme,
      general: this.state.general,
      kitchen: this.state.kitchen,
      dining: this.state.dining,
      outside: this.state.outside,
      attractions: this.state.attractions,
      entertainment: this.state.entertainment,
      suitability: this.state.suitability,
      leisureactivities: this.state.leisureactivities,
      localservices: this.state.localservices,
      ownerid: f
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/amenities", data).then(response => {
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

    let redirect = null;
    if (this.state.authFlag) {
      redirect = <Redirect to="/pricing" />;
    }

    return (
      <div>
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

        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h5>Add more details</h5>
                {/*   <h6>Already have an account? <a href="#">Log in</a></h6>   */}
              </div>
              <br />
              
              <br />
              <div className="form-group">
                <input
                  onChange={this.mealsChangeHandler}
                  placeholder="Meals"
                  type="text"
                  className="form-control"
                  name="username"
                />
               
              </div>
              <div className="form-group">
                <input 
                  onChange={this.floorAreaChangeHandler}
                  placeholder="Floor Area in square foot" 
                  type="number"
                  className="form-control"
                  name="x"
                />
               
              </div>
              <div className="form-group">
                <input 
                  onChange={this.houseRulesChangeHandler}
                  placeholder="House Rules" 
                 
                  className="form-control"
                  name="y"
                />
                <br/>
                <div className="form-group">
                <input 
                  onChange={this.locationTypeChangeHandler}
                  placeholder="Location type" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.themeChangeHandler}
                  placeholder="Theme" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.generalChangeHandler}
                  placeholder="General" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.kitchenChangeHandler}
                  placeholder="Kitchen" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.diningChangeHandler}
                  placeholder="Dining" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.outsideChangeHandler}
                  placeholder="Outside" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.entertainmentChangeHandler}
                  placeholder="Entertainment" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.suitabilityChangeHandler}
                  placeholder="Suitability" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.leisureActivitiesChangeHandler}
                  placeholder="Leisure Activities" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.attractionsChangeHandler}
                  placeholder="Attractions" 
                 
                  className="form-control"
                  name="y" />
              </div>
              <div className="form-group">
                <input 
                  onChange={this.localServicesChangeHandler}
                  placeholder="Local services and Businesses" 
                 
                  className="form-control"
                  name="y" />
              </div>


             
              <div>
                <button type="Back" className="btn btn-warning">
                  <a href="/details">Back</a>
                </button>
                <br />
                <br />
                <button
                  type="submit"
                  onClick={this.submit}
                  className="btn btn-primary"
                >
                  Next
                </button>
              </div>
              {/*<form><input type="checkbox" name="vehicle3" value="Boat" checked> I have a boat</input></form>*/}
            </div>
            <br />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Details;
