/* commentlist.js
 *
 * Ian Christensen
 * Prof. Vander Linden
 * CS-336-A, Calvin College
 * Fall, 2018
 */

"use_strict";

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/base.css';
import Comment from './comment.js';

module.exports = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment id={comment.id} author={comment.author}
                         key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});
