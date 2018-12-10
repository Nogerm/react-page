import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getBirthdayPerson, getBirthdayPrayer } from './Components/MongoDB';
import ItemList from './Components/ItemList/ItemList';

class App extends Component {

  state = {
    birthdayPerson: [],
  }

  componentDidMount() {
    getBirthdayPerson().then(data => {
      console.log("[componentDidMount]" + JSON.stringify(data));
      this.setState({
        birthdayPerson: [...data]
      });
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
        <ItemList data={this.state.birthdayPerson}/>
      </div>
    );
  }
}

export default App;
