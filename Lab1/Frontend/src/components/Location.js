import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { throws } from 'assert';

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

// componentDidMount=()=>{
//   let props_id=this.props.match.params.id;
//   console.log("this.props.match.params.id",props_id)
//   if(props_id>0){
//       axios.get('http://localhost:3001/getLocationDetails?id='+props_id)
//           .then(response => {
//               console.log("Elli..........",response.data);
//               if(response.data.message === "Success"){
//                   console.log("entered into success")
//                   console.log("Data#############",response.data.property[0])
//                   this.setState({
//                       country : response.data.property[0].Country,
//                 streetAddress : response.data.property[0].StreetAddress,
//                          unit : response.data.property[0].Unit_Suite,
//                         city  : response.data.property[0].City,
//                        state  : response.data.property[0].State,
//                      zipcode  : response.data.property[0].ZipCode
//                   })
//               }else{
//                   console.log("entered into failure")
//               }
//           }).catch(res=>{
//               console.log(res.response);
//           })
//   }
// }

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
  // alert('Zipcode can only be a number!')
  this.setState({
      zipcode : e.target.value
  })
}

//Basic form validation method
validateLocationDetails=(cb)=>{
  console.log("inside validate",this.state.state)
  if(this.state.country=="" || this.state.streetAddress=="" || this.state.unit=="" || this.state.city=="" ||
      this.state.state=="" || this.state.zipcode==""){
          console.log('here')
          this.setState({Error : "Please fill all the fields before moving further."})
  }else{
      console.log('validate else');
      cb()
  }
}

//In below method, user is trying to send a request to node to save the location data to database
saveLocationHandler=(e)=>{
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
       ownerid  : ''  //send owner cookie
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

              // if(response.data.message === "success"){
//                 if (response.status === 200) {
//                   console.log("entered into success")
//                   // console.log(response.data)
//                   this.setState({id : response.data.id})
//                   this.props.history.push("/details/"+this.props.match.params.id);
//                   <Redirect to = '/details' />
//               }else{
//                   console.log("entered into failure")
//                   this.setState({Error : response.data.message})
//               }
//           }).catch(res=>{
//               console.log(res.response);
//           })
//   })
// }

    render() { 
      let redirect = null;
    if (this.state.authFlag) {
      redirect = <Redirect to="/details" />;
    }
        return ( <div>
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
            
            
            <div className="container" style={{textAlign:"left"}}>
            <div>
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
            <li class="active">
              <Link to="/booking-options">
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
              <Link to="/security">
                <h4>Security</h4>
              </Link>
            </li>
            <br />
            <li>
              <Link to="/payment">
                <h4>Payment</h4>
              </Link>
            </li>
            <br />
            <li>
              <Link to="/pricing">
                <h4>Pricing</h4>
              </Link>
            </li>
          </ul>
        </div>

           
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
                        <a class="my-button" title="Relevant Title" href="/postproperty">Cancel</a>
                        <button className="btn btn-primary" title="Relevant Title" onClick={this.saveLocationHandler} > Next </button>
                        </div>              
                    </div>
                    </div>
                
            </div>
            </div> );
    }
}
 
export default Location;