import React, { Component}  from 'react';
import { Container, LeftColumn, MidColumn, RightColumn, EditColumn } from './style';

export default class Item extends Component {
  render() {
    return (
    <Container>
      <LeftColumn>{this.props.name}</LeftColumn>
      <MidColumn>{this.props.month}</MidColumn>
      <RightColumn>{this.props.day}</RightColumn>
      <EditColumn></EditColumn>
    </Container>
    );
  }
}