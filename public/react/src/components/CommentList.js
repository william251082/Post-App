import React from 'react';
import {Message} from "./Message";
import timeago from "timeago.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import "./CommentList.css";

class CommentList extends React.Component
{
    render() {
        const {commentList} = this.props;

        if (null === commentList || 0 === commentList.length) {
            return (<Message message="No Comments Yet"/>);
        }

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <TransitionGroup>
                    { commentList.map(comment => {
                        return (
                            <CSSTransition key={comment.id} timeout={1000} classNames="fade">
                                <div className="card-body border-bottom">
                                    <p className="card-text mb-0">
                                        { comment.content}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            {timeago().format(comment.published)} by&nbsp;
                                            {comment.author.name}
                                        </small>
                                    </p>
                                </div>
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
            </div>
        )
    }
}

export default CommentList;
