import React, { Component } from 'react';
import logo from './logo.svg';
import { LogoImage } from './style';
import { Grid, Menu, Header, Container } from 'semantic-ui-react'
import Birthday from './../Birthday';
import Routine from './../Routine';
import MondayBless from './../MondayBless/MondayBless';
import AutoReply from './../AutoReply/AutoReply';
import Setting from './../Setting';
import FakePage from './../FakePage';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  state = {
    clickCount: 0,
    activeItem: '生日提醒' 
  }

  handleHiddenBtnClick = (e, { name }) => this.setState({ clickCount: this.state.clickCount +1 });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderMenu = () => {
    const { activeItem } = this.state;

    return (
      <Container>
        <LogoImage src={logo}/>
        <Header as='h2' style={{ 'margin': '10px', 'color': 'white' }}>Control Center</Header>
        <Header as='h4' style={{ 'margin': '10px', 'color': 'white' }}>The Backend of Linebot.</Header>
        <Menu fluid vertical tabular style={{ 'marginTop': '50px' }}>
          <Menu.Item 
            name='生日提醒' 
            active={activeItem === '生日提醒'} 
            onClick={this.handleItemClick} 
          />
          <Menu.Item 
            name='分享提醒' 
            active={activeItem === '分享提醒'} 
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='自動回應'
            active={activeItem === '自動回應'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='週一祝福'
            active={activeItem === '週一祝福'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='功能開關'
            active={activeItem === '功能開關'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Container>
    )
  }

  renderChild = () => {
    const { activeItem } = this.state;

    if(activeItem === '生日提醒') {
      return (
        <Birthday/>
      )
    } else if(activeItem === '分享提醒') {
      return (
        <Routine/>
      )
    } else if(activeItem === '自動回應') {
      return (
        <AutoReply/>
      )
    } else if(activeItem === '週一祝福') {
      return (
        <MondayBless/>
      )
    } else if(activeItem === '功能開關') {
      return (
        <Setting/>
      )
    }
  }

  renderDashboard = () => {
    const renderChild = this.renderChild;
    const renderMenu = this.renderMenu;

    return (
      <Grid>
        <Grid.Column width={3} style={{ background: '#4682B4', paddingRight: 0, height: '100vh' }}>
          {renderMenu()}
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {renderChild()}
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    const renderDashboard = this.renderDashboard;
    const handleHiddenBtnClick = this.handleHiddenBtnClick;

    if(this.state.clickCount > 10) {
      return(
        <Container>
          {renderDashboard()}
        </Container>
      )
    } else {
      return(
        <FakePage callback={handleHiddenBtnClick}/>
      )
    }
  }
}

export default App;
