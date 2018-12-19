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

//   deletetrip(i){
//     // console.log("I is " + i.bindex);
//     console.log("Inside delete");
//     var tripID = i.target.value
//     // i.preventDefault();
//     var object = this
//     let data = {tripID:tripID} 

//     var arr = this.state.trips;
//     var index = arr.findIndex(x => x.tripID === tripID)
//     console.log(index);
//     arr.splice(index, 1);
//     this.setState({ trips: arr });
//     // const data = this.state;

//     axios.delete(`http://localhost:3001/delete/${data.tripID}`).then(response => {
//       console.log("Status Code : ", response.status);
//       if(response.status ===200){
//           // let trips = [...this.state.trips];
//           // trips = trips.filter(trip => trip.tripID !== tripID)
//           // object.setState(prevState => {trips: trips})
//           // this.state.trips = trips;
//           console.log(this.state.trips);
//       }
//     });
//   }

  render() {
      this.state.userid = cookie.load('user') cookie.load('user')
      //if not logged in go to login page
    let redirectVar = null;
    if(!cookie.load('user')){
        redirectVar = <Redirect to= "/"/>
    } 

    console.log(this.state.trips);
    //iterate over trips to create a table row
    let details = this.state.trips.map((trip, i) => {
      return (
        <tr >
        <td>{i + 1}</td>
          <td>{trip.city}</td>
          <td>{trip.country}</td>
          <td>{trip.startdate}</td>
          <td>{trip.enddate}</td>
        </tr>
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
                <th>Country</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {details}
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
