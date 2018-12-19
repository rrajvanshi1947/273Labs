import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import Slideshow from "./PropertyImages";
import 'react-datepicker/dist/react-datepicker.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      city: "",
      arriveDate: "",
      departDate: "",
      travelerStartDate: "",
      travelerDepartDate: "",
      authFlag: false,
      bookingStatus: false
    };
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.arriveDateChangeHandler = this.arriveDateChangeHandler.bind(this);
    this.departDateChangeHandler = this.departDateChangeHandler.bind(this);
    this.getImages = this.getImages.bind(this);
    this.showSlideshow = this.showSlideshow.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.travelerStartDateChangeHandler = this.travelerStartDateChangeHandler.bind(this)
    this.travelerDepartDateChangeHandler = this.travelerDepartDateChangeHandler.bind(this)
    
  }

  

  travelerStartDateChangeHandler(date) {
    var d = new Date(date);
    var e = d.toISOString();
  }

  travelerDepartDateChangeHandler(date) {
    // console.log(date);
    var d = new Date(date);
    // console.log(d);
    var f = d.toISOString();
    // console.log(e);
    // this.setState({ travelerDepartDate: e });
    // console.log(year);
    // console.log(this.state.travelerDepartDate);
  }

  cityChangeHandler(e) {
    this.setState({
      city: e.target.value,
      authFlag: false
    });
    // console.log(this.state.city);
  }

  arriveDateChangeHandler(date) {
    //           var value = e.target.value;
    //   var vals = value.split('-');
    //   var year = vals[0];
    //   var month = vals[1];
    //   var day = vals[2];
    //   console.info(day, month, year)
    // this.setState({
    //   arriveDate: date
    // })
    console.log(date);
    var d = new Date(date);
    console.log(d);
    var e = d.toISOString();
    console.log(e);
    this.setState({ arriveDate: e });
    // console.log(year);
    console.log(this.state.arriveDate);
  }

  departDateChangeHandler(date) {
    console.log(date);
    var d = new Date(date);
    console.log(d);
    var e = d.toISOString();
    console.log(e);
    this.setState({ departDate: e });
    // console.log(year);
    console.log(this.state.departDate);
  }

  getSearchResults(){
    console.log(this.state.authFlag);
    var details
    if(this.state.authFlag){
       details = this.state.properties.map((property, i) => {
          return (
            <div>
            
            <tr >
            
              <td>{property.areasqft}</td>
              <td>{property.accomodates}</td>
              <td>{property.bedrooms}</td>
              <td>{property.bathrooms}</td>
            </tr>
            <h3>About the Property</h3>
            <p>{property.name}</p>
            </div>
          );
      });
    
    }

  }

  search = e => {
    e.preventDefault();
    console.log("Search client triggered");
    const data = {
      arriveDate: this.state.arriveDate,
      departDate: this.state.departDate,
      city: this.state.city
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    console.log(data);
    //make a post request with the user data
    axios.post("http://localhost:3001/search", data).then(response => {
      console.log("Elli..........", response.data);
      if (response.status === 200) {
          this.setState({
            properties: response.data,
            authFlag: true
          });
          // this.getSearchResults()
          // console.log("hello");
          // console.log(this.state.properties[0].img1);
      } else {
          this.setState({
            authFlag: false
          });
      }
      // console.log(this.state.authFlag + 'value');
    });
    // });
  };

  applyBooking = e => {
    e.preventDefault();
    console.log("Initiated booking reques");
    // this.validateLocationDetails(()=>{
    //prevent page from refresh
    e.preventDefault();
    const data = {
      travelerStartDate: this.state.travelerStartDate,
      travelerDepartDate: this.state.travelerDepartDate,
      
    };
    alert('Your booking is confirmed')
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    console.log(data);
    //make a post request with the user data
    axios.post("http://localhost:3001/applyBooking", data).then(response => {
      console.log("Booking confirmed", response.data);
      if (response.status === 200) {
          this.setState({
            
            bookingStatus: true
          });
          alert('Booking confirmed')
          // this.getSearchResults()
          // console.log("hello");
          // console.log(this.state.properties[0].img1);
      } else {
          this.setState({
            bookingStatus: false
          });
      }
      // console.log(this.state.authFlag + 'value');
    });
    // });
  };


  getImages() {
    return <Slideshow />;
  }
  showSlideshow(props) {
    if (this.state.authFlag) {
      return <Slideshow properties={props.properties} />;
    }
  }

  render() {

    var details4 = this.state.properties.map((property, i) => {
      return (
          <div>
          <h3>Amenities</h3>
          <tr>
          <td><h5>Property type:          </h5></td><td><h5>{property.propertyType}</h5></td>
          </tr>
          <tr>
          <td><h5>Meals:          </h5></td><td><h5>{property.meals}</h5></td>
          </tr>
          <tr>
          <td><h5>Floor Area:          </h5></td><td><h5>{property.areasqft}</h5></td>
          </tr>
          <tr>
          <td><h5>House Rules:          </h5></td><td><h5>{property.houserules}</h5></td>
          </tr>
          <tr>
          <td><h5>Location type:          </h5></td><td><h5>{property.locationtype}</h5></td>
          </tr>
          <tr>
          <td><h5>Theme:          </h5></td><td><h5>{property.theme}</h5></td>
          </tr>
          <tr>
          <td><h5>General:          </h5></td><td><h5>{property.general}</h5></td>
          </tr>
          <tr>
          <td><h5>Kithcen:          </h5></td><td><h5>{property.kitchen}</h5></td>
          </tr>
          <tr>
          <td><h5>Dining:          </h5></td><td><h5>{property.dining}</h5></td>
          </tr>
          <tr>
          <td><h5>Bathrooms:          </h5></td><td><h5>{property.bathrooms}</h5></td>
          </tr>
          <tr>
          <td><h5>Bedrooms:          </h5></td><td><h5>{property.bedrooms}</h5></td>
          </tr>
          <tr>
          <td><h5>Entertainment:          </h5></td><td><h5>{property.entertainment}</h5></td>
          </tr>
          <tr>
          <td><h5>Outside:          </h5></td><td><h5>{property.outside}</h5></td>
          </tr>
          <tr>
          <td><h5>Suitability:          </h5></td><td><h5>{property.suitability}</h5></td>
          </tr>
          <tr>
          <td><h5>Attractions:          </h5></td><td><h5>{property.attractions}</h5></td>
          </tr>
          <tr>
          <td><h5>Leisure Activities:          </h5></td><td><h5>{property.leisureactivities}</h5></td>
          </tr>
          <tr>
          <td><h5>Local Services & Businesses:          </h5></td><td><h5>{property.localservicesbusinesses}</h5></td>
          </tr>
          
          </div>
      )}
    )

   var details = this.state.properties.map((property, i) => {
      return (
        <div>
        <h3>Details</h3>
        <thead>
                <tr>
                <th>House</th>
                    <th>Sleeps</th>
                    <th>Bedrooms</th>
                    <th>Bathrooms</th>
                    
                </tr>
              </thead>

          <tr >
          
            <td>{property.areasqft}</td>
            <td>{property.accomodates}</td>
            <td>{property.bedrooms}</td>
            <td>{property.bathrooms}</td>
          </tr>
          <div>
          <h4>Cost per day:  {property.costperday}</h4>
          <label for="start">Arrive</label>
          <DatePicker
              selected={this.state.travelerStartDate}
              onChange={this.travelerStartDateChangeHandler}
            />
            <label for="end">Depart</label>
            <DatePicker
              selected={this.state.travelerDepartDate}
              onChange={this.travelerDepartDateChangeHandler}
            />
            <label className="container">Enter number of guests</label>
            <input type="number"/>
            <br></br><br></br>
            <button
              className="btn btn-primary"
              title="Relevant Title"
              onClick={this.applyBooking}
            >
              {" "}
              Book Now!{" "}
            </button>
          </div>
          </div>
      )}
    )

    var details2 = this.state.properties.map((property, i) => {
      return (
        <div className = 'container'>
        <h3>About the Property</h3>
          <p>{property.propertyDescription}</p>
          </div>
      )})

      var details3 = this.state.properties.map((property, i) => {
          return (
            <div className = 'container'>
            <h3>{property.name} owned by {property.ownername}</h3>
            <h5>The manager of this property consistently provides great experiences for their guests.
            Speaks: English, Mandarin
            Response time: Within a few hours
            Response rate: 100%
            Calendar last updated: October 6, 2018</h5></div>
          )})

          let x = <Slideshow properties={this.state.properties} />;

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
                      <Link to="/create">Inbox</Link>
                    </li>
                    <li>
                      <Link to="/trips">Trips</Link>
                    </li>
                    <li className="active">
                      <Link to="/delete">My Profile</Link>
                    </li>
                    <li>
                      <Link to="/traveler-login" onClick={this.handleLogout}>
                        Sign out
                      </Link>
                    </li>
                </ul>
              </div>
            </nav>
          </div>
          
          <div className="container">
          <label>Enter city</label><br></br>
            <input
              type="text"
              
              onChange={this.cityChangeHandler}
            />
          </div>
          <br />
          
          <div className="container">
            <label for="start">Arrive</label>
            <DatePicker
            dateFormat="MM/DD/YYYY"
              selected={this.state.startDate}
              onChange={this.arriveDateChangeHandler}
            />
          </div>
          <div className="container">
            <label for="end">Depart</label>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.departDateChangeHandler}
            />
            
          </div>
          
          {/*}     <input
              type="date"
              id="end"
              name="property"
              min="2018-01-01"
              max="2019-12-31"
              onChange={val => this.departDateChangeHandler(val)}
  />    */}
<br></br>
<div className="container">
<label >Enter number of guests</label><br></br>
  <input type="number"/>
  </div><br></br>
          <div className="container">
            <button
              className="btn btn-primary"
              title="Relevant Title"
              onClick={this.search}
            >
              {" "}
              Search{" "}
            </button>
          </div>
        <br></br><br></br>
        
       <div>
            <showSlideshow properties={this.state.properties[0]} />
          </div>
          <br></br>
          <div>{details3}</div>
          

          <br></br>
          <div className = 'container'>
          <table className="table">
              
              <tbody>
              
                {/*Display the Tbale row based on data recieved */}
                {details}
              </tbody>
            </table>
            </div>
            <div>
           
            {details2}
            </div>

            <div className = 'container'>
            
            <table>
            
            
            <tbody>{details4}</tbody>
            
            </table>
</div>  
          
      </div>
    );
  }
}

export default Search;
