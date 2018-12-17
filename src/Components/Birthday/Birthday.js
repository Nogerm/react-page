import React, { Component}  from 'react';
import { Button, Icon, Table, Container, Divider, Header, Segment, Modal, Form } from 'semantic-ui-react'
import { getBirthdayPerson, getBirthdayPrayer } from '../MongoDB';
import 'semantic-ui-css/semantic.min.css';

export default class Birthday extends Component {
	
	state = {
		birthdayPeople: [],
    birthdayPrayers: [],
    selectedPerson: '',
  }

	componentDidMount() {
    getBirthdayPerson().then(data => {
      console.log("[componentDidMount]" + JSON.stringify(data));
      this.setState({
        birthdayPeople: [...data]
      });
    });

  	getBirthdayPrayer().then(data => {
			console.log("[componentDidMount]" + JSON.stringify(data));
			this.setState({
        birthdayPrayers: [...data]
      });
    });
  }

  //render functions
  renderButtonUserBirthdayUpdate = (userInfo) => {
    return(
      <Modal trigger={
        <Button floated='right' icon labelPosition='left' primary size='small'>
          <Icon name='pencil alternate' /> Edit
        </Button>
        }>
        <Modal.Header>更新組員生日</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>名字</label>
                <input value={userInfo.firstname.toString()} />
              </Form.Field>
              <Form.Field>
                <label>姓氏</label>
                <input value={userInfo.lastname.toString()} />
              </Form.Field>
              <Form.Field>
                <label>月份</label>
                <input value={userInfo.birth_month.toString()} />
              </Form.Field>
              <Form.Field>
                <label>日期</label>
                <input value={userInfo.birth_day.toString()} />
              </Form.Field>
            </Form>
          </Modal.Description>
          <Modal.Actions>
            <Button floated='right' color='green'>
              <Icon name='checkmark' /> 確定
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    );
  }

  renderButtonUserBirthdayRemove = (userInfo) => {
    return(
      <Modal trigger={
        <Button floated='right' icon labelPosition='left' negative size='small'>
					<Icon name='trash alternate' /> Remove
				</Button>
        }>
        <Modal.Header>刪除組員生日</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>確定要刪除{userInfo.firstname}的生日?</p>
          </Modal.Description>
          <Modal.Actions>
            <Button floated='right' color='green'>
              <Icon name='checkmark' /> 確定
            </Button>
            <Button floated='right' color='red'>
              <Icon name='remove' /> 取消
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    );
  }

  renderButtonUserBirthdayAdd = () => {
    return(
      <Modal trigger={
        <Button floated='right' icon labelPosition='left' primary size='small'>
					<Icon name='user plus' /> Add User
				</Button>
        }>
        <Modal.Header>新增生日組員</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>名字</label>
                <input placeholder='名字' />
              </Form.Field>
              <Form.Field>
                <label>姓氏</label>
                <input placeholder='姓氏' />
              </Form.Field>
              <Form.Field>
                <label>月份</label>
                <input placeholder='月份' />
              </Form.Field>
              <Form.Field>
                <label>日期</label>
                <input placeholder='日期' />
              </Form.Field>
            </Form>
          </Modal.Description>
          <Modal.Actions>
            <Button floated='right' color='green'>
              <Icon name='checkmark' /> 確定
            </Button>
            <Button floated='right' color='red'>
              <Icon name='remove' /> 取消
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    );
  }

	render() {
		const people = this.state.birthdayPeople;
    const prayers = this.state.birthdayPrayers;
    const renderButtonUserBirthdayUpdate = this.renderButtonUserBirthdayUpdate;
    const renderButtonUserBirthdayRemove = this.renderButtonUserBirthdayRemove;
    return (
			<Container style={{ padding: '3em' }}>
				<Segment raised>
					<Divider horizontal>
						<Header as='h4'>
							<Icon name='user' />
							Users
						</Header>
					</Divider>
					<Table celled>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Name</Table.HeaderCell>
								<Table.HeaderCell>Month</Table.HeaderCell>
								<Table.HeaderCell>Day</Table.HeaderCell>
								<Table.HeaderCell>Operation</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{people.map(function(person, index){
								return (
									<Table.Row key={index} >
										<Table.Cell>{person.firstname}</Table.Cell>
										<Table.Cell>{person.birth_month}</Table.Cell>
										<Table.Cell>{person.birth_day}</Table.Cell>
										<Table.Cell>
											{renderButtonUserBirthdayRemove(person)}
											{renderButtonUserBirthdayUpdate(person)}
										</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>

						<Table.Footer fullWidth>
							<Table.Row>
								<Table.HeaderCell colSpan='4'>
                  {this.renderButtonUserBirthdayAdd()}
								</Table.HeaderCell>
							</Table.Row>
						</Table.Footer>
					</Table>
				</Segment>
				<Segment raised>
					<Divider horizontal>
						<Header as='h4'>
							<Icon name='file text' />
							Prayers
						</Header>
					</Divider>
					{prayers.map(function(prayer, index){
						return (
							<Table celled>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell>isText</Table.HeaderCell>
										<Table.HeaderCell>Text</Table.HeaderCell>
										<Table.HeaderCell>package Id</Table.HeaderCell>
										<Table.HeaderCell>sticker Id</Table.HeaderCell>
										<Table.HeaderCell>Operation</Table.HeaderCell>
									</Table.Row>
								</Table.Header>

								<Table.Body>
									{prayer.msgs.map(function(msg, index){
										return (
											<Table.Row key={index} >
												<Table.Cell>{msg.isText.toString()}</Table.Cell>
												{msg.isText ? <Table.Cell>{msg.f_half + "[USER]" + msg.b_half}</Table.Cell> : <Table.Cell/>}
												{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.pkgId}</Table.Cell>}
												{msg.isText ? <Table.Cell/> : <Table.Cell>{msg.stkrId}</Table.Cell>}
												<Table.Cell>
													<Button floated='right' icon labelPosition='left' negative size='small'>
														<Icon name='trash alternate' /> Remove
													</Button>
													<Button floated='right' icon labelPosition='left' primary size='small'>
														<Icon name='pencil alternate' /> Edit
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
												<Icon name='add' /> Add Message
											</Button>
										</Table.HeaderCell>
									</Table.Row>
								</Table.Footer>
							</Table>
						)
					})}
				</Segment>
			</Container>
    );
  }
	
}