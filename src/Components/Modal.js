import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react'
import { updateBirthdayPerson } from './MongoDB';

export default class CustomModal extends Component {

  state = {
    type: this.props.type,
    person: this.props.person || '',
    modalUserAddShow: false,
    modalUserRemoveShow: false,
    modalUserUpdateShow: false,
    inputFirstname: '',
    inputLastName: '',
    inputBirthMonth: '',
    inputBirthDay: '',
  }
  
  modalUserAddOpen = () => {
    this.setState({ modalUserAddShow: true });
  }

  modalUserAddClose = () => {
    this.setState({ modalUserAddShow: false });
  }

  modalUserRemoveOpen = () => {
    this.setState({ modalUserRemoveShow: true });
  }

  modalUserRemoveClose = () => {
    this.setState({ modalUserRemoveShow: false });
  }

  modalUserUpdateOpen = () => {
    this.setState({ modalUserUpdateShow: true });
  }

  modalUserUpdateClose = () => {
    this.setState({ modalUserUpdateShow: false });
  }

  modalUserUpdateSubmit = () => {
    const newData = {
      id: this.state.person._id,
      firstname: (this.state.inputFirstname === '') ? this.state.person.firstname : this.state.inputFirstname,
      lastname: (this.state.inputLastName === '') ? this.state.person.lastname : this.state.inputLastName,
      birth_month: (this.state.inputBirthMonth === '') ? this.state.person.birth_month : this.state.inputBirthMonth,
      birth_day: (this.state.inputBirthDay === '') ? this.state.person.birth_day : this.state.inputBirthDay
    }
    updateBirthdayPerson(newData);
  }

  render() {
    const modalType = this.state.type;
    const personInfo = this.state.person;

    if(modalType === 'ADD') {
      return(
        <Modal open={this.state.modalUserAddShow} onClose={this.modalUserAddClose} trigger={
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
                  <input placeholder='名字' />
                </Form.Field>
                <Form.Field>
                  <label>姓氏</label>
                  <input placeholder='姓氏' />
                </Form.Field>
                <Form.Field>
                  <label>月份</label>
                  <input placeholder='月份' />
                </Form.Field>
                <Form.Field>
                  <label>日期</label>
                  <input placeholder='日期' />
                </Form.Field>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green'>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='red' onClick={this.modalUserAddClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'UPDATE') {
      return(
        <Modal open={this.state.modalUserUpdateShow}  onClose={this.modalUserUpdateClose} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalUserUpdateOpen}>
            <Icon name='pencil alternate' /> 編輯
          </Button>
          }>
          <Modal.Header>編輯生日提醒</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Field>
                  <label>名字</label>
                  <input placeholder={personInfo.firstname.toString()} onChange={e => {this.setState({inputFirstname: e.target.value});}} />
                </Form.Field>
                <Form.Field>
                  <label>姓氏</label>
                  <input placeholder={personInfo.lastname.toString()} onChange={e => {this.setState({inputLastName: e.target.value});}}/>
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
              <Button floated='right' color='red' onClick={this.modalUserUpdateClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )
    } else if(modalType === 'REMOVE') {
      return(
        <Modal open={this.state.modalUserRemoveShow} onClose={this.modalUserRemoveClose} trigger={
          <Button floated='right' icon labelPosition='left' negative size='small' onClick={this.modalUserRemoveOpen}>
            <Icon name='trash alternate' /> 移除
          </Button>
          }>
          <Modal.Header>移除生日提醒</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除{personInfo.firstname}的生日?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green'>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='red' onClick={this.modalUserRemoveClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else {}
  }
}