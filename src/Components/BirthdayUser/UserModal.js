import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Input } from 'semantic-ui-react'
import { addBirthdayPerson, updateBirthdayPerson, removeBirthdayPerson } from '../MongoDB';
const uuidv4 = require('uuid/v4');

export default class UserModal extends Component {

  state = {
    type: this.props.type,
    person: this.props.person || '',
    modalUserAddShow: false,
    modalUserRemoveShow: false,
    modalUserUpdateShow: false,
    inputName: '',
    inputBirthMonth: '',
    inputBirthDay: '',
  }
  
  modalUserAddOpen = () => {
    this.setState({ modalUserAddShow: true });
  }

  modalUserAddClose = () => {
    this.setState({ modalUserAddShow: false }, this.props.callback);
  }

  modalUserAddSubmit = () => {
    const newData = {
      id: uuidv4(),
      name: this.state.inputName,
      birth_month: this.state.inputBirthMonth,
      birth_day: this.state.inputBirthDay
    }
    addBirthdayPerson(newData);
    this.modalUserAddClose();
  }

  modalUserRemoveOpen = () => {
    this.setState({ modalUserRemoveShow: true });
  }

  modalUserRemoveClose = () => {
    this.setState({ modalUserRemoveShow: false }, this.props.callback);
  }

  modalUserRemoveSubmit = () => {
    removeBirthdayPerson(this.state.person._id);
    this.modalUserRemoveClose();
  }

  modalUserUpdateOpen = () => {
    this.setState({ modalUserUpdateShow: true });
  }

  modalUserUpdateClose = () => {
    this.setState({ modalUserUpdateShow: false }, this.props.callback );
  }

  modalUserUpdateSubmit = () => {
    const newData = {
      id: this.state.person._id,
      name: (this.state.inputName === '') ? this.state.person.name : this.state.inputName,
      birth_month: (this.state.inputBirthMonth === '') ? this.state.person.birth_month : this.state.inputBirthMonth,
      birth_day: (this.state.inputBirthDay === '') ? this.state.person.birth_day : this.state.inputBirthDay
    }
    updateBirthdayPerson(newData);
    this.modalUserUpdateClose();
  }

  render() {
    const modalType = this.state.type;
    const personInfo = this.state.person;

    if(modalType === 'ADD') {
      return(
        <Modal open={this.state.modalUserAddShow} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalUserAddOpen}>
            <Icon name='user plus' /> 新增生日提醒
          </Button>
          }>
          <Modal.Header>新增生日提醒</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Field>
                  <label>名字</label>
                  <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='名字' onChange={e => {this.setState({inputName: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>月份</label>
                  <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='月份' onChange={e => {this.setState({inputBirthMonth: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>日期</label>
                  <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='日期' onChange={e => {this.setState({inputBirthDay: e.target.value});}}/>
                </Form.Field>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalUserAddSubmit} disabled={this.state.inputFirstname === '' || this.state.inputBirthMonth === '' || this.state.inputBirthDay === ''}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalUserAddClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'UPDATE') {
      return(
        <Modal open={this.state.modalUserUpdateShow} trigger={
          <Button floated='right' icon labelPosition='left' color='vk' size='small' onClick={this.modalUserUpdateOpen}>
            <Icon name='pencil alternate' /> 編輯
          </Button>
          }>
          <Modal.Header>編輯生日提醒</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Field>
                  <label>名字</label>
                  <input placeholder={personInfo.name.toString()} onChange={e => {this.setState({inputName: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>月份</label>
                  <input placeholder={personInfo.birth_month.toString()} onChange={e => {this.setState({inputBirthMonth: e.target.value});}}/>
                </Form.Field>
                <Form.Field>
                  <label>日期</label>
                  <input placeholder={personInfo.birth_day.toString()} onChange={e => {this.setState({inputBirthDay: e.target.value});}} />
                </Form.Field>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalUserUpdateSubmit}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalUserUpdateClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )
    } else if(modalType === 'REMOVE') {
      return(
        <Modal open={this.state.modalUserRemoveShow} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalUserRemoveOpen}>
            <Icon name='trash alternate' /> 移除
          </Button>
          }>
          <Modal.Header>移除生日提醒</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除{personInfo.name}的生日?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalUserRemoveSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalUserRemoveClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else {}
  }
}