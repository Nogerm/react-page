import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react'
import { getBirthdayPrayer, addBirthdayPrayer, updateBirthdayPrayer, removeBirthdayPrayer } from '../MongoDB';
const uuidv4 = require('uuid/v4');

export default class PrayerModal extends Component {

  state = {
    type: this.props.type,
    prayerId: this.props.prayerId || '',
    prayerMsgs: [],
    prayerMsg: this.props.prayerMsg || '',
    modalPrayerAddGroupShow: false,
    modalPrayerAddMsgShow: false,
    modalPrayerRemoveGroupShow: false,
    modalPrayerRemoveMsgShow: false,
    modalPrayerUpdateShow: false,
    inputMsgType: '',
    inputMsgContent: '',
    inputPkgId: '',
    inputStkrId: '',
  }
  
  modalPrayerAddGroupOpen = () => {
    this.setState({ modalPrayerAddGroupShow: true });
  }

  modalPrayerAddGroupClose = () => {
    this.setState({ modalPrayerAddGroupShow: false }, this.props.callback );
  }

  modalPrayerAddGroupSubmit = () => {
    const newData = {
      id: uuidv4(),
      msgs: []
    }
    addBirthdayPrayer(newData);
    this.modalPrayerAddGroupClose();
  }

  modalPrayerAddMsgOpen = () => {
    this.setState({
      modalPrayerAddMsgShow: true,
    }, () => {
      getBirthdayPrayer().then(data => {
        const msgGroup = data.find(group => group._id === this.state.prayerId);
        this.setState({
          prayerMsgs: [...msgGroup.msgs]
        });
      });
    });
  }

  modalPrayerAddMsgClose = () => {
    this.setState({ modalPrayerAddMsgShow: false }, this.props.callback );
  }

  modalPrayerAddMsgSubmit = () => {
    let msgs = [...this.state.prayerMsgs];
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
    updateBirthdayPrayer(this.state.prayerId, msgs)
    .then(() => {
      this.setState({
        prayerMsgs: msgs
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.prayerMsgs));
        this.modalPrayerAddMsgClose();
      });
    });
  }

  modalPrayerRemoveGroupOpen = () => {
    this.setState({ modalPrayerRemoveGroupShow: true });
  }

  modalPrayerRemoveGroupClose = () => {
    this.setState({ modalPrayerRemoveGroupShow: false }, this.props.callback );
  }

  modalPrayerRemoveGroupSubmit = () => {
    removeBirthdayPrayer(this.state.prayerId);
    this.modalPrayerRemoveGroupClose();
  }

  modalPrayerRemoveMsgOpen = () => {
    this.setState({
      modalPrayerRemoveMsgShow: true
    }, () => {
      getBirthdayPrayer().then(data => {
        console.log("[PrayerModal queryData]" + JSON.stringify(data));
        const msgGroup = data.find(group => group._id === this.state.prayerId);
        this.setState({
          prayerMsgs: [...msgGroup.msgs],
        });
      });
    });
  }

  modalPrayerRemoveMsgClose = () => {
    this.setState({ modalPrayerRemoveMsgShow: false }, this.props.callback );
  }

  modalPrayerRemoveMsgSubmit = () => {
    let msgs = [...this.state.prayerMsgs];
    const updateIdx = msgs.findIndex(item => item.id === this.state.prayerMsg.id);
    msgs.splice(updateIdx, 1);
    updateBirthdayPrayer(this.state.prayerId, msgs)
    .then(() => {
      this.setState({
        prayerMsgs: msgs
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.prayerMsgs));
        this.modalPrayerRemoveMsgClose();
      });
    });
  }

  modalPrayerUpdateOpen = () => {
    this.setState({
      modalPrayerUpdateShow: true
    }, () => {
      getBirthdayPrayer().then(data => {
        console.log("[PrayerModal queryData]" + JSON.stringify(data));
        const msgGroup = data.find(group => group._id === this.state.prayerId);
        this.setState({
          prayerMsgs: [...msgGroup.msgs],
        });
      });
    });
  }

  modalPrayerUpdateClose = () => {
    this.setState({ modalPrayerUpdateShow: false }, this.props.callback );
  }

  modalPrayerUpdateSubmit = () => {
    let msgs = [...this.state.prayerMsgs];
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

    const updateIdx = msgs.findIndex(item => item.id === this.state.prayerMsg.id);
    msgs.splice(updateIdx, 1, newData);
    updateBirthdayPrayer(this.state.prayerId, msgs)
    .then(() => {
      this.setState({
        prayerMsgs: msgs
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.prayerMsgs));
        this.modalPrayerUpdateClose();
      });
    });
  }

  radioChange = (e, { value }) => {
    this.setState({ inputMsgType: value })
  }

  render() {
    const modalType = this.state.type;
    const prayerMsg = this.state.prayerMsg;
    const radioChange = this.radioChange;

    if(modalType === 'ADD_GROUP') {
      return(
        <Modal open={this.state.modalPrayerAddGroupShow} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalPrayerAddGroupOpen}>
            <Icon name='plus' /> 新增訊息群組
          </Button>
          }>
          <Modal.Header>新增訊息群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalPrayerAddGroupSubmit} disabled={this.state.inputFirstname === '' || this.state.inputBirthMonth === '' || this.state.inputBirthDay === ''}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalPrayerAddGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'ADD_MSG') {
      return(
        <Modal open={this.state.modalPrayerAddMsgShow} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalPrayerAddMsgOpen}>
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
              <Button floated='right' color='green' onClick={this.modalPrayerAddMsgSubmit} disabled={this.state.inputMsgType === '' || (this.state.inputMsgType === 'text' && this.state.inputMsgContent === '') || (this.state.inputMsgType === 'sticker' && (this.state.inputPkgId === '' || this.state.inputStkrId === ''))}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalPrayerAddMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'UPDATE') {
      return(
        <Modal open={this.state.modalPrayerUpdateShow} trigger={
          <Button floated='right' icon labelPosition='left' color='vk' size='small' onClick={this.modalPrayerUpdateOpen}>
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
                    checked={prayerMsg.isText === true}
                    disabled={prayerMsg.isText === false}
                  />
                  <Form.Radio
                    label='貼圖'
                    value='sticker'
                    checked={prayerMsg.isText === false}
                    disabled={prayerMsg.isText === true}
                  />
                </Form.Group>
                <Form.TextArea label='文字訊息' placeholder={prayerMsg.text} disabled={prayerMsg.isText === false} onChange={e => {this.setState({inputMsgType: 'text', inputMsgContent: e.target.value});}}/>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='貼圖包序號' placeholder={prayerMsg.pkgId} disabled={prayerMsg.isText === true} onChange={e => {this.setState({inputMsgType: 'sticker', inputPkgId: e.target.value});}}/>
                  <Form.Input fluid label='貼圖序號' placeholder={prayerMsg.stkrId} disabled={prayerMsg.isText === true} onChange={e => {this.setState({inputMsgType: 'sticker', inputStkrId: e.target.value});}}/>
                </Form.Group>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalPrayerUpdateSubmit}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalPrayerUpdateClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )
    } else if(modalType === 'REMOVE_GROUP') {
      return(
        <Modal open={this.state.modalPrayerRemoveGroupShow} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalPrayerRemoveGroupOpen}>
            <Icon name='trash alternate' /> 移除群組
          </Button>
          }>
          <Modal.Header>移除群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這個群組?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalPrayerRemoveGroupSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalPrayerRemoveGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'REMOVE_MSG') {
      return(
        <Modal open={this.state.modalPrayerRemoveMsgShow} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalPrayerRemoveMsgOpen}>
            <Icon name='trash alternate' /> 移除
          </Button>
          }>
          <Modal.Header>移除訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這則訊息?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalPrayerRemoveMsgSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalPrayerRemoveMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else {}
  }
}