import React, { Component}  from 'react';
import { Container, Button, Icon, Table, Divider, Header, Segment } from 'semantic-ui-react'
import { getBirthdayPrayer } from '../MongoDB';

export default class BirthdayPrayer extends Component {

  state = {
		birthdayPrayers: []
  }
  
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
		getBirthdayPrayer().then(data => {
			console.log("[componentDidMount]" + JSON.stringify(data));
			this.setState({
        birthdayPrayers: [...data]
      });
    });
  }

  render() {
    const prayers = this.state.birthdayPrayers;
    const queryData = this.queryData;

    return(
      <Segment raised>
				<Divider horizontal>
					<Header as='h4'>
						<Icon name='file text' />
						  生日祝福訊息列表
					</Header>
				</Divider>
				{prayers.map(function(prayer, index){
					return (
						<Table celled key={prayer._id}>
							<Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='5'>
                    訊息群組#{index+1}
									</Table.HeaderCell>
                </Table.Row>
								<Table.Row>
									<Table.HeaderCell>isText</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '350px' }}>祝福詞</Table.HeaderCell>
									<Table.HeaderCell>package Id</Table.HeaderCell>
									<Table.HeaderCell>sticker Id</Table.HeaderCell>
									<Table.HeaderCell style={{ width: '250px' }}>操作</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{prayer.msgs.map(function(msg){
									return (
										<Table.Row key={msg.id} >
											<Table.Cell>{msg.isText.toString()}</Table.Cell>
											{msg.isText ? <Table.Cell>{msg.text}</Table.Cell> : <Table.Cell/>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.pkgId}</Table.Cell>}
											{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.stkrId}</Table.Cell>}
											<Table.Cell>
												<Button floated='right' icon labelPosition='left' negative size='small'>
													<Icon name='trash alternate' /> 移除
												</Button>
												<Button floated='right' icon labelPosition='left' primary size='small'>
													<Icon name='pencil alternate' /> 編輯
												</Button>
											</Table.Cell>
										</Table.Row>
									)
								})}
							</Table.Body>

							<Table.Footer fullWidth>
								<Table.Row>
									<Table.HeaderCell colSpan='5'>
										<Button floated='right' icon labelPosition='left' primary size='small'>
											<Icon name='add' /> 新增訊息
										</Button>
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
						</Table>
					)
        })}
        <Container style={{ height: '30px' }}>
          <Button floated='right' icon labelPosition='left' primary size='small'>
            <Icon name='add' /> 新增訊息群組
          </Button>
        </Container>
			</Segment>
    )
  }
}