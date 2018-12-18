import React, { Component}  from 'react';
import { Button, Icon, Table, Container, Divider, Header, Segment } from 'semantic-ui-react'
import { getBirthdayPrayer } from './MongoDB';
import BirthdayUser from './BirthdayUser/BirthdayUser';
import 'semantic-ui-css/semantic.min.css';

export default class Birthday extends Component {
	
	state = {
    birthdayPrayers: [],
	}
	
	reloadData = () => {
  	getBirthdayPrayer().then(data => {
			console.log("[componentDidMount]" + JSON.stringify(data));
			this.setState({
        birthdayPrayers: [...data]
      });
    });
	}

	componentDidMount() {
    this.reloadData();
  }

	render() {
		const prayers = this.state.birthdayPrayers;
    return (
			<Container style={{ padding: '3em' }}>
				<BirthdayUser/>
				<Segment raised>
					<Divider horizontal>
						<Header as='h4'>
							<Icon name='file text' />
							Prayers
						</Header>
					</Divider>
					{prayers.map(function(prayer, index){
						return (
							<Table celled key={index}>
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