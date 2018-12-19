import React, { Component } from 'react';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

class OwnerDashboard extends Component {
  constructor(){
    super()
    this.x=0
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
        console.log('After get');
        console.log(response.data);
        // console.log(response);
        console.log(this.state.ownerproperty);
        if(response.data.propertydetails.length!=0){
          this.setState({
            ownerproperty: this.state.ownerproperty.concat(response.data.propertydetails)
          });
        }

      });
    // console.log(this.state.user);
  }

  componentWillMount(){
    this.state.ownerid= cookie.load("user")
  }
 
  handleLogout() {
    cookie.remove("user", { path: "/" });
    cookie.remove("usertype", { path: "/" });
  }
  render() {
    //  console.log(this.x)
  // this.x+=1
  
    let redirectVar = null;
    
    // if (this.state.ownerid === 'undefined'){
    // this.state.ownerid = cookie.load("user");
    // }
    console.log(this.state.ownerid);
    console.log(this.state.ownerproperty)
    console.log(this.state.ownerproperty[0])
    var details = ''
    if( this.state.ownerproperty === 'undefined' || this.state.ownerproperty.length == 0){
      console.log('Properties do not exist')
    details = <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  
    </tr>

    }
    else{
     details = this.state.ownerproperty.map((ownerproperty, i) => {
       console.log('inside map function')
       
      if(ownerproperty.propertyupcomingbookings === 'undefined' || ownerproperty.propertyupcomingbookings == 0){
        console.log("inside if of map")
          return (
        <tr >
          <td>{i+1}</td>

          
        <td>{ownerproperty.propertycity}, {ownerproperty.propertystate}</td>
          <td>{ownerproperty.propertycountry}</td>
          <td>{ownerproperty.propertystartdate}</td>
          <td>{ownerproperty.propertyenddate}</td> 
          <td>NA</td> 
          <td>NA</td> 
          <td>NA</td>  
          </tr>
      );
      }
      else{
        console.log('inside else of map function')
        return (
          // console.log('inside map else return')
        <tr>
          <td>{i+1}</td> 
        <td>{ownerproperty.propertycity}, {ownerproperty.propertystate}</td>
          <td>{ownerproperty.propertycountry}</td>
          <td>{ownerproperty.propertystartdate}</td>
          <td>{ownerproperty.propertyenddate}</td>
         
          <td>{ownerproperty.propertyupcomingbookings[0].firstname} {ownerproperty.propertyupcomingbookings[0].lastname}</td>
          <td>{ownerproperty.propertyupcomingbookings[0].bookingstartdate}</td>
          <td>{ownerproperty.propertyupcomingbookings[0].bookingenddate}</td>  
          </tr>
          
        
      );
    }
    });
    }
    



    return (
      <div>
             
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
        <h2>My Listed Properties and Booking History</h2>
        <table className="table">
          <thead>
            <tr>
              <th>S.No.</th>
              
              <th>City, State</th>
              <th>Country</th>
              <th>List Date</th>
              <th>List End Date</th>
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
  //render function closing tag
  }
}

export default OwnerDashboard;
