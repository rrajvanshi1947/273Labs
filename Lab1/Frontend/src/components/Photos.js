import React, { Component } from "react";
// import React, { Component } from 'react';
// import { render } from "react-dom";
import ReactDropzone from "react-dropzone";
import FormData from "form-data";
import request from "superagent";
import axios from "axios";

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  onDrop(files) {
    console.log(files);
    this.setState({ files });
    console.log(this.state.files);

    const data = new FormData();
    var config = {
      headers: {
        "content-type": `multipart/form-data; boundary=${data._boundary}`
      }
    };

    data.append("photo", this.state.files);

    // data.append()
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3001/upload", data, config).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Photos uploaded");
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });

    // POST to a test endpoint for demo purposes
    // const req = request.post('https://httpbin.org/post');

    // files.forEach(file => {
    //   req.attach(file.name, file);
    // });

    // req.end();
  }

  render() {
    return (
      <div>
        <div class="main-div-photos">
          <div className="container">
            <h2>Add upto 5 photos of your property</h2>
            <hr />
            <p style={{ color: "red" }} />
            <form>
              <br />
              {/*}    <label className = "container">Please enter the description of the photo:</label>   
                            <input type="text" name="description"  onChange={this.onChange} class="form-control"/> */}

              <div className="container">
                <ReactDropzone
                  name="photo"
                  id="photo"
                  onDrop={this.onDrop}
                  accept="image/*"
                  encType="multipart/form-data"
                >
                  Drop photos!!
                </ReactDropzone>
              </div>
              <br />
              {/*<aside >
<h3>Uploaded files</h3>
<ul>
{this.state.files.map(f => 
<li key = {f.name} > {f.name} - {f.size} bytes</li>)}
</ul>
</aside>
{/*<h3 className="container"> OR </h3>
                            <div className="container" >
                            <input  type="file" name="selectedFile" onChange={this.onChange}  multiple/>
                           
                            <br/><br></br>*/}
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.onsuccessphotoupload}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Photos;

// class Photos extends Component {

//   onDrop = (files) => {

//     // axios.post('http://localhost:3001/location',data)
//     //       .then(response => {
//     //           console.log("Elli..........",response.data);
//     //           if (response.status === 200) {
//     //             this.setState({
//     //               authFlag: true
//     //             });
//     //             console.log("hello");
//     //           } else {
//     //             this.setState({
//     //               authFlag: false
//     //             });
//     //           }
//     //         });
//     //       });
//     //     }

//     // POST to a test endpoint for demo purposes
//     const req = request.post('http://localhost:3001/photos');

//     files.forEach(file => {
//       req.attach(file.name, file);
//     });

//     req.end();
//     console.log(req);
//   }

//   render() {
//     return (
//       <div className="app">
//         <ReactDropzone
//           onDrop={this.onDrop}
//         >
//           Drop your best gator GIFs here!!
//         </ReactDropzone>
//       </div>
//     );
//   }
// }

// export default Photos;
