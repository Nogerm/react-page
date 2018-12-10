import React, { Component}  from 'react';
import { Container, LeftColumn, MidColumn, RightColumn, EditColumn } from './style';

export default class Item extends Component {
  render() {
    return (
    <Container>
      <LeftColumn></LeftColumn>
      <MidColumn>{this.props.name}</MidColumn>
      <RightColumn></RightColumn>
      <EditColumn></EditColumn>
    </Container>
    );
  }
}