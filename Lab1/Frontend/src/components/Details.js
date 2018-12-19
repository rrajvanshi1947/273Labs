import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

class Details extends Component {
  constructor() {
    super();
    this.state = {
      headline: "",
      propertyDescription: "",
      propertyType: "",
      bedrooms: 0,
      accomodates: 0,
      bathrooms: 0,
      authFlag: false
    };
    this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
    this.propertyDescriptionChangeHandler = this.propertyDescriptionChangeHandler.bind(
      this
    );
    this.propertyTypeChangeHandler = this.propertyTypeChangeHandler.bind(this);
    this.bedroomsChangeHandler = this.bedroomsChangeHandler.bind(this);
    this.accomodatesChangeHandler = this.accomodatesChangeHandler.bind(this);
    this.bathroomsChangeHandler = this.bathroomsChangeHandler.bind(this);
  }

  headlineChangeHandler = e => {
    this.setState({
      headline: e.target.value
    });
  };

  propertyDescriptionChangeHandler = e => {
    this.setState({
      propertyDescription: e.target.value
    });
  };

  propertyTypeChangeHandler = e => {
    this.setState({
      propertyType: e.target.value
    });
  };

  bedroomsChangeHandler = e => {
    this.setState({
      bedrooms: e.target.value
    });
  };

  accomodatesChangeHandler = e => {
    this.setState({
      accomodates: e.target.value
    });
  };

  bathroomsChangeHandler = e => {
    this.setState({
      bathrooms: e.target.value
    });
  };

  submit = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      headline: this.state.headline,
      propertyDescription: this.state.propertyDescription,
      propertyType: this.state.propertyType,
      bedrooms: this.state.bedrooms,
      accomodates: this.state.accomodates,
      bathrooms: this.state.bathrooms
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/details", data).then(response => {
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
      redirect = <Redirect to="/location" />;
    }

    return (
      <div>
      {redirect}
        <div>
          <nav class="navbar navbar-inverse">
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand" href="/">
                  <h1 style={{ fontSize: 40 }}>HomeAway</h1>
                </a>
              </div>
              <ul class="nav navbar-nav">
                <li>
                  <Link to="/owner-login">Account Settings</Link>
                </li>
                <li>
                  <Link to="/create">Property details</Link>
                </li>
                <li class="active">
                  <Link to="/delete">Property archive</Link>
                </li>
                <li>
                  <Link to="/traveler-login">Add new property</Link>
                </li>
                <li>
                  <Link to="/traveler-login">Sign out</Link>
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
              <Link to="/create">
                <h4> Details</h4>{" "}
              </Link>
            </li>
            <br />
            <li class="active">
              <Link to="/delete">
                <h4>Booking options</h4>{" "}
              </Link>
            </li>
            <br />
            <li>
              <Link to="/traveler-login">
                <h4>Photos</h4>{" "}
              </Link>
            </li>
            <br />
            <li>
              <Link to="/traveler-login">
                <h4>Security</h4>
              </Link>
            </li>
            <br />
            <li>
              <Link to="/traveler-login">
                <h4>Payment</h4>
              </Link>
            </li>
            <br />
            <li>
              <Link to="/traveler-login">
                <h4>Pricing</h4>
              </Link>
            </li>
          </ul>
        </div>

        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h5>Describe your property</h5>
                {/*   <h6>Already have an account? <a href="#">Log in</a></h6>   */}
              </div>
              <br />
              <p>
                Start out with a descriptive headline and a detailed summary of
                your property.
              </p>
              <br />
              <br />
              <div className="form-group">
                <input
                  onChange={this.headlineChangeHandler}
                  placeholder="Headline"
                  type="text"
                  className="form-control"
                  name="username"
                />
                <p style={{ color: "red", textAlign: "right" }}>
                  (minimum 20) maximum 80 characters
                </p>
              </div>

              <div className="form-group">
                <textarea
                  columns="10"
                  style={{ width: 356, height: 150 }}
                  onChange={this.propertyDescriptionChangeHandler}
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Property description"
                />
                <p style={{ color: "red", textAlign: "right" }}>
                  (minimum 400) maximum 10,000 characters
                </p>
              </div>
              <div className="form-group">
                <select
                  onChange={this.propertyTypeChangeHandler}
                  style={{ width: 356, height: 50 }}
                  name="House"
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Barn">Barn</option>
                  <option value="Bed & Breakfast">Bed & Breakfast</option>
                  <option value="Boat">Boat</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Cabin">Cabin</option>
                  <option value="Campground">Campground</option>
                  <option value="Castle">Castle</option>
                  <option value="Chalet">Chalet</option>
                  <option value="Chateau/Country House">
                    Chateau/Country House
                  </option>
                  <option value="Condo">Corporate Apartment</option>
                  <option value="Cottage">Cottage</option>
                  <option value="Estate">Estate</option>
                  <option value="Farmhouse">Farmhouse</option>
                  <option value="Guest House">Guest House</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Hotel Suites">Hotel Suites</option>
                  <option value="House">House</option>
                  <option value="House Boat">House Boat</option>
                  <option value="Lodge">Lodge</option>
                  <option value="Mill">Mill</option>
                  <option value="Mobile Home">Mobile Home</option>
                  <option value="Recreational Vehicle">
                    Recreational Vehicle
                  </option>
                  <option value="Resort">Resort</option>
                  <option value="Studio">Studio</option>
                  <option value="Tower">Tower</option>
                  <option value="Townhome">Townhome</option>
                  <option value="Villa">Villa</option>
                  <option value="Yacht">Yacht</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  onChange={this.bedroomsChangeHandler}
                  type="number" min="1" max="10"
                  className="form-control"
                  name="username"
                  placeholder="Bedrooms"
                />
              </div>
              <div className="form-group">
                <input
                  onChange={this.accomodatesChangeHandler}
                  type="number" min="1" max="10"
                  className="form-control"
                  name="username"
                  placeholder="Accomodates"
                />
              </div>

              <div className="form-group">
                <input
                  onChangenumber={this.bathroomsChangeHandler}
                  type="number" min="1" max="10"
                  className="form-control"
                  name="password"
                  placeholder="Bathrooms"
                />
              </div>

              <br />
              {/*    <div><a href="#">Forgot Password?</a></div>
                    </div>   */}
              <div>
                <button type="Back" className="btn btn-warning">
                  <a href="/location">Back</a>
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
    );
  }
}

export default Details;
