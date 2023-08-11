import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css';
import { deactivateSessionModal } from '../../store/uiReducer';

// const RegisterForm = ({ closeModal }) => {
//     const handleBackgroundClick = e => {
//         e.stopPropagation();
//         closeModal();
//     }
    
//     return (
//         <div className="modal">
//             <div className="modal-background" onClick={handleBackgroundClick}>
//                 <div className="modal-foreground">
//                     <h2>Register Form</h2>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default RegisterForm;

const RegisterForm = () => {
    const display = useSelector(state => state.ui.sessionModal)
    const dispatch = useDispatch();

    const handleBackgroundClick = e => {
        e.stopPropagation();
        dispatch(deactivateSessionModal);
    }

    if (!display) return null;

    return (
        <div className="modal">
            <div className="modal-background" onClick={handleBackgroundClick}>
                <div className="modal-foreground">
                    <h2>Register Form</h2>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;