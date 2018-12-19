import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem,ButtonToolbar,Button, Jumbotron} from 'react-bootstrap';
import './Home.css';
import TinyPicker from 'tiny-picker';
// import NavbarAfterLogin from '../Navbar/Navbar_AfterLogin'
import DatePicker from 'react-date-picker'
import Autosuggest from 'react-bootstrap-autosuggest'
var NumericInput = require('react-numeric-input');


//create the Navbar_Home Component
class Navbar_Home extends Component {
    constructor(props){
        super(props);
        this.state={
            date : new Date()
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        }
        return(
            <div>
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
                    <Link to="/traveler-login">Traveler</Link>
                  </li>
                  <li>
                    <Link to="/owner-login">Owner</Link>
                  </li>
               {/*   <li>
                    <Link to="/trips">Trips</Link>
                  </li>
                  <li className="active">
                    <Link to="/delete">My Profile</Link>
                  </li>
                  <li>
                    <Link to="/traveler-login" onClick={this.handleLogout}>
                      Sign out
                    </Link>
                  </li> */}
        </ul>   
              </div>
            </nav>
          </div>
            </div>
                <div id="main-div">
                    <div id="nav">
                   {/*}     <NavbarAfterLogin id="nav"/>    */}
                    </div>  
                    <div class="row form-group name1" id="main-home">
                        <div style={{display : "block",color : "white"}}>
                            <h2>Book beach houses, cabins,</h2>
                            <h2>condos and more, worldwide</h2>
                        </div>    
                        <div class="row" >
                                <div class="row form-group name1 col-md-2" id="top">
                                    <Autosuggest
                                    datalist={[ 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Rev.', 'Prof.' ]}
                                    placeholder="Where?"
                                    />
                                </div>
                            
                                <div class="row form-group name1 col-md-6" id="numer-ip1">
                                  <div class="form-group name1 col-md-16">
        <span style={{color : "white"}}><b>Start Date:</b></span>   
                                        <div class="date-pick">
                                            <DatePicker 
                                            onChange={this.onChange}
                                            value={this.state.date} class="form-control date-pick"></DatePicker>
                                        </div>
                                    </div>   
                                   <div class="form-group name1 col-md-16">
                                        <span style={{color : "white"}}><b>End Date:</b></span>     
                                        <div class="date-pick">
                                            <DatePicker 
                                            onChange={this.onChange}
                                            value={this.state.date} class="form-control"/>
                                        </div>
                                    </div>
                               </div>      

                                <div class="form-group name1 col-md-3" style={{color : "white"}}>
                                    <div style={{left: "15%", position: "relative"}}><span><b>Guests</b></span></div>
                                    <div id="numer-ip2">
                                        <div class="form-group name1 col-md-5"><NumericInput className="form-control" min={1} max={12} value={0}/>
                                        <span>Adults</span>
                                        </div>
                                        
                                  {/*}      <div class="form-group name1 col-md-5"><NumericInput className="form-control" min={1} max={12} value={0}/>
                                            <span>Children</span>
        </div>  */}
                                    </div>
                                </div>

                                <div class="form-group name1 col-md-1" id="but">
                                    <ButtonToolbar>
                                        <Button bsStyle="primary" bsSize="large">Search</Button>
                                    </ButtonToolbar>
                                </div>
                        </div>
                    </div>
                    <div class="row form-group name1 " id="bot-text" style={{color : "white"}}>
                                <div class="row form-group name1 col-md-4">
                                    <h3>Your whole vacation starts here</h3>
                                    <span id="span-id-1">Choose a rental from the world's best selection</span>
                                </div>
                                <div class="row form-group name1 col-md-4">
                                    <h3>Book and stay with confidence</h3>
                                    <span id="span-id-2"><a href="https://www.homeaway.com/info/ha-guarantee/travel-with-confidence?icid=il_o_link_bwc_homepage" style={{color : "white"}}>Secure payments, peace of mind</a></span>
                                </div>
                                <div class="row form-group name1 col-md-4">
                                    <h3  id="span-id-3">Your vacation your way</h3>
                                    <span>More space, more privacy, no compromises</span>
                                </div>
                    </div>
                </div>
            </div>
        )      
    }
}

export default Navbar_Home;


/*
<Jumbotron className="jumbo">
                <div id="nav">
                    <NavbarAfterLogin id="nav"/>
                </div>  
                    <div>
                        <div class="home_text">
                            <h2>Book beach houses, cabins,</h2><p/>
                            <h2>condos and more, worldwide</h2>
                        </div>
                        <div class="row">
                            <div class="form-group name1 col-md-2">
                            <input onChange = {this.fnameChangeHandler} type="text" class="form-control" name="fname" placeholder="First Name" />
                            </div>
                            <div class="form-group">
                                <label><b>Start Date:</b></label>
                                <DatePicker 
                                onChange={this.onChange}
                                value={this.state.date} class="form-control"/>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <label><b>End Date:</b></label>
                                <DatePicker 
                                onChange={this.onChange}
                                value={this.state.date} class="form-control"/>
                            </div>
                            <div>
                                <ul>
                                    <li >
                                        <strong class="ValueProps__title">Your whole vacation starts here</strong>
                                    </li>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </span>
                                    <li >
                                        <strong class="ValueProps__title">Book and stay with confidence</strong>
                                    </li>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </span>
                                    <li >
                                        <strong class="ValueProps__title">Your vacation your way</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <ul>
                                <li >
                                    <span class="ValueProps__blurb">Choose a rental from the world's best selection</span>
                                </li>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                <li >
                                    <span class="ValueProps__blurb"><a href="https://www.homeaway.com/info/ha-guarantee/travel-with-confidence?icid=il_o_link_bwc_homepage">Secure payments, peace of mind</a></span>
                                </li>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                <li >
                                    <span class="ValueProps__blurb">More space, more privacy, no compromises</span>
                                </li>
                            </ul>
                        </div>
                    </div> 
                </Jumbotron>

*/


