import { FaThumbsUp, FaRegLaughSquint, FaSadCry, FaAngry, FaSurprise } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';
import './ReactionSummary.css'

function ReactionSummary({ reactable, reactableType }) {

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

    
    return (
        <div className='reaction-summary'>
            {Object.keys(REACTION_ICONS).map((type) => {
                const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

                const count = reactable["num" + capitalizedType + "s"];

                return (
                    <span key={type} className='reaction-summary-item'>
                        {getIcon(type)} {count}
                    </span>
                );
            })}
        </div>
    );
}

export default ReactionSummary;