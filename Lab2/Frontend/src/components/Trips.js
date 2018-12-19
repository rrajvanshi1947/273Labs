import React, { Component } from "react";
// import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Trips extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      userid: ''
    };
    // this.deletetrip = this.deletetrip.bind(this);
  }
  //get the books data from backend
  componentDidMount() {
    axios.get(`http://localhost:3001/trips/${this.state.userid}`).then(response => {
      this.setState({
        trips: this.state.trips.concat(response.data)
      });
    });
    
  }

  render() {
      this.state.userid = cookie.load('user')
      //if not logged in go to login page
    let redirectVar = null;
    if(!cookie.load('user')){
        redirectVar = <Redirect to= "/"/>
    } 

    console.log(this.state.trips);
    //iterate over trips to create a table row
    let details = this.state.trips.map((trip, i) => {
      return (
        <div>
        <div>
        <tr >
        <td>{i + 1}</td>
          <td>{trip.trips[0].tripCity}</td>
          <td>{trip.trips[0].tripGuests}</td>
          <td>{trip.trips[0].tripStartDate}</td>
          <td>{trip.trips[0].tripEndDate}</td>
        </tr>
        </div>
        </div>

      /* <div>
        <tr>
        <td>{i + 2}</td>
          <td>{trip.trips[1].tripCity}</td>
          <td>{trip.trips[1].tripGuests}</td>
          <td>{trip.trips[1].tripStartDate}</td>
          <td>{trip.trips[1].tripEndDate}</td>
        </tr>
        </div>
        <div>
        <tr>
        <td>{i + 3}</td>
          <td>{trip.trips[1].tripCity}</td>
          <td>{trip.trips[1].tripGuests}</td>
          <td>{trip.trips[1].tripStartDate}</td>
          <td>{trip.trips[1].tripEndDate}</td>
        </tr>
        </div></div>  */

      );
    });
    
   
    return (
      <div>
          {redirectVar}   
        <div className="container">
        <br></br>
        <br></br>
          <h2>List of All trips</h2>
          <table className="table">
            <thead>
              <tr>
              <th>S. No.</th>
                <th>City</th>
                <th>Guests</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
            <div>
              {/*Display the Tbale row based on data recieved*/}
              {details}
              </div>
            </tbody>
          </table>
          <div>
          <button type="Back" value = "Back" className="btn btn-warning" onClick={()=> <Redirect to = '/profile/:userid' />}>
          <a href="/profile/:userid">Back</a>
        </button>
        </div>
        </div>
        
      </div>
    );
  }
}
//export Trips Component
export default Trips;
