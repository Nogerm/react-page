import React, { Component}  from 'react';
import { Container, Icon, Table, Divider, Header, Segment } from 'semantic-ui-react'
import { getRoutineReminder } from '../MongoDB';
import ReminderModal from './ReminderModal';

export default class RoutineReminder extends Component {

  state = {
		routineReminders: []
  }
  
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
		getRoutineReminder().then(data => {
			console.log("[componentDidMount]" + JSON.stringify(data));
			this.setState({
        routineReminders: [...data]
      });
    });
  }

  render() {
    const reminders = this.state.routineReminders;
    const queryData = this.queryData;

    return(
      <Segment raised>
				<Divider horizontal>
					<Header as='h4'>
						<Icon name='file text' />
						  分享提醒列表
					</Header>
				</Divider>
				{reminders.map(function(reminder, index){
					return (
						<Table celled key={reminder._id}>
							<Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='6'>
                    訊息群組#{index+1}
                    <ReminderModal type='REMOVE_GROUP' reminderId={reminder._id} reminderMsgs={reminder.msgs} callback={queryData}/>
									</Table.HeaderCell>
                </Table.Row>
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
								{reminder.msgs.map(function(msg, idx){
									return (
										<Table.Row key={msg.id} >
                      <Table.Cell>{idx+1}</Table.Cell>
											<Table.Cell>{msg.isText ? "文字" : "貼圖"}</Table.Cell>
											{msg.isText ? <Table.Cell>{msg.text}</Table.Cell> : <Table.Cell/>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.pkgId}</Table.Cell>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.stkrId}</Table.Cell>}
											<Table.Cell>
                        <ReminderModal type='REMOVE_MSG' reminderId={reminder._id} reminderMsgs={reminder.msgs} msgIdx={idx} callback={queryData}/>
                        <ReminderModal type='UPDATE' reminderId={reminder._id} reminderMsgs={reminder.msgs} msgIdx={idx} callback={queryData}/>
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>

							<Table.Footer fullWidth>
								<Table.Row>
									<Table.HeaderCell colSpan='6'>
                    <ReminderModal type='ADD_MSG' reminderId={reminder._id} reminderMsgs={reminder.msgs} callback={queryData}/>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
						</Table>
					)
        })}
        <Container style={{ height: '30px' }}>
          <ReminderModal type='ADD_GROUP' callback={queryData}/>
        </Container>
			</Segment>
    )
  }
}