import React, { Component}  from 'react';
import { Container, Icon, Table, Divider, Header, Segment } from 'semantic-ui-react'
import { getBirthdayPrayer } from '../MongoDB';
import PrayerModal from './PrayerModal';

export default class BirthdayPrayer extends Component {

  state = {
		birthdayPrayers: []
  }
  
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
		getBirthdayPrayer().then(data => {
			console.log("[BirthdayPrayer queryData]" + JSON.stringify(data));
			this.setState({
        birthdayPrayers: [...data]
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
    const prayers = this.state.birthdayPrayers;
		const delayQuery = this.delayQuery;

    return(
      <Segment raised>
				<Divider horizontal>
					<Header as='h4'>
						<Icon name='file text' />
						  生日提醒訊息(隨機發送一組)
					</Header>
				</Divider>
				{prayers.map(function(prayer, index){
					return (
						<Table celled key={prayer._id}>
							<Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='6'>
                    訊息群組#{index+1}
                    <PrayerModal type='REMOVE_GROUP' prayerId={prayer._id} prayerMsgs={prayer.msgs} callback={delayQuery}/>
									</Table.HeaderCell>
                </Table.Row>
								<Table.Row>
                  <Table.HeaderCell>順序</Table.HeaderCell>
									<Table.HeaderCell>類別</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '250px' }}>文字訊息</Table.HeaderCell>
									<Table.HeaderCell>貼圖包序號</Table.HeaderCell>
									<Table.HeaderCell>貼圖序號</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '250px' }}>操作</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{prayer.msgs.map(function(msg, idx){
									return (
										<Table.Row key={msg.id} >
                      <Table.Cell>{idx+1}</Table.Cell>
											<Table.Cell>{msg.isText ? "文字" : "貼圖"}</Table.Cell>
											{msg.isText ? <Table.Cell>{msg.text}</Table.Cell> : <Table.Cell/>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.pkgId}</Table.Cell>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.stkrId}</Table.Cell>}
											<Table.Cell>
                        <PrayerModal type='REMOVE_MSG' prayerId={prayer._id} prayerMsgs={prayer.msgs} msgIdx={idx} callback={delayQuery}/>
                        <PrayerModal type='UPDATE' prayerId={prayer._id} prayerMsgs={prayer.msgs} msgIdx={idx} callback={delayQuery}/>
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>

							<Table.Footer fullWidth>
								<Table.Row>
									<Table.HeaderCell colSpan='6'>
                    <PrayerModal type='ADD_MSG' prayerId={prayer._id} prayerMsgs={prayer.msgs} callback={delayQuery}/>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
						</Table>
					)
        })}
        <Container style={{ height: '30px' }}>
          <PrayerModal type='ADD_GROUP' callback={delayQuery}/>
        </Container>
			</Segment>
    )
  }
}