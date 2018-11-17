import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/style.css';
import Person from '../scripts/person.js';

module.exports = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(comment) {
      return (
        <Person firstName={person.firstName} key={person.id}>
          {person.lastName}
          {person.startDate}
        </Person>
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }});
