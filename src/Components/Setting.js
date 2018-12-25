import React, { Component}  from 'react';
import { Segment, Checkbox, Grid, Divider, Header, Icon } from 'semantic-ui-react';
import { getSetting, updateSetting } from './MongoDB';

export default class Setting extends Component {

  state = {
    id: '',
    remind_birthday: false,
    remind_routine: false,
    auto_reply: false,
    monday_bless: false
  }
  
  componentDidMount() {
    this.queryData();
  }

  queryData = () => {
		getSetting().then(data => {
			console.log("[Setting queryData]" + JSON.stringify(data));
			this.setState({
        id: data[0]._id,
        remind_birthday: !!data[0].remind_birthday,
        remind_routine: !!data[0].remind_routine,
        auto_reply: !!data[0].auto_reply,
        monday_bless: !!data[0].monday_bless
      });
    });
  }
  
  toggleBirthday = () => this.setState({ remind_birthday: !this.state.remind_birthday }, this.update);
  toggleRoutine  = () => this.setState({ remind_routine:  !this.state.remind_routine  }, this.update);
  toggleReply    = () => this.setState({ auto_reply:      !this.state.auto_reply      }, this.update);
  toggleBless    = () => this.setState({ monday_bless:    !this.state.monday_bless    }, this.update);

  update = () => {
    const newData = {
      id: this.state.id,
      remind_birthday: this.state.remind_birthday,
      remind_routine: this.state.remind_routine,
      auto_reply: this.state.auto_reply,
      monday_bless: this.state.monday_bless
    }

    console.log(JSON.stringify(newData));

    updateSetting(newData);
  }

	render() {
    const { remind_birthday, remind_routine, auto_reply, monday_bless} = this.state;
    const toggleBirthday = this.toggleBirthday;
    const toggleRoutine  = this.toggleRoutine;
    const toggleReply    = this.toggleReply;
    const toggleBless    = this.toggleBless;

    return (
			<Segment raised style={{ margin: '3em', paddingLeft: '3em', paddingRight: '3em'}}>
        <Divider horizontal>
					<Header as='h4'>
						<Icon name='setting' />
						  功能設定
					</Header>
				</Divider>
        <Grid columns={1} divided>
          <Grid.Row>
            <Checkbox toggle label='生日提醒' checked={remind_birthday} onChange={toggleBirthday}/>
          </Grid.Row>
          <Grid.Row>
            <Checkbox toggle label='分享提醒' checked={remind_routine} onChange={toggleRoutine}/>
          </Grid.Row>
          <Grid.Row>
            <Checkbox toggle label='自動回應' checked={auto_reply} onChange={toggleReply}/>
          </Grid.Row>
          <Grid.Row>
            <Checkbox toggle label='週一祝福' checked={monday_bless} onChange={toggleBless}/>
          </Grid.Row>
        </Grid>
			</Segment>
    );
  }
	
}