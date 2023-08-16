const PostItem = ({ post }) => {
    return (
        <li className="post-item">
            <header className="post-header">
                <strong>{post.author}</strong>
                <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
            </header>

            <div className="post-body">{post.body}</div>
        </li>
    );
}

export default PostItem;
