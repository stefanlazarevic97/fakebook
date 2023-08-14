import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";

const SignUpModal = ({showModal, onClose}) => {
    return (
        <>
            {showModal && (
                <Modal onClose={onClose}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
}

export default SignUpModal;