import React from 'react';
import ReactDOM from 'react-dom';
import PeopleBox from './PeopleBox';
import '../styles/styles.css';

ReactDOM.render(
  <PeopleBox url="../documents/addPerson.html" pollInterval={2000} />,
  document.getElementById('content')
);
