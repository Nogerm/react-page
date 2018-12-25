import React, { Component } from 'react';
import { Container, Form, Checkbox, Button, Label } from 'semantic-ui-react';

export default class Setting extends Component {

  state = {
    account: '',
    password: '',
    checked: false,
    wrongPassword: false
  }

  handleFakeClick = () => {
    this.setState({
      wrongPassword: true
    });
  }

  renderLabel = () => {
    if(this.state.wrongPassword) {
      return(
        <Label as='a' basic color='red'  style={{ width: '100%', marginBottom: '10px'}}>帳號或密碼錯誤</Label>
      )
    } 
  }

  render() {
    const handleClick = this.props.callback;
    const handleFakeClick = this.handleFakeClick;
    const renderLabel = this.renderLabel;

    return(
      <Container style={{ height: '100vh', width: '100vw', display: 'flex'}}>
        <Form style={{ height: '40%', width: '20%', margin: 'auto'}}>
          <Form.Field>
            <label>帳號</label>
            <input placeholder='管理員帳號' onChange={e => {this.setState({account: e.target.value});}}/>
          </Form.Field>
          <Form.Field>
            <label>密碼</label>
            <input type='password' placeholder='管理員密碼' onChange={e => {this.setState({password: e.target.value});}}/>
          </Form.Field>
          <Form.Field>
            <Checkbox label='我會小心操作' checked={this.state.checked} onChange={e => {this.setState({checked: !this.state.checked});}}/>
          </Form.Field>
          {renderLabel()}
          <Button onClick={handleFakeClick} primary style={{ width: '100%' }} disabled={!this.state.checked || this.state.account === '' || this.state.password === ''}>登入</Button>
        </Form>
        <Button onClick={handleClick} style={{ position: 'absolute', right: '0px', height: '100px', width: '100px', background: 'white' }}></Button>
      </Container>
    )
  }
}
