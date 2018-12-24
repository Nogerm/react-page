import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react'
import { addRoutineReminder, updateRoutineReminder, removeRoutineReminder } from '../MongoDB';
const uuidv4 = require('uuid/v4');

export default class ReminderModal extends Component {

  state = {
    type: this.props.type,
    reminderId: this.props.reminderId || '',
    reminderMsgs: this.props.reminderMsgs || [],
    msgIdx: this.props.msgIdx || 0,
    modalReminderAddGroupShow: false,
    modalReminderAddMsgShow: false,
    modalReminderRemoveGroupShow: false,
    modalReminderRemoveMsgShow: false,
    modalReminderUpdateShow: false,
    inputMsgType: '',
    inputMsgContent: '',
    inputPkgId: '',
    inputStkrId: '',
  }
  
  modalReminderAddGroupOpen = () => {
    this.setState({ modalReminderAddGroupShow: true });
  }

  modalReminderAddGroupClose = () => {
    this.setState({ modalReminderAddGroupShow: false });
  }

  modalReminderAddGroupSubmit = () => {
    const newData = {
      id: uuidv4(),
      msgs: []
    }
    addRoutineReminder(newData);
    this.modalReminderAddGroupClose();
  }

  modalReminderAddMsgOpen = () => {
    this.setState({ modalReminderAddMsgShow: true });
  }

  modalReminderAddMsgClose = () => {
    this.setState({ modalReminderAddMsgShow: false });
  }

  modalReminderAddMsgSubmit = () => {
    let msgs = [...this.state.reminderMsgs];
    let newData = '';
    const isText = (this.state.inputMsgType === 'text') ? true : false;

    if(isText) {
      newData = {
        id: uuidv4(),
        isText: isText,
        text: this.state.inputMsgContent
      }
    } else {
      newData = {
        id: uuidv4(),
        isText: isText,
        pkgId: this.state.inputPkgId,
        stkrId: this.state.inputStkrId
      }
    }

    msgs.push(newData);
    this.modalReminderAddMsgClose();
    updateRoutineReminder(this.state.reminderId, msgs)
    .then(() => {
      this.setState({
        reminderMsgs: msgs
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.reminderMsgs));
      });
    });
  }

  modalReminderRemoveGroupOpen = () => {
    this.setState({ modalReminderRemoveGroupShow: true });
  }

  modalReminderRemoveGroupClose = () => {
    this.setState({ modalReminderRemoveGroupShow: false });
  }

  modalReminderRemoveGroupSubmit = () => {
    removeRoutineReminder(this.state.reminderId);
    this.modalReminderRemoveGroupClose();
  }

  modalReminderRemoveMsgOpen = () => {
    this.setState({ modalReminderRemoveMsgShow: true });
  }

  modalReminderRemoveMsgClose = () => {
    this.setState({ modalReminderRemoveMsgShow: false });
  }

  modalReminderRemoveMsgSubmit = () => {
    let msgs = [...this.state.reminderMsgs];
    msgs.splice(this.state.msgIdx, 1);
    this.modalReminderRemoveMsgClose();
    updateRoutineReminder(this.state.reminderId, msgs)
    .then(() => {
      this.setState({
        reminderMsgs: msgs
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.reminderMsgs));
      });
    });
  }

  modalReminderUpdateOpen = () => {
    this.setState({ modalReminderUpdateShow: true });
  }

  modalReminderUpdateClose = () => {
    this.setState({ modalReminderUpdateShow: false });
  }

  modalReminderUpdateSubmit = () => {
    let msgs = [...this.state.reminderMsgs];
    let newData = '';
    const isText = (this.state.inputMsgType === 'text') ? true : false;

    if(isText) {
      newData = {
        id: uuidv4(),
        isText: isText,
        text: this.state.inputMsgContent
      }
    } else {
      newData = {
        id: uuidv4(),
        isText: isText,
        pkgId: this.state.inputPkgId,
        stkrId: this.state.inputStkrId
      }
    }

    msgs.splice(this.state.msgIdx, 1, newData);
    this.modalReminderUpdateClose();
    updateRoutineReminder(this.state.reminderId, msgs)
    .then(() => {
      this.setState({
        reminderMsgs: msgs
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.reminderMsgs));
      });
    });
  }

  radioChange = (e, { value }) => {
    this.setState({ inputMsgType: value })
  }

  reloadData = () => {
    const callback = this.props.callback;
    setTimeout(function() {
      callback();
    }, 2000);
  }

  render() {
    const modalType = this.state.type;
    const reminderMsgs = this.state.reminderMsgs;
    const reminderMsgIdx = this.state.msgIdx;
    const radioChange = this.radioChange;

    if(modalType === 'ADD_GROUP') {
      return(
        <Modal open={this.state.modalReminderAddGroupShow} onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalReminderAddGroupOpen}>
            <Icon name='plus' /> 新增訊息群組
          </Button>
          }>
          <Modal.Header>新增訊息群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalReminderAddGroupSubmit} disabled={this.state.inputFirstname === '' || this.state.inputBirthMonth === '' || this.state.inputBirthDay === ''}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderAddGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'ADD_MSG') {
      return(
        <Modal open={this.state.modalReminderAddMsgShow} onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalReminderAddMsgOpen}>
            <Icon name='plus' /> 新增訊息
          </Button>
          }>
          <Modal.Header>新增訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group inline>
                  <label>訊息類型</label>
                  <Form.Radio
                    label='文字'
                    value='text'
                    checked={this.state.inputMsgType === 'text'}
                    onChange={radioChange}
                  />
                  <Form.Radio
                    label='貼圖'
                    value='sticker'
                    checked={this.state.inputMsgType === 'sticker'}
                    onChange={radioChange}
                  />
                </Form.Group>
                <Form.TextArea label='文字訊息' placeholder='訊息內容' disabled={this.state.inputMsgType === '' ||　this.state.inputMsgType === 'sticker'} onChange={e => {this.setState({inputMsgContent: e.target.value});}}/>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='貼圖包序號' placeholder='貼圖包序號' disabled={this.state.inputMsgType === '' ||　this.state.inputMsgType === 'text'} onChange={e => {this.setState({inputPkgId: e.target.value});}}/>
                  <Form.Input fluid label='貼圖序號' placeholder='貼圖序號' disabled={this.state.inputMsgType === '' ||　this.state.inputMsgType === 'text'} onChange={e => {this.setState({inputStkrId: e.target.value});}}/>
                </Form.Group>
              </Form>              
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalReminderAddMsgSubmit} disabled={this.state.inputMsgType === '' || (this.state.inputMsgType === 'text' && this.state.inputMsgContent === '') || (this.state.inputMsgType === 'sticker' && (this.state.inputPkgId === '' || this.state.inputStkrId === ''))}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderAddMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'UPDATE') {
      return(
        <Modal open={this.state.modalReminderUpdateShow}  onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalReminderUpdateOpen}>
            <Icon name='pencil alternate' /> 編輯
          </Button>
          }>
          <Modal.Header>編輯訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group inline>
                  <label>訊息類型</label>
                  <Form.Radio
                    label='文字'
                    value='text'
                    checked={reminderMsgs[reminderMsgIdx].isText === true}
                    disabled={reminderMsgs[reminderMsgIdx].isText === false}
                  />
                  <Form.Radio
                    label='貼圖'
                    value='sticker'
                    checked={reminderMsgs[reminderMsgIdx].isText === false}
                    disabled={reminderMsgs[reminderMsgIdx].isText === true}
                  />
                </Form.Group>
                <Form.TextArea label='文字訊息' placeholder={reminderMsgs[reminderMsgIdx].text} disabled={reminderMsgs[reminderMsgIdx].isText === false} onChange={e => {this.setState({inputMsgContent: e.target.value});}}/>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='貼圖包序號' placeholder={reminderMsgs[reminderMsgIdx].pkgId} disabled={reminderMsgs[reminderMsgIdx].isText === true} onChange={e => {this.setState({inputPkgId: e.target.value});}}/>
                  <Form.Input fluid label='貼圖序號' placeholder={reminderMsgs[reminderMsgIdx].stkrId} disabled={reminderMsgs[reminderMsgIdx].isText === true} onChange={e => {this.setState({inputStkrId: e.target.value});}}/>
                </Form.Group>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalReminderUpdateSubmit}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderUpdateClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )
    } else if(modalType === 'REMOVE_GROUP') {
      return(
        <Modal open={this.state.modalReminderRemoveGroupShow} onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalReminderRemoveGroupOpen}>
            <Icon name='trash alternate' /> 移除群組
          </Button>
          }>
          <Modal.Header>移除群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這個群組?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalReminderRemoveGroupSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderRemoveGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'REMOVE_MSG') {
      return(
        <Modal open={this.state.modalReminderRemoveMsgShow} onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalReminderRemoveMsgOpen}>
            <Icon name='trash alternate' /> 移除
          </Button>
          }>
          <Modal.Header>移除訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這則訊息?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalReminderRemoveMsgSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalReminderRemoveMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else {}
  }
}