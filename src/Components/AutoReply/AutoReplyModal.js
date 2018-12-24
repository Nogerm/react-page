import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Input } from 'semantic-ui-react'
import { addAutoReply, updateAutoReply, removeAutoReply } from '../MongoDB';
const uuidv4 = require('uuid/v4');

export default class AutoReplyModal extends Component {

  state = {
    type: this.props.type,
    autoReply: this.props.autoReply || '',
    msgIdx: this.props.msgIdx || 0,
    modalAutoReplyAddGroupShow: false,
    modalAutoReplyAddMsgShow: false,
    modalAutoReplyAddKeywordShow: false,
    modalAutoReplyRemoveGroupShow: false,
    modalAutoReplyRemoveMsgShow: false,
    modalAutoReplyUpdateShow: false,
    inputMsgType: '',
    inputKeyword: '',
    inputMsgContent: '',
    inputPkgId: '',
    inputStkrId: '',
  }
  
  modalAutoReplyAddGroupOpen = () => {
    this.setState({ modalAutoReplyAddGroupShow: true });
  }

  modalAutoReplyAddGroupClose = () => {
    this.setState({ modalAutoReplyAddGroupShow: false });
  }

  modalAutoReplyAddGroupSubmit = () => {
    const newData = {
      id: uuidv4(),
      key_words: [],
      response_msgs: []
    }
    addAutoReply(newData);
    this.modalAutoReplyAddGroupClose();
  }

  modalAutoReplyAddMsgOpen = () => {
    this.setState({ modalAutoReplyAddMsgShow: true });
  }

  modalAutoReplyAddMsgClose = () => {
    this.setState({ modalAutoReplyAddMsgShow: false });
  }

  modalAutoReplyAddMsgSubmit = () => {
    let autoReplyCopy = [...this.state.autoReply];
    let newMsg = '';
    const isText = (this.state.inputMsgType === 'text') ? true : false;

    if(isText) {
      newMsg = {
        id: uuidv4(),
        isText: isText,
        text: this.state.inputMsgContent
      }
    } else {
      newMsg = {
        id: uuidv4(),
        isText: isText,
        pkgId: this.state.inputPkgId,
        stkrId: this.state.inputStkrId
      }
    }
    autoReplyCopy.response_msgs.push(newMsg);
    
    this.modalAutoReplyAddMsgClose();
    updateAutoReply(autoReplyCopy)
    .then(() => {
      this.setState({
        autoReply: autoReplyCopy
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.autoReply));
      });
    });
  }

  modalAutoReplyAddKeywordOpen = () => {
    this.setState({ modalAutoReplyAddKeywordShow: true });
  }

  modalAutoReplyAddKeywordClose = () => {
    this.setState({ modalAutoReplyAddKeywordShow: false });
  }

  modalAutoReplyAddKeywordSubmit = () => {
    let autoReplyCopy = [...this.state.autoReply];
    const newKeyword = this.state.inputKeyword;
 
    autoReplyCopy.key_words.push(newKeyword);

    this.modalAutoReplyAddKeywordClose();
    updateAutoReply(autoReplyCopy)
    .then(() => {
      this.setState({
        autoReply: autoReplyCopy
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.autoReply));
      });
    });
  }

  modalAutoReplyRemoveGroupOpen = () => {
    this.setState({ modalAutoReplyRemoveGroupShow: true });
  }

  modalAutoReplyRemoveGroupClose = () => {
    this.setState({ modalAutoReplyRemoveGroupShow: false });
  }

  modalAutoReplyRemoveGroupSubmit = () => {
    removeAutoReply(this.state.autoReply._id);
    this.modalAutoReplyRemoveGroupClose();
  }

  modalAutoReplyRemoveMsgOpen = () => {
    this.setState({ modalAutoReplyRemoveMsgShow: true });
  }

  modalAutoReplyRemoveMsgClose = () => {
    this.setState({ modalAutoReplyRemoveMsgShow: false });
  }

  modalAutoReplyRemoveMsgSubmit = () => {
    let autoReplyCopy = [...this.state.autoReply];
    autoReplyCopy.response_msgs.splice(this.state.msgIdx, 1);
    this.modalAutoReplyRemoveMsgClose();
    updateAutoReply(autoReplyCopy)
    .then(() => {
      this.setState({
        autoReply: autoReplyCopy
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.autoReply));
      });
    });
  }

  modalAutoReplyUpdateOpen = () => {
    this.setState({ modalAutoReplyUpdateShow: true });
  }

  modalAutoReplyUpdateClose = () => {
    this.setState({ modalAutoReplyUpdateShow: false });
  }

  modalAutoReplyUpdateSubmit = () => {
    let autoReplyCopy = [...this.state.autoReply];
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

    autoReplyCopy.response_msgs.splice(this.state.msgIdx, 1, newData);
    this.modalAutoReplyUpdateClose();
    updateAutoReply(autoReplyCopy)
    .then(() => {
      this.setState({
        autoReply: autoReplyCopy
      }, () => {
        console.log("NEW STATE: "+JSON.stringify(this.state.autoReply));
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
    const autoReplyMsgs = this.state.autoReply.response_msgs;
    const autoReplyMsgIdx = this.state.msgIdx;
    const radioChange = this.radioChange;

    if(modalType === 'ADD_GROUP') {
      return(
        <Modal open={this.state.modalAutoReplyAddGroupShow} onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalAutoReplyAddGroupOpen}>
            <Icon name='plus' /> 新增訊息群組
          </Button>
          }>
          <Modal.Header>新增訊息群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalAutoReplyAddGroupSubmit} disabled={this.state.inputFirstname === '' || this.state.inputBirthMonth === '' || this.state.inputBirthDay === ''}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalAutoReplyAddGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'ADD_KEY') {
      return(
        <Modal open={this.state.modalAutoReplyAddKeywordShow} onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalAutoReplyAddKeywordOpen}>
            <Icon name='plus' /> 新增關鍵字
          </Button>
          }>
          <Modal.Header>新增關鍵字</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form.Field>
                <label>關鍵字</label>
                <Input label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder='關鍵字' onChange={e => {this.setState({inputKeyword: e.target.value});}} />
              </Form.Field>   
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalAutoReplyAddKeywordSubmit} disabled={this.state.inputKeyword === ''}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalAutoReplyAddKeywordClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'ADD_MSG') {
      return(
        <Modal open={this.state.modalAutoReplyAddMsgShow} onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalAutoReplyAddMsgOpen}>
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
              <Button floated='right' color='green' onClick={this.modalAutoReplyAddMsgSubmit} disabled={this.state.inputMsgType === '' || (this.state.inputMsgType === 'text' && this.state.inputMsgContent === '') || (this.state.inputMsgType === 'sticker' && (this.state.inputPkgId === '' || this.state.inputStkrId === ''))}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalAutoReplyAddMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'UPDATE') {
      return(
        <Modal open={this.state.modalAutoReplyUpdateShow}  onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalAutoReplyUpdateOpen}>
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
                    checked={autoReplyMsgs[autoReplyMsgIdx].isText === true}
                    disabled={autoReplyMsgs[autoReplyMsgIdx].isText === false}
                  />
                  <Form.Radio
                    label='貼圖'
                    value='sticker'
                    checked={autoReplyMsgs[autoReplyMsgIdx].isText === false}
                    disabled={autoReplyMsgs[autoReplyMsgIdx].isText === true}
                  />
                </Form.Group>
                <Form.TextArea label='文字訊息' placeholder={autoReplyMsgs[autoReplyMsgIdx].text} disabled={autoReplyMsgs[autoReplyMsgIdx].isText === false} onChange={e => {this.setState({inputMsgContent: e.target.value});}}/>
                <Form.Group widths='equal'>
                  <Form.Input fluid label='貼圖包序號' placeholder={autoReplyMsgs[autoReplyMsgIdx].pkgId} disabled={autoReplyMsgs[autoReplyMsgIdx].isText === true} onChange={e => {this.setState({inputPkgId: e.target.value});}}/>
                  <Form.Input fluid label='貼圖序號' placeholder={autoReplyMsgs[autoReplyMsgIdx].stkrId} disabled={autoReplyMsgs[autoReplyMsgIdx].isText === true} onChange={e => {this.setState({inputStkrId: e.target.value});}}/>
                </Form.Group>
              </Form>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='green' onClick={this.modalAutoReplyUpdateSubmit}>
                <Icon name='checkmark' /> 確定
              </Button>
              <Button floated='right' color='grey' onClick={this.modalAutoReplyUpdateClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )
    } else if(modalType === 'REMOVE_GROUP') {
      return(
        <Modal open={this.state.modalAutoReplyRemoveGroupShow} onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalAutoReplyRemoveGroupOpen}>
            <Icon name='trash alternate' /> 移除群組
          </Button>
          }>
          <Modal.Header>移除群組</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這個群組?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalAutoReplyRemoveGroupSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalAutoReplyRemoveGroupClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else if(modalType === 'REMOVE_MSG') {
      return(
        <Modal open={this.state.modalAutoReplyRemoveMsgShow} onUnmount={this.reloadData} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalAutoReplyRemoveMsgOpen}>
            <Icon name='trash alternate' /> 移除
          </Button>
          }>
          <Modal.Header>移除訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這則訊息?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalAutoReplyRemoveMsgSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalAutoReplyRemoveMsgClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )

    } else {}
  }
}