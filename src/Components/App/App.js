import React, { Component } from 'react';
import logo from './logo.svg';
import { LogoImage } from './style';
import { Grid, Menu, Header } from 'semantic-ui-react'
import Birthday from './../Birthday';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  state = { 
    activeItem: 'birthday' 
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Grid>
        <Grid.Column width={3} style={{ 'background': '#4682B4', 'padding-right': 0 }}>
          <LogoImage src={logo}/>
          <Header as='h2' style={{ 'margin': '10px', 'color': 'white' }}>Control Center</Header>
          <Header as='h4' style={{ 'margin': '10px', 'color': 'white' }}>The Backend of Linebot.</Header>
          <Menu fluid vertical tabular style={{ 'margin-top': '50px' }}>
            <Menu.Item 
              name='birthday' 
              active={activeItem === 'birthday'} 
              onClick={this.handleItemClick} 
            />
            <Menu.Item 
              name='routine' 
              active={activeItem === 'routine'} 
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='bless'
              active={activeItem === 'bless'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Birthday/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
