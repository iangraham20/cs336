import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import '../styles/style.css';

module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="person">
        <h2 className="personName">{this.props.firstName} {this.props.lastName}</h2>
        <h3 className="personLoginId">${this.props.loginId}</h3>
        <h4 className="personStartDate">${this.props.startDate}</h4>
      </div>
    );
  }
});
