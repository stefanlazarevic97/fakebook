import { useDispatch, useSelector } from "react-redux";
import './FriendIndex.css';
import { getFriendsByUserId, getFriendRequestsByUserId, acceptFriendRequest, deleteFriendship } from "../../store/friendshipsReducer";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BsPersonCircle } from 'react-icons/bs';

const FriendIndex = ({ user }) => {
    const dispatch = useDispatch();
    const sessionUserFriends = useSelector(getFriendsByUserId(user.id));
    const sessionUserFriendRequests = useSelector(getFriendRequestsByUserId(user.id));

    const handleAccept = (friendshipId) => {
        dispatch(acceptFriendRequest(friendshipId));
    };

    const handleReject = (friendshipId) => {
        dispatch(deleteFriendship(friendshipId));
    };

    return (
        <div className="friend-index">
            <h3 className="friends-header">Friend Requests</h3>
            {sessionUserFriendRequests.length > 0 ? (
                sessionUserFriendRequests.map(friend => (
                    <div>
                        <div key={friend.id} className="friend-item">
                            <Link to={`/users/${friend.id}`} className="friend-link">
                                {friend.profilePictureUrl ?
                                    <img 
                                    className="friend-profile-picture" 
                                    src={friend.profilePictureUrl} 
                                    alt={''} 
                                    onError={(e) => {e.target.onerror = null; e.target.src="path_to_default_image.jpg";}}
                                    /> : 
                                    <BsPersonCircle className="friend-profile-picture" />
                                }

                                <div className="friend-index-body">
                                    <p className="friend-name">{friend.firstName} {friend.lastName}</p>
                                    <p className="mutual-friends-count">{friend.mutualFriendsCount} mutual friends</p>
                                </div>
                            </Link>
                        </div>
                        <div className="friend-request-buttons">
                            <button 
                                onClick={() => handleAccept(friend.friendshipId)}
                                className="friend-request-button"
                            >
                                Accept
                            </button>

                            <button 
                                className="friend-request-button"
                                onClick={() => handleReject(friend.friendshipId)}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="friend-item">No pending friend requests.</p>
            )}

            <h3 className="friends-header">Friends</h3>
            {sessionUserFriends.length > 0 ? (
                sessionUserFriends.map(friend => (
                    <Link key={friend.id} to={`/users/${friend.id}`} className="friend-link">
                        <div key={friend.id} className="friend-item">
                            {friend.profilePictureUrl ?
                                <img 
                                className="friend-profile-picture" 
                                src={friend.profilePictureUrl} 
                                alt={''} 
                                onError={(e) => {e.target.onerror = null; e.target.src="path_to_default_image.jpg";}}
                                /> : 
                                <BsPersonCircle className="friend-profile-picture" />
                            }
                            <div className="friend-index-body">
                                <p className="friend-name">{friend.firstName} {friend.lastName}</p>
                                <p className="mutual-friends-count">{friend.mutualFriendsCount} mutual friends</p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p className="friend-item">No friends found</p>
            )}
        </div>
    );
};

export default FriendIndex;
