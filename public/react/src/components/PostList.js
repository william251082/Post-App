import React from 'react';

class PostList extends React.Component
{
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        const {posts} = this.props;

        return(
            <div>
                <ul>
                    {posts && posts.map(post => (<li key={post.id}>{post.title}</li>))}
                </ul>
            </div>
        )
    }
}

export default PostList;
