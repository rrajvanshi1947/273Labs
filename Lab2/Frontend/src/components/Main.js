import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import PropertyPics from "./PropertyPics";
import Welcome from "./Welcome";
import TravelerLogin from "./TravelerLogin";
import OwnerLogin from "./OwnerLogin";
import SignupTraveler from "./SignupTraveler";
import SignupOwner from "./SignupOwner";
import Profile from "./Profile";
import OwnerDashboard from "./OwnerDashboard";
import Location from "./Location";
import Details from "./Details";
import Photos from "./Photos";
import Pricing from "./Pricing";
import Trips from "./Trips";
import Search from "./Search";
import Home from './Home/Home.js'
import Slideshow from './PropertyImages'
import Datepicker from './DatePicker'
import Amenities from './Amenities'
// import Home from './Home/Home';
// import Delete from './Delete/Delete';
// import Create from './Create/Create';
// import Navbar from './LandingPage/Navbar';
import PropertyDetails from "./PropertyDetails";
//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/*Render Different Component based on Route*/}
          <Route exact={true} path="/upload" component={PropertyPics} />
          <Route exact={true} path="/" component={Home} />
          <Route path="/traveler-login" component={TravelerLogin} />
          <Route path="/owner-login" component={OwnerLogin} />
          <Route path="/signup-traveler" component={SignupTraveler} />
          <Route path="/signup-owner" component={SignupOwner} />
          <Route path="/profile" component={Profile} /> {/*/:userid*/}
          <Route path="/owner-dashboard/:ownerid" component={OwnerDashboard} />
          <Route path="/owner-dashboard/" component={OwnerDashboard} />
          <Route path="/location" component={Location} />
          <Route path="/details" component={Details} />
          <Route path="/photos" component={Photos} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/trips" component={Trips} />
          <Route path="/search" component={Search} />
          <Route path="/propertyimages" component={Slideshow} />
          <Route path="/amenities" component={Amenities} />
          <Route path="/datepicker" component={Datepicker} />
          {/* <Route path="/home" component={Home}/>
                 <Route path="/delete" component={Delete}/>
        <Route path="/create" component={Create}/> */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
