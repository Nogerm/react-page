import React, { Component}  from 'react';
import { Container, Icon, Table, Divider, Header, Segment } from 'semantic-ui-react'
import { getAutoReply } from '../MongoDB';
import AutoReplyModal from './AutoReplyModal';

export default class AutoReply extends Component {

  state = {
		autoReplys: []
  }
  
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
		getAutoReply().then(data => {
			console.log("[AutoReply queryData]" + JSON.stringify(data));
			this.setState({
        autoReplys: [...data]
      });
    });
  }

  delayQuery = () => {
    const queryData = this.queryData;
    setTimeout(() => {
      queryData();
    }, 2000);
  }

  render() {
    const autoReplys = this.state.autoReplys;
    const delayQuery = this.delayQuery;

    return(
      <Segment raised style={{ margin: '3em' }}>
				<Divider horizontal>
					<Header as='h4'>
						<Icon name='file text' />
						  自動回應訊息
					</Header>
				</Divider>
				{autoReplys.map(function(autoReply, index){
					return (
						<Table celled key={autoReply._id}>
							<Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='6'>
                    訊息群組#{index+1}
                    <AutoReplyModal type='REMOVE_GROUP' autoReply={autoReply} callback={delayQuery}/>
									</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>順序</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '350px' }}  colSpan='4'>文字訊息</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '250px' }}>操作</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

							<Table.Body>
                {autoReply.key_words.map(function(keyword, idx){
                  return (
                    <Table.Row key={keyword.id} >
                      <Table.Cell>{idx+1}</Table.Cell>
											<Table.Cell colSpan='4'>{keyword.text}</Table.Cell>
                      <Table.Cell>
                        <AutoReplyModal type='REMOVE_MSG' autoReply={autoReply} msgIdx={idx} callback={delayQuery}/>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>

              <Table.Header>
								<Table.Row>
                  <Table.HeaderCell>順序</Table.HeaderCell>
									<Table.HeaderCell>類別</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '350px' }}>文字訊息</Table.HeaderCell>
									<Table.HeaderCell>貼圖包序號</Table.HeaderCell>
									<Table.HeaderCell>貼圖序號</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '250px' }}>操作</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{autoReply.response_msgs.map(function(msg, idx){
									return (
										<Table.Row key={msg.id} >
                      <Table.Cell>{idx+1}</Table.Cell>
											<Table.Cell>{msg.isText ? "文字" : "貼圖"}</Table.Cell>
											{msg.isText ? <Table.Cell>{msg.text}</Table.Cell> : <Table.Cell/>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.pkgId}</Table.Cell>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.stkrId}</Table.Cell>}
											<Table.Cell>
                        <AutoReplyModal type='REMOVE_MSG' autoReply={autoReply} msgIdx={idx} callback={delayQuery}/>
                        <AutoReplyModal type='UPDATE' autoReply={autoReply} msgIdx={idx} callback={delayQuery}/>
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>

							<Table.Footer fullWidth>
								<Table.Row>
									<Table.HeaderCell colSpan='6'>
                    <AutoReplyModal type='ADD_MSG' autoReply={autoReply} callback={delayQuery}/>
                    <AutoReplyModal type='ADD_KEY' autoReply={autoReply} callback={delayQuery}/>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
						</Table>
					)
        })}
        <Container style={{ height: '30px' }}>
          <AutoReplyModal type='ADD_GROUP' callback={delayQuery}/>
        </Container>
			</Segment>
    )
  }
}