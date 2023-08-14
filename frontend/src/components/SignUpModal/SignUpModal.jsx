import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";
import './SignUpModal.css'

const SignUpModal = ({ onClose }) => {
    return (
        <Modal onClose={onClose}>
            <div className="signup-modal-content">
                <SignUpForm />
            </div>
        </Modal>
    );
}

export default SignUpModal;
