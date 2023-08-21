import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import './FriendIndex.css';
import { fetchFriendships, getFriendships } from "../../store/friendshipsReducer";

const FriendIndex = ({ userId }) => {
    const dispatch = useDispatch();
    const friends = useSelector(getFriendships);

    useEffect(() => {
        dispatch(fetchFriendships(userId));
    }, [dispatch, userId]);

    return (
        <div className="friend-index">
            <h2>Friends</h2>
            {friends && friends.length > 0 ? (
                friends.map(friend => (
                    <div key={friend.id} className="friend-item">
                        <img 
                            className="friend-profile-picture" 
                            src={friend.profilePictureUrl} 
                            alt={`${friend.firstName} ${friend.lastName}`} 
                            onError={(e) => {e.target.onerror = null; e.target.src="path_to_default_image.jpg";}}
                        />
                        <span>{friend.firstName} {friend.lastName}</span>
                        <span>{friend.mutualFriendCount} mutual friends</span>
                    </div>
                ))
            ) : (
                <p>No friends found</p>
            )}
        </div>
    );
};

export default FriendIndex;
