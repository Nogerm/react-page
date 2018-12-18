import React, { Component } from 'react';
import logo from './logo.svg';
import { Container, LeftColumn, RightColumn, LogoImage, ContentText } from './style';
import Birthday from './../Birthday';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  render() {
    return (
      <Container>
        <LeftColumn>
          <LogoImage src={logo}/>
            <ContentText>Edit <code>src/App.js</code> and save to reload.</ContentText>
            <ContentText>Query Mongodb Data</ContentText>
        </LeftColumn>
        <RightColumn>
          <Birthday/>
        </RightColumn>
      </Container>
    );
  }
}

export default App;
