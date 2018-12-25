import React, { Component}  from 'react';
import { Segment, Checkbox, Grid, Divider, Header, Icon } from 'semantic-ui-react';

export default class Setting extends Component {

	render() {
		
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
            <Checkbox toggle label='生日提醒'/>
          </Grid.Row>
          <Grid.Row>
            <Checkbox toggle label='分享提醒'/>
          </Grid.Row>
          <Grid.Row>
            <Checkbox toggle label='自動回應'/>
          </Grid.Row>
          <Grid.Row>
            <Checkbox toggle label='週一祝福'/>
          </Grid.Row>
        </Grid>
			</Segment>
    );
  }
	
}