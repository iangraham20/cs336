/* 
 *
 * Authors: Ian Christensen, Derek Fisher, Cameron Dewey
 * Professor: Keith Vander Linden
 * Class: CS-336-A, Calvin College
 * Semester: Fall, 2018
 */

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import Item from './item.js';

module.exports = React.createClass({
  render: function() {
    var itemNodes = this.props.data.map(function(item) {
      return (
        <Item author={item.author} key={item.id}>
          {item.text}
        </Item>
      );
    });
    return (
      <div className="itemList">
        {itemNodes}
      </div>
    );
  }
});
