import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

const SignUpModal = ({ setShowSignUpModal, onClose }) => {
    return (
        <Modal onClose={onClose}>
            <SignUpForm />
        </Modal>
    );
}

export default SignUpModal;