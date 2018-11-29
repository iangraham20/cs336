/* index.js
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

"use_strict";

import '../css/base.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import CommentBox from './commentbox.js';
import CommentEdit from './commentEdit.js';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={CommentBox}/>
            <Route path="/:id" component={CommentEdit}/>
        </Router>
    ), document.getElementById('content')
);
