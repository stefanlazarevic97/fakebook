import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsUp, FaRegLaughSquint, FaSadCry, FaAngry, FaSurprise } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import { getReactions, createReaction, updateReaction, deleteReaction } from '../../store/reactionsReducer';

function Reaction({ reactable, reactableType, sessionUser }) {
    const sessionUserReaction = useSelector(state => getReactions(state, reactable.id, reactableType));
    const dispatch = useDispatch();

    function getIcon(reactionType) {
        switch (reactionType) {
            case 'like':
                return <FaThumbsUp />;
            case 'love':
                return <AiFillHeart />;
            case 'laugh':
                return <FaRegLaughSquint />;
            case 'sad':
                return <FaSadCry />;
            case 'angry':
                return <FaAngry />;
            case 'surprised':
                return <FaSurprise />;
            default:
                return <FaThumbsUp />;
        }
    }

    const handleReaction = (reaction) => {
        if (sessionUserReaction.reactionType === reaction.type) {
            dispatch(deleteReaction(reaction.id));
        } else {
            if (sessionUserReaction) {
                dispatch(updateReaction(reaction));
            } else {
                dispatch(createReaction(reaction));
            }
        }
    };

    return (
        <div className='reaction-container'>
            {['like', 'love', 'laugh', 'sad', 'angry', 'surprised'].map((reaction) => (
                <button
                    key={reaction.id}
                    className={`reaction-button ${sessionUserReaction === reaction ? 'active' : ''}`}
                    onClick={() => handleReaction(reaction)}
                >
                    {getIcon(type)}
                </button>
            ))}
        </div>
    );
}

export default Reaction;
