/* 
 *
 * names: Ian Christensen, Derek Fisher, Cameron Dewey
 * Professor: Keith Vander Linden
 * Class: CS-336-A, Calvin College
 * Semester: Fall, 2018
 */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import '../css/style.css';

module.exports = React.createClass({
  getInitialState: function() {
    return {name: '', description: '', age: '', origin: '', manufacturer: '', significance: '', related: ''};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  handleAgeChange: function(e) {
    this.setState({age: e.target.value});
  },
  handleOriginChange: function(e) {
    this.setState({origin: e.target.value});
  },
  handleManufacturerChange: function(e) {
    this.setState({manufacturer: e.target.value});
  },
  handleSignificanceChange: function(e) {
    this.setState({significance: e.target.value});
  },
  handleRelatedChange: function(e) {
    this.setState({related: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    var description = this.state.description.trim();
    var age = this.state.age.trim();
    var origin = this.state.origin.trim();
    var manufacturer = this.state.manufacturer.trim();
    var significance = this.state.significance.trim();
    var related = this.state.related.trim();
    if (!related || !significance || !manufacturer || !origin || !age || !description || !name) {
      return;
    }
    this.props.onItemSubmit({name: name, description: description, age: age, origin: origin, manufacturer: manufacturer, significance: significance, related: related});
    this.setState({name: '', description: '', age: '', origin: '', manufacturer: '', significance: '', related: ''});
  },
  render: function() {
    return (
      <form className="itemForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <input
          type="text"
          placeholder="Item description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <input
          type="text"
          placeholder="Item age"
          value={this.state.age}
          onChange={this.handleAgeChange}
        />
        <input
          type="text"
          placeholder="Item origin"
          value={this.state.origin}
          onChange={this.handleOriginChange}
        />
        <input
          type="text"
          placeholder="Item manufacturer"
          value={this.state.manufacturer}
          onChange={this.handleManufacturerChange}
        />
        <input
          type="text"
          placeholder="Item significance"
          value={this.state.significance}
          onChange={this.handleSignificanceChange}
        />
        <input
          type="text"
          placeholder="Related items"
          value={this.state.related}
          onChange={this.handleRelatedChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }});
