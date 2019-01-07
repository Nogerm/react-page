import React, { Component}  from 'react';
import { Container, Icon, Table, Divider, Header, Segment } from 'semantic-ui-react'
import { getMondayBless } from '../MongoDB';
import BlessModal from './BlessModal';

export default class MondayBless extends Component {

  state = {
		mondayBlesses: []
  }
  
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
		getMondayBless().then(data => {
			console.log("[MondayBless queryData]" + JSON.stringify(data));
			this.setState({
        mondayBlesses: [...data]
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
    const blesses = this.state.mondayBlesses;
    const delayQuery = this.delayQuery;

    return(
      <Segment raised style={{ margin: '3em' }}>
				<Divider horizontal>
					<Header as='h4'>
						<Icon name='file text' />
						  週一祝福訊息(隨機發送一組)
					</Header>
				</Divider>
				{blesses.map(function(bless, index){
					return (
						<Table celled key={bless._id}>
							<Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='6'>
                    訊息群組#{index+1}
                    <BlessModal type='REMOVE_GROUP' blessId={bless._id} blessMsgs={bless.msgs} callback={delayQuery}/>
									</Table.HeaderCell>
                </Table.Row>
								<Table.Row>
                  <Table.HeaderCell>順序</Table.HeaderCell>
									<Table.HeaderCell>類別</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '250px' }}>文字訊息</Table.HeaderCell>
									<Table.HeaderCell>STKID</Table.HeaderCell>
									<Table.HeaderCell>STKPKGID</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '250px' }}>操作</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{bless.msgs.map(function(msg, idx){
									return (
										<Table.Row key={msg.id} >
                      <Table.Cell>{idx+1}</Table.Cell>
											<Table.Cell>{msg.isText ? "文字" : "貼圖"}</Table.Cell>
											{msg.isText ? <Table.Cell>{msg.text}</Table.Cell> : <Table.Cell/>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.stkrId}</Table.Cell>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.pkgId}</Table.Cell>}
											<Table.Cell>
                        <BlessModal type='REMOVE_MSG' blessId={bless._id} blessMsg={msg} callback={delayQuery}/>
                        <BlessModal type='UPDATE' blessId={bless._id} blessMsg={msg} callback={delayQuery}/>
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>

							<Table.Footer fullWidth>
								<Table.Row>
									<Table.HeaderCell colSpan='6'>
                    <BlessModal type='ADD_MSG' blessId={bless._id} blessMsgs={bless.msgs} callback={delayQuery}/>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
						</Table>
					)
        })}
        <Container style={{ height: '30px' }}>
          <BlessModal type='ADD_GROUP' callback={delayQuery}/>
        </Container>
			</Segment>
    )
  }
}