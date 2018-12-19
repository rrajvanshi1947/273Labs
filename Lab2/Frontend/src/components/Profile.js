import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector'
// import Images from "./Images";
import setAuthorizationToken from './SetAuthorizationToken'


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      userid: "", 
      authFlag: false,
      travelerid: '',
      imageFlag: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.aboutmeChangeHandler = this.aboutmeChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.companyChangeHandler = this.companyChangeHandler.bind(this);
    this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
    this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
    this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
    this.genderChangeHandler = this.genderChangeHandler.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  

  componentDidMount() { 
    axios
      .get(`http://localhost:3001/profile/${this.state.userid}`) 
      .then(response => {
        console.log( response.data);
        this.setState({
          user: this.state.user.concat(response.data)
        });
        console.log(response);
        console.log(this.state.user);
      });
  }

  handleUploadImage(ev) {
    // ev.preventDefault();

    const data = new FormData();
    data.append("photo", this.uploadInput.files[0]);
  

    data.append("travelerid", this.state.userid);

    console.log(data);
    axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    axios.post("http://localhost:3001/uploadpic", data).then(body => {
      console.log(body);
      console.log("Status Code : ", body.status);
      if (body.status === 200) {
      this.setState({ imageFlag: true });
      alert("Picture uploaded.");
      }
    });
  }

  firstnameChangeHandler=(e)=>{
    this.state.user[0].firstname = e.target. value
    // console.log(this.state);
  }

  lastnameChangeHandler=(e)=>{
    this.state.user[0].lastname = e.target.value
    // console.log(this.state);
  }

  emailChangeHandler=(e)=>{
    this.state.user[0].email = e.target.value
    // console.log(this.state);
  }

  phoneChangeHandler=(e)=>{
    this.state.user[0].phone = e.target.value
    // console.log(this.state);
  }

  aboutmeChangeHandler=(e)=>{
    this.state.user[0].aboutme = e.target.value
    // console.log(this.state);
  }

  cityChangeHandler=(e)=>{
    this.state.user[0].city = e.target.value
    // console.log(this.state);
  }

  countryChangeHandler=(val)=>{
    this.state.user[0].country = val
    // console.log(this.state);
  }

  companyChangeHandler=(e)=>{
    this.state.user[0].company = e.target.value
    // console.log(this.state);
  }

  hometownChangeHandler=(e)=>{
    this.state.user[0].hometown = e.target.value
    // console.log(this.state);
  }

  schoolChangeHandler=(e)=>{
    this.state.user[0].school = e.target.value
    // console.log(this.state);
  }

  languagesChangeHandler=(e)=>{
    this.state.user[0].languages = e.target.value
    // console.log(this.state);
  }

  genderChangeHandler=(e)=>{
    this.state.user[0].gender = e.target.value
    // console.log(this.state);
  }

  handleLogout() {
    // alert('You clicked')
    cookie.remove("user", { path: "/" });
    cookie.remove("usertype", { path: "/" });
  }

  saveProfile=(e)=>{
    // let f = this.state.travelerid
    e.preventDefault();
    console.log('Save Profile client triggered');
    // this.validateLocationDetails(()=>{
        //prevent page from refresh
        e.preventDefault();
        const data = {
          firstname: this.state.user[0].firstname,
          lastname: this.state.user[0].lastname,
          email : this.state.user[0].email,
    phone : this.state.user[0].phone,
             aboutme : this.state.user[0].aboutme,
            city  : this.state.user[0].city,
           country  : this.state.user[0].country,
         company  : this.state.user[0].company,
         school  :   this.state.user[0].school,
         hometown  : this.state.user[0].hometown,
         languages  : this.state.user[0].languages,
         gender  : this.state.user[0].gender,
        userid  : this.state.userid,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        console.log(data);
        //make a post request with the user data
        axios.post(`http://localhost:3001/profile/`,data)
            .then(response => {
                 console.log(response);
      console.log("Status Code : ", response.status);
                if (response.status === 200) {
                  alert('Profile successfully updated')
                  // this.setState({
                  //   authFlag: true              
                  // });
                  
                } else if(response.data.status === 401){
                   alert('System error. Try again.')
                  // this.setState({
                  //   authFlag: false
                  // });
                 
                }
              });
            // });
          }

       
  

  render() {
    var a;
    if(this.state.authFlag === true)
    a = alert('Profile updated')

    this.state.userid = cookie.load('user')

    // this.state.userid = localStorage.getItem('user')

    console.log(this.state.user);

    let details = this.state.user.map(user => {
      return (
        <div>
        <div className="image" className="panel">
                <img  
                src={window.location.origin + "/"+user.imagelocation}
                  // src=  {require("./Images/user1.png")}
                  alt={user.firstname + user.lastname}
                  width="150"
                  height="200"
                />
                <br />
              </div>
              <br />
               <div>
      <form onSubmit={this.handleUploadImage}>
      <br/>
        <div >
          <input
            ref={ref => {
              this.uploadInput = ref;
            }}
            type="file"
          />
        </div><br/>
       
      
        <br />
        
          <button>Upload Pic</button>
       
        
      </form>
       <br />
      </div>  
          <div className="form-group">
            <input
              defaultValue={user.firstname}
              onChange={this.firstnameChangeHandler}
              placeholder="First Name"
              type="text"
              className="form-control"
              name="firstname"
            />
          </div>
          <div className="form-group">
            <input
            defaultValue={user.lastname}
              onChange={this.lastnameChangeHandler}
              type="text"
              className="form-control"
              name="lastname"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <input
              defaultValue={user.email}
              onChange={this.emailChangeHandler}
              type="text"
              className="form-control"
              name="email"
              placeholder="Email address"
            />
          </div>
          <div className="form-group">
          <input
            defaultValue={user.phone}
            onChange={this.phoneChangeHandler}
            type="number" max='10'
            className="form-control"
            name="phone"
            placeholder="Phone number"
          />
        </div>
        <div className="form-group">
        <textarea
        defaultValue = {user.aboutme}
          columns="10"
          style={{ width: 356, height: 100 }}
          onChange={this.aboutmeChangeHandler}
          type="text"
          rows="4"
          className="form-control" //edit this
          name="aboutme"
          placeholder="About me"
        />
      </div>
      <div className="form-group">
          <input
            defaultValue={user.city}
            onChange={this.cityChangeHandler}
            type="text"
            className="form-control"
            name="city"
            placeholder="City"
          />
        </div>
        <div className="form-group">
        <CountryDropdown  value = {user.country} onChange={(val) => this.countryChangeHandler(val)} class="form-control"/>
          {/*<input
            defaultValue={user.country}
            onChange={this.countryChangeHandler}
            type="text"
            className="form-control"
            name="country"
            placeholder="Country"
          />*/}
        </div>
        <div className="form-group">
          <input
            defaultValue={user.company}
            onChange={this.companyChangeHandler}
            type="text"
            className="form-control"
            name="company"
            placeholder="Company"
          />
        </div>
        <div className="form-group">
          <input
            defaultValue={user.school}
            onChange={this.schoolChangeHandler}
            type="text"
            className="form-control"
            name="school"
            placeholder="School"
          />
        </div>
        <div className="form-group">
          <input
            defaultValue={user.hometown}
            onChange={this.hometownChangeHandler}
            type="text"
            className="form-control"
            name="hometown"
            placeholder="Hometown"
          />
        </div>
        <div className="form-group">
          <input
            defaultValue={user.languages}
            onChange={this.languagesChangeHandler}
            type="text"
            className="form-control"
            name="languages"
            placeholder="Languages"
          />
        </div>
        
        <div className="form-group">
        <select id = 'gender' onChange={this.genderChangeHandler} defaultValue = {user.gender} style={{ width: 356, height: 50 }} name="Gender">
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>
      </div>
        </div>
        // <div className="form-group">
        //   <input
        //     onChange={this.usernameChangeHandler}
        //     type="text"
        //     className="form-control"
        //     name="username"
        //     placeholder="Phone number"
        //   />
        // </div>
        // <div className="form-group">
        //   <textarea
        //     columns="10"
        //     style={{ width: 356, height: 100 }}
        //     onChange={this.usernameChangeHandler}
        //     type="text"
        //     rows="4"
        //     className="form-control" //edit this
        //     name="username"
        //     placeholder="About me"
        //   />
        // </div>
        // <div className="form-group">
        //   <input
        //     onChange={this.passwordChangeHandler}
        //     type="password"
        //     className="form-control"
        //     name="password"
        //     placeholder="City"
        //   />
        // </div>
        // <div className="form-group">
        //   <input
        //     onChange={this.passwordChangeHandler}
        //     type="password"
        //     className="form-control"
        //     name="password"
        //     placeholder="Country"
        //   />
        // </div>
        // <div className="form-group">
        //   <input
        //     onChange={this.passwordChangeHandler}
        //     type="password"
        //     className="form-control"
        //     name="password"
        //     placeholder="Company"
        //   />
        // </div>
        // <div className="form-group">
        //   <input
        //     onChange={this.passwordChangeHandler}
        //     type="password"
        //     className="form-control"
        //     name="password"
        //     placeholder="School"
        //   />
        // </div>
        // <div className="form-group">
        //   <input
        //     onChange={this.passwordChangeHandler}
        //     type="password"
        //     className="form-control"
        //     name="password"
        //     placeholder="Hometown"
        //   />
        // </div>
        // <div className="form-group">
        //   <input
        //     onChange={this.passwordChangeHandler}
        //     type="password"
        //     className="form-control"
        //     name="password"
        //     placeholder="Languages"
        //   />
        // </div>
        // <div className="form-group">
        //   <select style={{ width: 356, height: 50 }} name="Gender">
        //     <option defaultValue="Gender">Gender</option>
        //     <option defaultValue="Male">Male</option>
        //     <option defaultValue="Female">Female</option>
        //     <option defaultValue="Other">Other</option>
        //   </select>
        // </div>
      );
    });

    return (
      <div>
        
    {/*    {redirectVar}  */}
        {a}
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
                  <Link to="/search">New Search</Link>
                </li>
                <li>
                  <Link to="/trips">Trips</Link>
                </li>
                <li className="active">
                  <Link to="/profile/">My Profile</Link>
                </li>
                <li>
                  <Link to="/traveler-login" onClick={this.handleLogout}>Sign out</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h1>Profile Information</h1>
                {/*   <h6>Already have an account? <a href="#">Log in</a></h6>   */}
              </div>
              
              {details}
             
              <br />
              {/*    <div><a href="#">Forgot Password?</a></div>
                    </div>   */}
              <button
                type="submit"
                onClick={this.saveProfile}
                className="btn btn-primary"
              >
                Save changes
              </button>

              {/*<form><input type="checkbox" name="vehicle3" defaultValue="Boat" checked> I have a boat</input></form>*/}
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
