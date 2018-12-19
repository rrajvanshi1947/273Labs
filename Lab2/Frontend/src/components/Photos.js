// import React, { Component } from "react";
// // import React, { Component } from 'react';
// // import { render } from "react-dom";
// import ReactDropzone from "react-dropzone";
// import FormData from "form-data";
// import request from "superagent";
// import axios from "axios";

// class Photos extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       files: ''
//     };
//     // this.onsuccessphotoupload = this.onsuccessphotoupload.bind(this)
//     this.imageSelectHandler = this.imageSelectHandler.bind(this)
//     this.fileInput = React.createRef();
//   }

//   imageSelectHandler(e){
//     console.log(this.fileInput.current.files[0]);
//     this.setState({files: this.fileInput.current.files[0]})
//     this.state.files.push(e.target.value)
//     console.log(this.state);
//   }

//   onDrop(files) {
//     console.log(files);
//     this.setState({ files });
//     console.log(this.state.files);

//     const data = new FormData();
//     var config = {
//       headers: {
//         "content-type": `multipart/form-data; boundary=${data._boundary}`
//       }
//     };

//     data.append("photo", this.state.files);

//     // data.append()
//     //set the with credentials to true
//     axios.defaults.withCredentials = true;
//     //make a post request with the user data
//     axios.post("http://localhost:3001/upload", data, config).then(response => {
//       console.log("Status Code : ", response.status);
//       if (response.status === 200) {
//         console.log("Photos uploaded");
//         this.setState({
//           authFlag: true
//         });
//       } else {
//         this.setState({
//           authFlag: false
//         });
//       }
//     });
//   }

//   //  handleSubmit(){
//   //     console.log(e);
//   //      this.setState({files: this.fileInput.current.files[0]})

//   //   }

//   render() {
//     return (
//       <div>
//         <div class="main-div-photos">
//           <div className="container">
//             <h2>Add upto 5 photos of your property</h2>
//             <hr />
//             <p style={{ color: "red" }} />
//             <form>
//               <br />
//               {/*}    <label className = "container">Please enter the description of the photo:</label>
//                             <input type="text" name="description"  onChange={this.onChange} class="form-control"/> */}

//               <div className="container">
//                 <ReactDropzone
//                   name="photo"
//                   id="photo"
//                   onDrop={this.onDrop}
//                   accept="image/*"
//                   encType="multipart/form-data"
//                 >
//                   Drop photos!!
//                 </ReactDropzone>
//               </div>
//               <br />

//               <h3>OR</h3>
//               <div>
//                 <input type="file" name="photo" multiple onChange={this.imageSelectHandler} ref = {this.fileInput}/>
//               </div>
//               <br />
//               <button
//                 className="btn btn-primary"
//                 type="submit"
//                 onClick={this.onsuccessphotoupload}
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>

//       </div>
//     );
//   }
// }

// export default Photos;

import React, { Component } from "react";
import { render } from "react-dom";
import ReactDropzone from "react-dropzone";
import FormData from "form-data";
// import request from "superagent";
import axios from "axios";
import cookie from "react-cookies";
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
// import React from 'react';

class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: "",
      ownerid: "",
      authFlag: false
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
onDrop = (files) => {
  var formData = new FormData();
formData.append('photo', files[0]);
formData.append('photo', files[1]);
formData.append('photo', files[3]);
formData.append('photo', files[4]);
formData.append('photo', files[2]);
// formData.append('photo', files[0]);
formData.append("ownerid", this.state.ownerid);

axios.defaults.withCredentials = true;
axios.post("http://localhost:3001/upload", formData).then(body => {
      console.log(body);
      console.log("Status Code : ", body.status);
      if (body.status === 200) {alert("Picture uploaded. Click on Dashboard on the right to go back and view your property");
      this.setState({ authFlag: true });
      }
    });

    // POST to a test endpoint for demo purposes
    // const req = request.post("http://localhost:3001/upload");

    // files.forEach(file => {
    //   req.attach(file.name, file);
    // });
}
  

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("photo", this.uploadInput.files[0]);
    data.append("photo", this.uploadInput1.files[0]);
    data.append("photo", this.uploadInput2.files[0]);
    data.append("photo", this.uploadInput3.files[0]);
    data.append("photo", this.uploadInput4.files[0]);
    // data.append("photo", this.uploadInput5.files[0]);

    data.append("ownerid", this.state.ownerid);

    console.log(data);
    axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    axios.post("http://localhost:3001/upload", data).then(body => {
      console.log(body);
      console.log("Status Code : ", body.status);
      if (body.status === 200) {alert("Pictures uploaded. Click on Dashboard on the right to go back and view your property.");
      this.setState({ authFlag: true });
      }
    });
  }

  render() {
    // let redirect = null;
    // if (this.state.authFlag) {
    //   redirect = <Redirect to="/owner-dashboard/" />;
    // }

    this.state.ownerid = cookie.load("user");

    return (

      <div>
    {/*  {redirect}   */}
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
                  <Link to="/owner-dashboard/">Dashboard</Link>
                </li>
                <li>
                  <Link to="#">Account Settings</Link>
                </li>
                <li>
                  <Link to="#">Inbox</Link>
                </li>
                <li>
                  <Link to="#">Property details</Link>
                </li>
                <li className="active">
                  <Link to="#">Property archive</Link>
                </li>
                <li>
                  <Link to="/location">Add new property</Link>
                </li>
                <li>
                <Link to="/owner-login" onClick={this.handleLogout}>
                Sign out
              </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>


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
        <div>
          {" "}
          <input
            ref={ref => {
              this.uploadInput1 = ref;
            }}
            type="file"
          />
        </div><br/>
        <div>
          {" "}
          <input
            ref={ref => {
              this.uploadInput2 = ref;
            }}
            type="file"
          />
        </div><br/>
        <div>
          <input
            ref={ref => {
              this.uploadInput3 = ref;
            }}
            type="file"
          />
        </div><br/>
        <div>
          <input
            ref={ref => {
              this.uploadInput4 = ref;
            }}
            type="file"
          />
        </div>
      
        <br />
        <div>
          <button>Upload</button>
        </div>
      </form>
      </div>
      <br />
      <h3>OR</h3>
      <div>
      <ReactDropzone
                  name="photo"
                  id="photo"
                  onDrop={this.onDrop}
                  accept="image/*"
                  encType="multipart/form-data"
                >
                  Drop photos!! Maximum 5 photos. Upload one photo at a time or select multiple photos and upload them in one go!
                </ReactDropzone></div>
      </div>
    );
  }
}

export default Photos;
