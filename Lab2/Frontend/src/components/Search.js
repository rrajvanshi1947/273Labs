import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import Slideshow from "./PropertyImages";
import cookie from "react-cookies";
import 'react-datepicker/dist/react-datepicker.css'

{/*<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css"/>
<!-- Add the slick-theme.css if you want default styling -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css"/> 

 <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script type="text/javascript" src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.min.js"></script>  */}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      city: "",
      arriveDate: moment(),
      departDate: moment(),
      guests: '',
      travelerStartDate: "",
      travelerDepartDate: "",
      travelerGuests: '',
      travelerid: '',
      ownerid: '',
      authFlag: false,
      bookingStatus: false
    };
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.arriveDateChangeHandler = this.arriveDateChangeHandler.bind(this);
    this.departDateChangeHandler = this.departDateChangeHandler.bind(this);
    this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
    this.getImages = this.getImages.bind(this);
    this.showSlideshow = this.showSlideshow.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.travelerStartDateChangeHandler = this.travelerStartDateChangeHandler.bind(this)
    this.travelerDepartDateChangeHandler = this.travelerDepartDateChangeHandler.bind(this)
    this.travelerGuestsChangeHandler = this.travelerGuestsChangeHandler.bind(this)
  }

  

  travelerStartDateChangeHandler(date) {
    this.setState({ travelerStartDate: date });
    // console.log(date);
    // var d = new Date(date);
    // // console.log(d);
    // var e = d.toISOString();
    // console.log(e);
    // this.setState({ travelerStartDate: e });
    // console.log(year);
    // console.log(this.state.travelerStartDate);
  }

  travelerDepartDateChangeHandler(date) {
    this.setState({ travelerDepartDate: date });
  }

  travelerGuestsChangeHandler(e) {
    this.setState({ travelerGuests: e.target.value });
  }

  cityChangeHandler(e) {
    this.setState({
      city: e.target.value,
      // authFlag: false
    });
    // console.log(this.state.city);
  }

   guestsChangeHandler(e) {
    this.setState({
      guests: e.target.value,
      // authFlag: false
    });
    // console.log(this.state.city);
  }

  arriveDateChangeHandler(date) {
    this.setState({ arriveDate: date });
  }

  departDateChangeHandler(date) {
    this.setState({ departDate: date });
  }

  getSearchResults(){
    console.log(this.state.authFlag);
    var details
    if(this.state.authFlag){
       details = this.state.properties.map((property, i) => {
          return (
            <div>
            
            <tr >
            
              <td>{property.propertydetails[0].floorarea}</td>
              <td>{property.propertydetails[0].propertyaccomodates}</td>
              <td>{property.propertydetails[0].propertybedrooms}</td>
              <td>{property.propertydetails[0].propertybathrooms}</td>
            </tr>
            <h3>About the Property</h3>
            <p>{property.propertydetails[0].propertydescription}</p>
            </div>
          );
      });
    
    }

  }

  search = e => {
     if(this.state.arriveDate === '' || this.state.departDate === '' || this.state.city === '' || this.state.guests === ''){
      alert('Please fill out all the fields')
      return
      }

    var headers = new Headers();
    e.preventDefault();
    const data = {
      arriveDate: this.state.arriveDate,
      departDate: this.state.departDate,
      city: this.state.city,
      guests: this.state.guests
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/search", data).then(response => {
      console.log(response);
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
          this.setState({
            properties: response.data,
            authFlag: true,
            ownerid: response.data[0]._id
          });
          console.log(this.state);
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
    console.log("Initiated booking request");
    // this.validateLocationDetails(()=>{
    //prevent page from refresh
    e.preventDefault();
    const data = {
      travelerStartDate: this.state.travelerStartDate,
      travelerDepartDate: this.state.travelerDepartDate,
      travelerGuests: this.state.travelerGuests,
      city: this.state.city,
      travelerid: this.state.travelerid,
      ownerid: this.state.ownerid,
      
    };
    // alert('Your booking is confirmed')
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    console.log(data);
    //make a post request with the user data
    axios.post("http://localhost:3001/apply-booking", data).then(response => {
      console.log("Status Code: " + response.status);
      if (response.data.value === 100) {
        alert('Booking confirmed. Go to trips to see your booking')
          this.setState({
            
            bookingStatus: true
          });
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
    this.state.travelerid = cookie.load('user')

    var details4 = this.state.properties.map((property, i) => {
      return (
          <div>
          <h3>Amenities</h3>
          <tr>
          <td><h5>Property type:          </h5></td><td><h5>{property.propertydetails[0].propertytype}</h5></td>
          </tr>
          <tr>
          <td><h5>Meals:          </h5></td><td><h5>{property.propertydetails[0].meals}</h5></td>
          </tr>
          <tr>
          <td><h5>Floor Area:          </h5></td><td><h5>{property.propertydetails[0].floorarea}</h5></td>
          </tr>
          <tr>
          <td><h5>House Rules:          </h5></td><td><h5>{property.propertydetails[0].houserules}</h5></td>
          </tr>
          <tr>
          <td><h5>Location type:          </h5></td><td><h5>{property.propertydetails[0].locationtype}</h5></td>
          </tr>
          <tr>
          <td><h5>Theme:          </h5></td><td><h5>{property.propertydetails[0].theme}</h5></td>
          </tr>
          <tr>
          <td><h5>General:          </h5></td><td><h5>{property.propertydetails[0].general}</h5></td>
          </tr>
          <tr>
          <td><h5>Kithcen:          </h5></td><td><h5>{property.propertydetails[0].kitchen}</h5></td>
          </tr>
          <tr>
          <td><h5>Dining:          </h5></td><td><h5>{property.propertydetails[0].dining}</h5></td>
          </tr>
          <tr>
          <td><h5>Bathrooms:          </h5></td><td><h5>{property.propertydetails[0].propertybathrooms}</h5></td>
          </tr>
          <tr>
          <td><h5>Bedrooms:          </h5></td><td><h5>{property.propertydetails[0].propertybedrooms}</h5></td>
          </tr>
          <tr>
          <td><h5>Entertainment:          </h5></td><td><h5>{property.propertydetails[0].entertainment}</h5></td>
          </tr>
          <tr>
          <td><h5>Outside:          </h5></td><td><h5>{property.propertydetails[0].outside}</h5></td>
          </tr>
          <tr>
          <td><h5>Suitability:          </h5></td><td><h5>{property.propertydetails[0].suitability}</h5></td>
          </tr>
          <tr>
          <td><h5>Attractions:          </h5></td><td><h5>{property.propertydetails[0].attractions}</h5></td>
          </tr>
          <tr>
          <td><h5>Leisure Activities:          </h5></td><td><h5>{property.propertydetails[0].leisureactivities}</h5></td>
          </tr>
          <tr>
          <td><h5>Local Services & Businesses:          </h5></td><td><h5>{property.propertydetails[0].localservices}</h5></td>
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
          
            <td>{property.propertydetails[0].floorarea}</td>
            <td>{property.propertydetails[0].propertyaccomodates}</td>
            <td>{property.propertydetails[0].propertybedrooms}</td>
            <td>{property.propertydetails[0].propertybathrooms}</td>
          </tr>
          <div>
          <h4>Cost per day:  ${property.propertydetails[0].propertycostperday}</h4>
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
            <input type="number" onChange={this.travelerGuestsChangeHandler} />
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
          <p>{property.propertydetails[0].propertydescription}</p>
          </div>
      )})

      var details3 = this.state.properties.map((property, i) => {
          return (
            <div className = 'container'>
            <h3>{property.name} Owned by {property.firstname} {property.lastname}</h3>
            <h5>{property.propertydescription}</h5></div>
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
                      <Link to="#">Inbox</Link>
                    </li>
                    <li>
                      <Link to="/trips">Trips</Link>
                    </li>
                    <li className="active">
                      <Link to="/profile">My Profile</Link>
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
         
<br></br>
<div className="container">
<label >Enter number of guests</label><br></br>
  <input type="number" onChange={this.guestsChangeHandler}/>
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
