import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
// import Moment from 'react-moment';
import moment from 'moment';

//Define a Login Component
class Pricing extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      currency: null,
      minStay: null,
      Error: []
    };
  }

  // componentDidMount=()=>{
  //     let props_id=this.props.match.params.id;
  //     console.log("this.props.match.params.id",props_id)
  //     if(props_id>0){
  //         axios.get('http://localhost:3001/getPricingDetails?id='+props_id)
  //             .then(response => {
  //                 console.log("Elli..........",response.data);
  //                 if(response.data.message === "Success"){
  //                     console.log("entered into success")
  //                     console.log("Data############$$$$$$$$$$$$$#",response.data.property[0])
  //                     this.setState({
  //                         startDate : response.data.property[0].Start_Date,
  //                         endDate   : response.data.property[0].End_Date,
  //                         currency  : response.data.property[0].Amount,
  //                         minStay   : response.data.property[0].Min_Stay,
  //                     }, console.log(this.state,"SUhasSuhasSuhasSuhas"))
  //                 }else{
  //                     console.log("entered into failure")
  //                 }
  //             }).catch(res=>{
  //                 console.log(res.response);
  //             })
  //     }
  // }

  startDateEventHandler = date => {
  //   var newdate = moment(date).format('MM/DD/YYYY')
  //   console.log(typeof date);
  //   this.setState({ startDate: newdate });
  };

  endDateEventHandler = date => {
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
    }
    if (this.state.currency === null || this.state.minStay === null) {
      a[1] = "Kindly fill in all the details before proceeding ahead";
    }
    this.setState({ Error: a }, cb);
  };

  postPropertyCompleted = e => {
    e.preventDefault();
    console.log("postPropertyCompleted client triggered");
    this.validatepropertyDetails(() => {
      //prevent page from refresh
      e.preventDefault();
      const data = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        currency: this.state.currency,
        minStay: this.state.minStay
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
      redirectVar = <Redirect to="/owner-dashboard" />;
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
              width: "20%",
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
                <DatePicker
                  onChange={this.startDateEventHandler}
                 value={this.state.startDate} />
                 
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <label>End Date:</label>
                <DatePicker
                  onChange={this.endDateEventHandler}
                  value={this.state.endDate}
                />
              </div>
              <span style={{ color: "red" }}>{this.state.Error[0]}</span>
              <br />
              <h3>How much you want to charge ?</h3>
              <br />
              <div class="form-group">
                <h4 style={{ textAlign: "center" }}>Currency(in $):</h4>
                <input className="container" style = {{ Align: "right", width: 1000 }} 
                  value={this.state.currency}
                  onChange={this.currencyChangeHandler}
                  type="number"
                  class="form-control"
                  name="fname"
                  placeholder="Amount"
                />
              </div>
              <br />
              <h4 style={{ textAlign: "center" }}>Min Stay:</h4>
              <div class="form-group">
                <input
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
                <button href = '/details' className="my-button" title="Relevant Title" >
                  Back
                </button> <br></br>
                <br></br>
                <button
                  class="my-button"
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
