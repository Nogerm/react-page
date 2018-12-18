import React, { Component}  from 'react';
import { Icon, Table, Divider, Header, Segment } from 'semantic-ui-react'
import { getBirthdayPerson } from '../MongoDB';
import CustomModal from './CustomModal';
import 'semantic-ui-css/semantic.min.css';

export default class BirthdayUser extends Component {

  state = {
		birthdayPeople: []
  }
  
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
		getBirthdayPerson().then(data => {
      console.log("[BirthdayUser queryData]" + JSON.stringify(data));
      this.setState({
        birthdayPeople: [...data]
      });
    });
  }

  render() {
    const people = this.state.birthdayPeople;
    const queryData = this.queryData;

    return(
      <Segment raised>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='user' />
              生日提醒列表
          </Header>
        </Divider>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>名字</Table.HeaderCell>
              <Table.HeaderCell>月份</Table.HeaderCell>
              <Table.HeaderCell>日期</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '20em' }}>操作</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {people.map(function(person){
              return (
                <Table.Row key={person._id} >
                  <Table.Cell>{person.firstname}</Table.Cell>
                  <Table.Cell>{person.birth_month}</Table.Cell>
                  <Table.Cell>{person.birth_day}</Table.Cell>
                  <Table.Cell>
                    <CustomModal type='REMOVE' person={person} callback={queryData}/>
                    <CustomModal type='UPDATE' person={person} callback={queryData}/>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
                <CustomModal type='ADD' callback={queryData}/>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    )
  }
}
