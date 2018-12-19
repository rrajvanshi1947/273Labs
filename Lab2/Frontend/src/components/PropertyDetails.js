import React, { Component } from 'react';

class PropertyDetails extends Component {
    state = {  }
    render() { 
        return (<div style={{ width: "30%" }}>
        <br></br>
        <button 
          onClick={this.createBook}
          class="btn btn-success"
          type="submit"
        >
          Back to Search
        </button>
        <ul display= "inline">
<li><a href="#">Overview</a></li>
<li><a href="#">Amenitites</a></li>
<li><a href="#">Reviews</a></li>
<li><a href="#">Maps</a></li>
</ul>
      </div>  );
    }
}
 
export default PropertyDetails;