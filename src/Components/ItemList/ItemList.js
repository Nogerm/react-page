import React, { Component}  from 'react';
import Item from './../Item/Item';

export default class ItemList extends Component {

  render() {
    const people = this.props.data;
    return (
      <div>
          {people.map(function(person, index){
            return <Item key={index} name={person.firstname}/>;
          })}
      </div>
    );
  }

}