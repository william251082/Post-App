import React from 'react';
import timeago from 'timeago.js'
import {Link} from "react-router-dom";
import {Message} from "./Message";

class PostList extends React.Component
{
    render() {
        const {posts} = this.props;

        if (null === posts || 0 === posts.length) {
            return (<Message message="No Posts"/>);
        }

        return (
            <div>
                {posts && posts.map(post => (
                    <div className="card mb-3 mt-3 shadow-sm" key={post.id}>
                        <div className="card-body">
                            <h3>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h3>
                            <p className="card-text border-top">
                                <small className="text-muted">
                                    {timeago().format(post.published)}
                                </small>
                            </p>
                        </div>
                    </div>
                    ))}
            </div>)
    }
}

export default PostList;
