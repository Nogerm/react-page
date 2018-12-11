import React, { Component } from 'react';
import logo from './logo.svg';
import { Container, LeftColumn, RightColumn, LogoImage, ContentText } from './style';
import { getBirthdayPerson, getBirthdayPrayer } from '../MongoDB';
import ItemList from '../ItemList/ItemList';

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
      <Container>
        <LeftColumn>
          <LogoImage src={logo}/>
            <ContentText>Edit <code>src/App.js</code> and save to reload.</ContentText>
            <ContentText>Query Mongodb Data</ContentText>
        </LeftColumn>
        <RightColumn>
          <ItemList data={this.state.birthdayPerson}/>
        </RightColumn>
      </Container>
    );
  }
}

export default App;
