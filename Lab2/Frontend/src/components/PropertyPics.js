import React, {Component} from 'react';
import {connect} from "react-redux";
// import "../styles/profileIconEditor.css";
// import {addprofilepicture} from "../../../../api/user/API_ADDprofilePicture"
import {Route, withRouter} from 'react-router-dom';
import cookie from "react-cookies";

 class PropertyPics extends Component {
    constructor() {
        super();
        this.state = {
            ownerid: ''
        }
    }
    componentWillMount(){
        this.state.ownerid = cookie.load('user')
    }

    changeProfilePicture(event) {

        // const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json'
};

const addprofilepicture = (payload) =>
    fetch(`http://localhost:3001/upload`, {
        method: 'POST',
        headers: {
            ...headers,
        },
        body:payload,
        credentials: 'include'
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

        //******************************************** */
    if(event.target.files.length < 2 || event.target.files.length > 5 ){
        alert('Please upload 2-5 images')
        return
    }
        var formData = new FormData();
        formData.append('userid', this.state.ownerid)
        console.log('Inside catch handler')
        console.log(event.target.files)
        for(var i = 0; i < event.target.files.length; i++){
            formData.append("photo", event.target.files[i]);
        }
        

        // console.log('Form data is\n' )
        // formData.values.forEach(value => {
        //     console.log(value)
        // })
        // console.log(formData.values())
        addprofilepicture(formData).then(function(){
            this.forceUpdate();
        }.bind(this));
    }


    render() {
        let stylecolor={
            color:"white"
        }
        let style = {
            height: (this.props.height || 20) + "px",
            width: (this.props.width || 20) + "px"

        };
        let image_url = this.props.username;
        console.log(image_url);

        return(
            <div className="profile-icon-editor" style={style}>
            {/*}    <img src={"http://localhost:3001/images/"+this.props.username+".jpg?_=" + Date.now()} alt={this.props.alt || "No profile picture "} />  */}
                <form>
                    <input className="hidden" type="file" multiple id="profile-icon-editor-input" onChange={this.changeProfilePicture.bind(this)}/>
                    <label htmlFor="profile-icon-editor-input" style={stylecolor}className="glyphicon glyphicon-pencil"></label>
                </form>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        username: state.email
    }
}
export default PropertyPics;