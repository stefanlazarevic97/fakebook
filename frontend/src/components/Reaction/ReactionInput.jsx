import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsUp, FaRegLaughSquint, FaSadCry, FaAngry, FaSurprise } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { createReaction, updateReaction, deleteReaction } from '../../store/reactions';
import './ReactionInput.css';

function ReactionInput({ reactable, reactableType }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const REACTION_ICONS = {
        like: <FaThumbsUp />,
        love: <AiFillHeart />,
        laugh: <FaRegLaughSquint />,
        sad: <FaSadCry />,
        angry: <FaAngry />,
        surprised: <FaSurprise />
    };

    function getIcon(reactionType) {
        return REACTION_ICONS[reactionType] || <FaThumbsUp />;
    }

    const handleReaction = (newReactionType) => {
        const capitalizedReactableType = reactableType.charAt(0).toUpperCase() + reactableType.slice(1);
        
        if (reactable.currentUserReaction && reactable.currentUserReaction.reactionType === newReactionType) {
            dispatch(deleteReaction(reactable.currentUserReaction.id));
        } else {
            const reactionData = {
                reactionType: newReactionType,
                reactableType: capitalizedReactableType,
                reactableId: reactable.id,
                reactorId: sessionUser.id
            };
            
            if (reactable.currentUserReaction) {
                dispatch(updateReaction({ ...reactionData, id: reactable.currentUserReaction.id }));
            } else {
                dispatch(createReaction(reactionData));
            }
        }
    };

    return (
        <div className='reaction-container'>
            <div className='reaction-dropdown'>
                {['like', 'love', 'laugh', 'sad', 'angry', 'surprised'].map((reactionType) => (
                    <button
                        key={reactionType}
                        className={`reaction-button ${reactable.currentUserReaction && reactable.currentUserReaction.reactionType === reactionType ? 'active' : ''}`}
                        onClick={() => handleReaction(reactionType)}
                    >
                        {getIcon(reactionType)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ReactionInput;
