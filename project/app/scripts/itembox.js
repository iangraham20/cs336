/* 
 *
 * Authors: Ian Christensen, Derek Fisher, Cameron Dewey
 * Professor: Keith Vander Linden
 * Class: CS-336-A, Calvin College
 * Semester: Fall, 2018
 */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import '../css/style.css';
import ItemList from './itemlist.js';
import ItemForm from './itemform.js';

module.exports = React.createClass({
  loadItemsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleItemSubmit: function(item) {
    var items = this.state.data;
    item.id = Date.now();
    var newItems = items.concat([item]);
    this.setState({data: newItems});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: item,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: items});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadItemsFromServer();
    setInterval(this.loadItemsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="itemBox">
        <h1>Items</h1>
        <ItemList data={this.state.data} />
        <ItemForm onItemSubmit={this.handleItemSubmit} />
      </div>
    );
  }
});
