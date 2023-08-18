import PostItem from '../PostItem/PostItem';
import './ProfilePage';

const ProfilePage = ({ user, posts }) => {
    return (
        <div className="user-profile">
            <div className="cover-photo-container">
                <img className="cover-picture" src={user.coverPhotoUrl} alt="Cover Photo" />
                <img className="profile-picture" src={user.profilePicUrl} alt="Profile" />
            </div>

            <h2 className="user-name">{user.name}</h2>

            <div className="user-posts">
                {posts.map(post => <PostItem key={post.id} post={post} />)}
            </div>
        </div>
    );
}

export default ProfilePage;
