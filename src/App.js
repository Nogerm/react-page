import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getBirthdayPerson, getBirthdayPrayer } from './Components/MongoDB';


class App extends Component {

  componentDidMount() {
    getBirthdayPerson().then(data => {
      console.log("[componentDidMount]" + JSON.stringify(data));
    });

    getBirthdayPrayer().then(data => {
      console.log("[componentDidMount]" + JSON.stringify(data));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>Query Mongodb Data</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
