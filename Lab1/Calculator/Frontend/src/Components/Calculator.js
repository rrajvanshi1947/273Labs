import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux' ;
import {PropTypes} from 'prop-types'
import {calc} from '../Actions/action'


class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input1:'',
            input2:'',
        }
    }
    onInput1Change(event){
        this.setState({
            input1 : event.target.value
        })
    }
    onInput2Change(event){
        this.setState({
            input2 : event.target.value
        })
    }


    render() {
        return (
            <div class = "container">
            <br></br>
                <div class = "container">
                    <h1><strong>Calculator</strong></h1>
                </div>
                <hr/>
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-sm-2" for="input1">First Number :</label>
                        <div class="col-sm-3">
                            <input type="number" class="form-control" id="input1" name="input1"
                                   value={this.state.input1}
                                   onChange ={this.onInput1Change.bind(this)} autoFocus/>
                        </div>
                        <label class="control-label col-sm-2" for="input2">Second Number :</label>
                        <div class="col-sm-3">
                            <input type="number" class="form-control" id="input2" name="input2"
                                   value={this.state.input2}
                                   onChange = {this.onInput2Change.bind(this)}/>
                        </div>
                    </div>
                    
                    <div class = "form-group">
                        <label class="control-label col-sm-2" for="button">Button:</label>
                        <div class="d-flex">
                            <div class = "col-sm-1">
                                <button type = "button" class = "btn btn-dark mr-4"
                                        onClick = {() => {this.props.calc(this.state.input1, this.state.input2, 'ADD')}}>+</button>
                            </div>
                            <div class = "col-sm-1">
                                <button type = "button" class = "btn btn-dark mr-4"
                                        onClick = {() => {this.props.calc(this.state.input1, this.state.input2, 'SUB')}}>-</button>
                            </div>
                            <div class = "col-sm-1">
                                <button type = "button" class = "btn btn-dark mr-4"
                                        onClick = {() => {this.props.calc(this.state.input1, this.state.input2, 'MUL')}}>*</button>
                            </div>
                            <div class = "col-sm-1">
                                <button type = "button" class = "btn btn-dark mr-4"
                                        onClick = {() => {this.props.calc(this.state.input1, this.state.input2, 'DIV')}}>/</button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-group">
                            <label class="control-label col-sm-2" for="output">Output :</label>
                            <div class = "col-sm-3">
                                <input type = "number" class ="container" id ="output" name="output"
                                       value = {this.props.output} readOnly/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2">
                            <b>{this.props.error}</b>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}
Calculator.propTypes = {
    output: PropTypes.number

}



function mapDispatchToProps(dispatch) {
    return {
        calc : (input1 , input2 , action) => dispatch(calc(input1 , input2 , action))
    };
}



function mapStateToProps(state){

    return {
        output : state.reducer_calculator.output ,
        error : state.reducer_calculator.error
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(Calculator) ;
