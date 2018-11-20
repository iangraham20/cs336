import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

import CommentBox from './commentbox.js';

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);