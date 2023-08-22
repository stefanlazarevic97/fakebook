import { useSelector } from "react-redux";
import './FriendIndex.css';
import { getFriendsByUserId } from "../../store/friendshipsReducer";

const FriendIndex = ({ user }) => {
    const sessionUserFriends = useSelector(getFriendsByUserId(user.id));

    return (
        <div className="friend-index">
            <h1>Friends</h1>
            {sessionUserFriends && sessionUserFriends.length > 0 ? (
                sessionUserFriends.map(friend => (
                    <div key={friend.id} className="friend-item">
                        <img 
                            className="friend-profile-picture" 
                            src={friend.profilePictureUrl} 
                            alt={`${friend.firstName} ${friend.lastName}`} 
                            onError={(e) => {e.target.onerror = null; e.target.src="path_to_default_image.jpg";}}
                        />
                        <span>{friend.firstName} {friend.lastName}</span>
                        <span>{friend.mutualFriendsCount} mutual friends</span>
                    </div>
                ))
            ) : (
                <p>No friends found</p>
            )}
        </div>
    );
};

export default FriendIndex;
