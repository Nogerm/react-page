import React, { Component}  from 'react';
import { Button, Icon, Table } from 'semantic-ui-react'
import { getBirthdayPerson, getBirthdayPrayer } from '../MongoDB';
import 'semantic-ui-css/semantic.min.css';

export default class Birthday extends Component {
	
	state = {
		birthdayPeople: [],
		birthdayPrayers: [],
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

	render() {
		const people = this.state.birthdayPeople;
		const prayers = this.state.birthdayPrayers;
    return (
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
									<Button floated='right' icon labelPosition='left' negative size='small'>
										<Icon name='trash alternate' /> Remove
									</Button>
									<Button floated='right' icon labelPosition='left' primary size='small'>
										<Icon name='pencil alternate' /> Edit
									</Button>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>

				<Table.Footer fullWidth>
					<Table.Row>
						<Table.HeaderCell colSpan='4'>
							<Button floated='right' icon labelPosition='left' primary size='small'>
								<Icon name='user plus' /> Add User
							</Button>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
    );
  }
	
	
}