import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Main from './components/Main';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
