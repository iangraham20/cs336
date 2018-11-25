/* 
 *
 * Authors: Ian Christensen, Derek Fisher, Cameron Dewey
 * Professor: Keith Vander Linden
 * Class: CS-336-A, Calvin College
 * Semester: Fall, 2018
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import '../css/style.css';

module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="item">
        <h2 className="itemName">
          {this.props.name}
        </h2>
        <div className="itemDiscription">
          {this.props.discription}
        </div>
        <div className="itemAge">
          {this.props.age}
        </div>
        <div className="itemDiscription">
          {this.props.origin}
        </div>
        <div className="itemManufacturer">
          {this.props.manufacturer}
        </div>
        <div className="itemSignificance">
          {this.props.significance}
        </div>
        <div className="itemRelated">
          {this.props.related}
        </div>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
