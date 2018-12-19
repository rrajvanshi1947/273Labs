import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
// import Moment from 'react-moment';
import moment from 'moment';
import cookie from "react-cookies";
import "react-datepicker/dist/react-datepicker.css";

//Define a Login Component
class Pricing extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      startDate: moment(),
      endDate: moment(),
      currency: null,
      minStay: null,
      ownerid: '',
      authFlag: false,
      Error: []
    };
    this.startDateEventHandler = this.startDateEventHandler.bind(this)
    this.endDateEventHandler = this.endDateEventHandler.bind(this)
    this.currencyChangeHandler = this.currencyChangeHandler.bind(this)
    this.minStayChangeHandler = this.minStayChangeHandler.bind(this)
  }

  

  startDateEventHandler = date => {
    this.setState({
      startDate: date
    });
  //   var newdate = moment(date).format('MM/DD/YYYY')
  //   console.log(typeof date);
  //   this.setState({ startDate: newdate });
  };

  endDateEventHandler = date => {
    this.setState({
      endDate: date
    });
    // var newdate = moment(date).format('MM/DD/YYYY')
    // this.setState({ endDate: newdate });
  };

  currencyChangeHandler = e => {
    this.setState({ currency: e.target.value });
  };

  minStayChangeHandler = e => {
    this.setState({ minStay: e.target.value });
  };

  validatepropertyDetails = cb => {
    console.log("inside property validate", this.state);
    let a = this.state.Error.slice();

    if (this.state.endDate < this.state.startDate) {
      console.log("Date error...........");
      a[0] = "End date cannot be smaller than the start date";
      this.setState({
        Error: "Please fill all the fields before moving further."
      });
      alert('Start Date cannot be greater than end date')
      return
    }
    if (this.state.currency === null || this.state.minStay === null) {
      a[1] = "Kindly fill in all the details before proceeding ahead";
    }
    this.setState({ Error: a }, cb);
  };

  postPropertyCompleted = e => {
    var f = cookie.load('user')
    e.preventDefault();
    console.log("postPropertyCompleted client triggered");
    this.validatepropertyDetails(() => {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        currency: this.state.currency,
        minStay: this.state.minStay,
        ownerid: f
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      console.log(data);
      //make a post request with the user data
      axios
        .post("http://localhost:3001/pricing", data)
        .then(response => {
          console.log("Elli..........Pricing success", response.data);
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
          // if (response.data.message === "success") {
          //   console.log("entered into success");
          //   console.log("Response............", response.data.id);
            //###############################################################################################
            // axios
            //   .get(
            //     "http://localhost:3001/getDetailsForDetails?id=" +
            //       response.data.id
            //   )
            //   .then(response => {
            //     console.log(
            //       "Cheking result----other componnet status",
            //       response.data
            //     );
            //     if (response.data.message === "Success") {
            //       console.log("entered into success");
            //       console.log("Response....REQ........", response.data);
            //       if (
            //         response.data.property[0].Country != "" &&
            //         response.data.property[0].Headline != "" &&
            //         response.data.property[0].Amount != "" &&
            //         response.data.property[0].Amount != null
            //       ) {
            //         //===============================> Add photos validation here, MISSING!!! <=======================================================
            //         console.log("Entered..........");
            //         this.props.history.push("/ownDashboard");
            //       }
            //     } else {
            //       console.log("entered into failure");
            //       this.setState({ Error: response.data.message });
            //     }
            //   })
            //   .catch(res => {
            //     console.log(res.response);
            //   });
            //###############################################################################################
  //         } else {
  //           console.log("entered into failure");
  //           this.setState({ Error: response.data.message });
  //         }
  //       })
  //       .catch(res => {
  //         console.log(res.response);
  //       });
  //   });
  // };

  back = () => {
    this.props.history.push("/photos/" + this.props.match.params.id);
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.authFlag) {
      redirectVar = <Redirect to="/photos" />;
    }
    // if(cookie.load('cookie')){
    //     redirectVar = <Redirect to= "/home"/>
    // }
    return (
      <div>
        {redirectVar}
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "30px",
              width: "0%",
              height: "900px",
              background: "white",
              position: "fixed"
            }}
          >
            <h2>Welcome</h2>
            <br />
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <h3>
                <li>
                  <Link to={"/location/" + this.props.match.params.id}>
                    Location
                  </Link>
                </li>
                <br />
                <br />
                <li>
                  <Link to={"/details/" + this.props.match.params.id}>
                    Details
                  </Link>
                </li>
                <br />
                <br />
                <li>
                  <Link to={"/bookingoptions/" + this.props.match.params.id}>
                    Booking Options
                  </Link>
                </li>
                <br />
                <br />
                <li>
                  <Link to={"/photos/" + this.props.match.params.id}>
                    Photos
                  </Link>
                </li>
                <br />
                <br />
                <li>
                  <Link to={"/security/" + this.props.match.params.id}>
                    Security
                  </Link>
                </li>
                <br />
                <br />
                <li>
                  <Link to={"/payment/" + this.props.match.params.id}>
                    Payment
                  </Link>
                </li>
                <br />
                <br />
                <li>
                  <Link to={"/pricing/" + this.props.match.params.id}>
                    Pricing
                  </Link>
                </li>
                <br />
              </h3>
            </ul>
          </div>
        </div>
        <div class="container">
          <div class="login-form">
            <div id="signup">
              <div class="panel" />
              <span style={{ color: "red" }}>{this.state.Error[1]}</span>
              <h2>Availability</h2>
              <hr />
              <div>
                <label>Start Date:</label>
                <DatePicker selected={this.state.startDate}
                  onChange={this.startDateEventHandler}
                  />
                 
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <label>End Date:</label>
                <DatePicker selected={this.state.endDate}
                  onChange={this.endDateEventHandler}
                  
                />
              </div>
              <span style={{ color: "red" }}>{this.state.Error[0]}</span>
              <br />
              <h3>How much you want to charge ?</h3>
              <br />
              <div class="form-group">
                <h4 style={{ textAlign: "center" }}>Currency(in $):</h4>
                <input className="container" style = {{ position : "absolute", left: 140 ,Align: "right", textindent:50, width: 1000 }} 
                  value={this.state.currency}
                  onChange={this.currencyChangeHandler}
                  type="number"
                  class="form-control"
                  name="fname"
                  placeholder="Amount"
                />
              </div>
              <br />
              <h4 style={{ textAlign: "center", position: "absolute", top: 300, right: 530 }}>Min Stay(days):</h4>
              <div class="form-group">
                <input style = {{ position : "absolute", left: 140 ,Align: "right", textindent:50, width: 1000, top: 350 }}
                  value={this.state.minStay}
                  onChange={this.minStayChangeHandler}
                  type="number"
                  class="form-control"
                  name="amount"
                  placeholder="Min Stay"
                />
              </div>
              <hr />
              <div>
                <button href = '/details' className="my-button" style = {{ position : "absolute", left: 550 ,Align: "right", top: 450, textindent:50 }}title="Relevant Title" >
                  Back
                </button> <br></br>
                <br></br>
                <button
                  class="my-button" style = {{ position : "absolute", left: 650 ,Align: "right", top: 450, textindent:50 }}
                  title="Relevant Title"
                  onClick={this.postPropertyCompleted}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export Login Component
export default Pricing;
