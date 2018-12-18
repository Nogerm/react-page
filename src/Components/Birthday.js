import React, { Component}  from 'react';
import { Container } from 'semantic-ui-react'
import BirthdayUser from './BirthdayUser/BirthdayUser';
import BirthdayPrayer from './BirthdayPrayer/BirthdayPrayer';
import 'semantic-ui-css/semantic.min.css';

export default class Birthday extends Component {
	
	state = {
    birthdayPrayers: [],
	}

	render() {
		
    return (
			<Container style={{ padding: '3em' }}>
				<BirthdayUser/>
				<BirthdayPrayer/>
			</Container>
    );
  }
	
}