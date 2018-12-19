import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

class Slideshow extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
  }
  render() {
    // var details = this.props.properties.map(function(property, index) {
        // console.log({property} + 'sjbfk');
    //   return (
    //     <div data-src={property.img1} />
        
    //   );
    // });

    // return (
    //         console.log(property.img1)

    //         <AwesomeSlider className = "container" slider-height-percentage = "20%">

    //       <div data-src={property.img1} />
    //       <div data-src={property.img2} />
    //       <div data-src={property.img3} />
    //       </AwesomeSlider>

    //     )});

    return
    console.log(this.props.properties);
    <div>
    <AwesomeSlider className="container" slider-height-percentage="20%">
    <div data-src={this.props.properties.img1} />
        </AwesomeSlider>
    </div>;
  }
}
export default Slideshow;
