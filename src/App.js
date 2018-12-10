import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

//Mongo DB
const BASE_URL = 'https://api.mlab.com/api/1/';
const API_KEY = '6ibiq_TR4zPfOIaRWNvlknaHWYDpyGLQ';
const dbName = 'heroku_0tvjhrct';

//Collections
const BIRTHDAY_PERSON = 'birthday_person';
const BIRTHDAY_PRAYER = 'birthday_prayer';

//Query URLs
const BIRTHDAY_PERSON_URL = BASE_URL + 'databases/' + dbName + '/collections/' + BIRTHDAY_PERSON;
const BIRTHDAY_PRAYER_URL = BASE_URL + 'databases/' + dbName + '/collections/' + BIRTHDAY_PRAYER;

class App extends Component {

  componentDidMount() {
    //query berthday person
    axios.get(BIRTHDAY_PERSON_URL, {
      params: {
        apiKey: API_KEY
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
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
