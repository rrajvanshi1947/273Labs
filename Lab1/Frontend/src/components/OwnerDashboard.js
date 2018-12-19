import React, { Component } from 'react';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

class OwnerDashboard extends Component {
  constructor(){
    super()
  this.state = {
    ownerproperty: [],
    ownwerid: ''
  };
  this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3001/owner-dashboard/${this.state.ownerid}`)
      .then(response => {
        this.setState({
          ownerproperty: this.state.ownerproperty.concat(response.data)
        });
      });
    // console.log(this.state.user);
  }

  handleLogout() {
    cookie.remove("user", { path: "/" });
    cookie.remove("usertype", { path: "/" });
  }
  render() {
    let redirectVar = null;
    this.state.ownerid = cookie.load("user");
    console.log(this.state.ownerid);
    if (!cookie.load("user") || cookie.load('usertype') !== 'owner') {
      redirectVar = <Redirect to="/owner-login" />;
    }

    let details = this.state.ownerproperty.map((ownerproperty, i) => {
      return (
        <tr >
          <td>{i+1}</td>
          <td>{ownerproperty.name}</td>
          <td>{ownerproperty.city}, {ownerproperty.state}</td>
          <td>{ownerproperty.country}</td>
          <td>{ownerproperty.listdate}</td>
          <td>{ownerproperty.firstname} {ownerproperty.lastname}</td>
          <td>{ownerproperty.booking_start_date}</td>
          <td>{ownerproperty.booking_end_date}</td>
        </tr>
      );
    });

    return (
      <div>
           {redirectVar}   
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
        <h2>Booking History</h2>
        <table className="table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>City, State</th>
              <th>Country</th>
              <th>List Date</th>
              <th>Traveler</th>
              <th>Booking Start Date</th>
              <th>Booking End Date</th>
            </tr>
          </thead>
          <tbody>
            {/*Display the Tbale row based on data recieved*/}
            {details}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

export default OwnerDashboard;
