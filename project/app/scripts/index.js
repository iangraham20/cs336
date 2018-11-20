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
import ItemBox from './itembox.js';

ReactDOM.render(
  <ItemBox url="/api/items" pollInterval={2000} />,
  document.getElementById('content')
);
