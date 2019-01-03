import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react'
import { addMondayBless, updateMondayBless, removeMondayBless } from '../MongoDB';
const uuidv4 = require('uuid/v4');

export default class BlessModal extends Component {

  state = {
    type: this.props.type,
    blessId: this.props.blessId || '',
    blessMsgs: this.props.blessMsgs || [],
    msgIdx: this.props.msgIdx || 0,
    modalBlessAddGroupShow: false,
    modalBlessAddMsgShow: false,
    modalBlessRemoveGroupShow: false,
    modalBlessRemoveMsgShow: false,
    modalBlessUpdateShow: false,
    inputMsgType: '',
    inputMsgContent: '',
    inputPkgId: '',
    inputStkrId: '',
  }
  
  modalBlessAddGroupOpen = () => {
    this.setState({ modalBlessAddGroupShow: true });
  }

  modalBlessAddGroupClose = () => {
    this.setState({ modalBlessAddGroupShow: false }, this.props.callback );
  }

  modalBlessAddGroupSubmit = () => {
    const newData = {
      id: uuidv4(),
      msgs: []
    }
    addMondayBless(newData);
    this.modalBlessAddGroupClose();
  }

  modalBlessAddMsgOpen = () => {
    this.setState({ modalBlessAddMsgShow: true });
  }

  modalBlessAddMsgClose = () => {
    this.setState({ modalBlessAddMsgShow: false }, this.props.callback );
  }

  modalBlessAddMsgSubmit = () => {
    let msgs = [...this.state.blessMsgs];
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
    this.modalBlessAddMsgClose();
    updateMondayBless(this.state.blessId, msgs)
    .then(() => {
      this.setState({
        blessMsgs: msgs
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.blessMsgs));
      });
    });
  }

  modalBlessRemoveGroupOpen = () => {
    this.setState({ modalBlessRemoveGroupShow: true });
  }

  modalBlessRemoveGroupClose = () => {
    this.setState({ modalBlessRemoveGroupShow: false }, this.props.callback );
  }

  modalBlessRemoveGroupSubmit = () => {
    removeMondayBless(this.state.blessId);
    this.modalBlessRemoveGroupClose();
  }

  modalBlessRemoveMsgOpen = () => {
    this.setState({ modalBlessRemoveMsgShow: true });
  }

  modalBlessRemoveMsgClose = () => {
    this.setState({ modalBlessRemoveMsgShow: false }, this.props.callback );
  }

  modalBlessRemoveMsgSubmit = () => {
    let msgs = [...this.state.blessMsgs];
    msgs.splice(this.state.msgIdx, 1);
    this.modalBlessRemoveMsgClose();
    updateMondayBless(this.state.blessId, msgs)
    .then(() => {
      this.setState({
        blessMsgs: msgs
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.blessMsgs));
      });
    });
  }

  modalBlessUpdateOpen = () => {
    this.setState({ modalBlessUpdateShow: true });
  }

  modalBlessUpdateClose = () => {
    this.setState({ modalBlessUpdateShow: false }, this.props.callback );
  }

  modalBlessUpdateSubmit = () => {
    let msgs = [...this.state.blessMsgs];
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
    this.modalBlessUpdateClose();
    updateMondayBless(this.state.blessId, msgs)
    .then(() => {
      this.setState({
        blessMsgs: msgs
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.blessMsgs));
      });
    });
  }

  radioChange = (e, { value }) => {
    this.setState({ inputMsgType: value })
  }

  render() {
    const modalType = this.state.type;
    const blessMsgs = this.state.blessMsgs;
    const blessMsgIdx = this.state.msgIdx;
    const radioChange = this.radioChange;

    if(modalType === 'ADD_GROUP') {
      return(
        <Modal open={this.state.modalBlessAddGroupShow} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalBlessAddGroupOpen}>
            <Icon name='plus' /> 新增訊息群組
          </Button>
          }>
          <Modal.Header>新增訊息群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalBlessAddGroupSubmit} disabled={this.state.inputFirstname === '' || this.state.inputBirthMonth === '' || this.state.inputBirthDay === ''}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalBlessAddGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'ADD_MSG') {
      return(
        <Modal open={this.state.modalBlessAddMsgShow} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalBlessAddMsgOpen}>
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
              <Button floated='right' color='green' onClick={this.modalBlessAddMsgSubmit} disabled={this.state.inputMsgType === '' || (this.state.inputMsgType === 'text' && this.state.inputMsgContent === '') || (this.state.inputMsgType === 'sticker' && (this.state.inputPkgId === '' || this.state.inputStkrId === ''))}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalBlessAddMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'UPDATE') {
      return(
        <Modal open={this.state.modalBlessUpdateShow} trigger={
          <Button floated='right' icon labelPosition='left' color='vk' size='small' onClick={this.modalBlessUpdateOpen}>
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
                    checked={blessMsgs[blessMsgIdx].isText === true}
                    disabled={blessMsgs[blessMsgIdx].isText === false}
                  />
                  <Form.Radio
                    label='貼圖'
                    value='sticker'
                    checked={blessMsgs[blessMsgIdx].isText === false}
                    disabled={blessMsgs[blessMsgIdx].isText === true}
                  />
                </Form.Group>
                <Form.TextArea label='文字訊息' placeholder={blessMsgs[blessMsgIdx].text} disabled={blessMsgs[blessMsgIdx].isText === false} onChange={e => {this.setState({inputMsgType: 'text', inputMsgContent: e.target.value});}}/>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='貼圖包序號' placeholder={blessMsgs[blessMsgIdx].pkgId} disabled={blessMsgs[blessMsgIdx].isText === true} onChange={e => {this.setState({inputMsgType: 'sticker', inputPkgId: e.target.value});}}/>
                  <Form.Input fluid label='貼圖序號' placeholder={blessMsgs[blessMsgIdx].stkrId} disabled={blessMsgs[blessMsgIdx].isText === true} onChange={e => {this.setState({inputMsgType: 'sticker', inputStkrId: e.target.value});}}/>
                </Form.Group>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalBlessUpdateSubmit}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalBlessUpdateClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )
    } else if(modalType === 'REMOVE_GROUP') {
      return(
        <Modal open={this.state.modalBlessRemoveGroupShow} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalBlessRemoveGroupOpen}>
            <Icon name='trash alternate' /> 移除群組
          </Button>
          }>
          <Modal.Header>移除群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這個群組?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalBlessRemoveGroupSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalBlessRemoveGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'REMOVE_MSG') {
      return(
        <Modal open={this.state.modalBlessRemoveMsgShow} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalBlessRemoveMsgOpen}>
            <Icon name='trash alternate' /> 移除
          </Button>
          }>
          <Modal.Header>移除訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這則訊息?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalBlessRemoveMsgSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalBlessRemoveMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else {}
  }
}