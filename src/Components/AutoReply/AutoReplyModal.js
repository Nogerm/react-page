import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Input } from 'semantic-ui-react'
import { getAutoReply, addAutoReply, updateAutoReply, removeAutoReply } from '../MongoDB';
const uuidv4 = require('uuid/v4');

export default class AutoReplyModal extends Component {

  state = {
    type: this.props.type,
    autoReplyId: this.props.autoReplyId || '',
    autoReplyKeywords: [],
    autoReplyMessages: [],
    autoReplyKeyword: this.props.autoReplyKeyword || '',
    autoReplyMessage: this.props.autoReplyMessage || '',
    modalAutoReplyAddGroupShow: false,
    modalAutoReplyAddMsgShow: false,
    modalAutoReplyAddKeywordShow: false,
    modalAutoReplyRemoveGroupShow: false,
    modalAutoReplyRemoveKeywordShow: false,
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
    this.setState({ modalAutoReplyAddGroupShow: false }, this.props.callback );
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
    this.setState({ 
      modalAutoReplyAddMsgShow: true
    }, () => {
      getAutoReply().then(data => {
        const msgGroup = data.find(group => group._id === this.state.autoReplyId);
        this.setState({
          autoReplyKeywords: [...msgGroup.key_words],
          autoReplyMessages: [...msgGroup.response_msgs]
        });
      });
    });
  }

  modalAutoReplyAddMsgClose = () => {
    this.setState({ modalAutoReplyAddMsgShow: false }, this.props.callback );
  }

  modalAutoReplyAddMsgSubmit = () => {
    let msgs = [...this.state.autoReplyMessages];
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
    msgs.push(newMsg);
    
    let newData = {
      id: this.state.autoReplyId,
      key_words: this.state.autoReplyKeywords,
      response_msgs: msgs
    };
    
    updateAutoReply(newData)
    .then(() => {
      this.setState({
        autoReplyMessages: msgs
      }, () => {
        this.modalAutoReplyAddMsgClose();
      });
    });
  }

  modalAutoReplyAddKeywordOpen = () => {
    this.setState({ 
      modalAutoReplyAddKeywordShow: true 
    }, () => {
      getAutoReply().then(data => {
        const msgGroup = data.find(group => group._id === this.state.autoReplyId);
        this.setState({
          autoReplyKeywords: [...msgGroup.key_words],
          autoReplyMessages: [...msgGroup.response_msgs]
        });
      });
    });
  }

  modalAutoReplyAddKeywordClose = () => {
    this.setState({ modalAutoReplyAddKeywordShow: false }, this.props.callback );
  }

  modalAutoReplyAddKeywordSubmit = () => {
    let keywords = [...this.state.autoReplyKeywords];

    const newKeyword = {
      id: uuidv4(),
      text: this.state.inputKeyword
    }

    keywords.push(newKeyword);

    let newData = {
      id: this.state.autoReplyId,
      key_words: keywords,
      response_msgs: this.state.autoReplyMessages
    };

    updateAutoReply(newData)
    .then(() => {
      this.setState({
        autoReplyKeywords: keywords
      }, () => {
        this.modalAutoReplyAddKeywordClose();
      });
    });
  }

  modalAutoReplyRemoveGroupOpen = () => {
    this.setState({ modalAutoReplyRemoveGroupShow: true });
  }

  modalAutoReplyRemoveGroupClose = () => {
    this.setState({ modalAutoReplyRemoveGroupShow: false }, this.props.callback );
  }

  modalAutoReplyRemoveGroupSubmit = () => {
    removeAutoReply(this.state.autoReply._id);
    this.modalAutoReplyRemoveGroupClose();
  }

  modalAutoReplyRemoveMsgOpen = () => {
    this.setState({ 
      modalAutoReplyRemoveMsgShow: true
    }, () => {
      getAutoReply().then(data => {
        const msgGroup = data.find(group => group._id === this.state.autoReplyId);
        this.setState({
          autoReplyKeywords: [...msgGroup.key_words],
          autoReplyMessages: [...msgGroup.response_msgs]
        });
      });
    });
  }

  modalAutoReplyRemoveMsgClose = () => {
    this.setState({ modalAutoReplyRemoveMsgShow: false }, this.props.callback );
  }

  modalAutoReplyRemoveMsgSubmit = () => {
    let msgs = [...this.state.autoReplyMessages];
    const updateIdx = msgs.findIndex(item => item.id === this.state.autoReplyMessage.id);
    msgs.splice(updateIdx, 1);

    let newData = {
      id: this.state.autoReplyId,
      key_words: this.state.autoReplyKeywords,
      response_msgs: msgs
    };

    updateAutoReply(newData)
    .then(() => {
      this.setState({
        autoReplyMessages: msgs
      }, () => {
        this.modalAutoReplyRemoveMsgClose();
      });
    });
  }

  modalAutoReplyRemoveKeywordOpen = () => {
    this.setState({ 
      modalAutoReplyRemoveKeywordShow: true
    }, () => {
      getAutoReply().then(data => {
        const msgGroup = data.find(group => group._id === this.state.autoReplyId);
        this.setState({
          autoReplyKeywords: [...msgGroup.key_words],
          autoReplyMessages: [...msgGroup.response_msgs]
        });
      });
    });
  }

  modalAutoReplyRemoveKeywordClose = () => {
    this.setState({ modalAutoReplyRemoveKeywordShow: false }, this.props.callback );
  }

  modalAutoReplyRemoveKeywordSubmit = () => {
    let keywords = [...this.state.autoReplyKeywords];
    const updateIdx = keywords.findIndex(item => item.id === this.state.autoReplyKeyword.id);
    keywords.splice(updateIdx, 1);

    let newData = {
      id: this.state.autoReplyId,
      key_words: keywords,
      response_msgs: this.state.autoReplyMessages
    };

    updateAutoReply(newData)
    .then(() => {
      this.setState({
        autoReplyKeywords: keywords
      }, () => {
        this.modalAutoReplyRemoveMsgClose();
      });
    });
  }
/*
  modalAutoReplyUpdateOpen = () => {
    this.setState({ modalAutoReplyUpdateShow: true });
  }

  modalAutoReplyUpdateClose = () => {
    this.setState({ modalAutoReplyUpdateShow: false }, this.props.callback );
  }

  modalAutoReplyUpdateSubmit = () => {
    let autoReplyCopy = this.state.autoReply;
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
*/
  radioChange = (e, { value }) => {
    this.setState({ inputMsgType: value })
  }

  render() {
    const modalType = this.state.type;
    const radioChange = this.radioChange;

    if(modalType === 'ADD_GROUP') {
      return(
        <Modal open={this.state.modalAutoReplyAddGroupShow} trigger={
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
        <Modal open={this.state.modalAutoReplyAddKeywordShow} trigger={
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
        <Modal open={this.state.modalAutoReplyAddMsgShow} trigger={
          <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.modalAutoReplyAddMsgOpen}>
            <Icon name='plus' /> 新增回應訊息
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

    } else if(modalType === 'REMOVE_GROUP') {
      return(
        <Modal open={this.state.modalAutoReplyRemoveGroupShow} trigger={
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

    } else if(modalType === 'REMOVE_KEY_MSG') {
      return(
        <Modal open={this.state.modalAutoReplyRemoveKeywordShow} trigger={
          <Button floated='right' icon labelPosition='left' color='google plus' size='small' onClick={this.modalAutoReplyRemoveKeywordOpen}>
            <Icon name='trash alternate' /> 移除
          </Button>
          }>
          <Modal.Header>移除訊息</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>確定要刪除這則訊息?</p>
            </Modal.Description>
            <Modal.Actions style={{ padding: '3em' }}>
              <Button floated='right' color='google plus' onClick={this.modalAutoReplyRemoveKeywordSubmit}>
                <Icon name='checkmark' /> 移除
              </Button>
              <Button floated='right' color='grey' onClick={this.modalAutoReplyRemoveKeywordClose}>
                <Icon name='remove' /> 取消
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      )
    
    } else if(modalType === 'REMOVE_RPY_MSG') {
      return(
        <Modal open={this.state.modalAutoReplyRemoveMsgShow} trigger={
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