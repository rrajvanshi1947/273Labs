// import React, { Component } from 'react';
// import DatePicker from "react-datepicker";
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

// class Datepicker extends Component {
//     constructor(props){
//         super(props)
//     this.state = { 
//         date: moment(),

//      }
//      this.changeDate = this.changeDate.bind(this)
//     }
// changeDate(date){
//     this.setState({date: date})
// }

    
//     render() { 
//         return ( 
//             <div className = "container">
//             <form>
//             <div className = "form-group">
//             <DatePicker
//               value = '2018-10-07'
//               selected={ this.state.date }
//               onChange={ this.handleChange }
//               name="startDate"
//               dateFormat="MM/DD/YYYY"
//             />
//             </div>
//             </form>
//             </div>
//          );
//     }
// }

// export default DatePicker;

import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

class Datepicker extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let main = this.state.startDate
    console.log(main.format('L'));
  }

  render() {
    return (
      <div className = "container">
        <h3>React Datepicker Example</h3>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <label>Select Date: </label>
            <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              name="startDate"
              dateFormat="MM/DD/YYYY"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-success">Add Date</button>
          </div>
        </form>
      </div>
    );
  }
}
export default Datepicker