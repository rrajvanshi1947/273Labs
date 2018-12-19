import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem,ButtonToolbar,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";


class Welcome extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#brand">HomeAway</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav pullRight>
                    <NavDropdown eventKey={3} title="Login" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}><Link to="/travellerlogin">Traveler Login</Link></MenuItem>
                    <MenuItem eventKey={3.2}><Link to="/ownerlogin">Owner Login</Link></MenuItem>
                    </NavDropdown>
                    <NavDropdown eventKey={4} title="Help" id="basic-nav-dropdown">
                    <MenuItem eventKey={4.1}>Visit help center</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={4.2}>Travelers</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={4.3}>Homeowners</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={4.3}>Property Managers</MenuItem>
                    </NavDropdown>
                    <MenuItem divider /> 
                </Nav>
                </Navbar.Collapse>
            </Navbar>
           
            </div>
         );
    }
}
 
export default Welcome;