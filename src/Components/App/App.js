import React, { Component } from 'react';
import logo from './logo.svg';
import { LogoImage } from './style';
import { Grid, Menu, Header } from 'semantic-ui-react'
import Birthday from './../Birthday';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  state = { 
    activeItem: '生日提醒' 
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderChild = () => {
    const { activeItem } = this.state;

    if(activeItem === '生日提醒') {
      return (
        <Birthday/>
      )
    } else if(activeItem === '分享提醒') {
      return (
        <div>分享提醒施工中</div>
      )
    } else if(activeItem === '自動回應') {
      return (
        <div>自動回應施工中</div>
      )
    } else if(activeItem === '週一祝福') {
      return (
        <div>週一祝福施工中</div>
      )
    }
  }

  render() {
    const { activeItem } = this.state;
    const renderChild = this.renderChild;

    return (
      <Grid>
        <Grid.Column width={3} style={{ 'background': '#4682B4', 'padding-right': 0 }}>
          <LogoImage src={logo}/>
          <Header as='h2' style={{ 'margin': '10px', 'color': 'white' }}>Control Center</Header>
          <Header as='h4' style={{ 'margin': '10px', 'color': 'white' }}>The Backend of Linebot.</Header>
          <Menu fluid vertical tabular style={{ 'margin-top': '50px' }}>
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
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {renderChild()}
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
