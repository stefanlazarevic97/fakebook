import { Modal } from "../../context/Modal";
import EditProfileForm from "./EditProfileForm";
import './EditProfileModal.css'

const EditProfileModal = ({ onClose, user }) => {
    return (
        <Modal onClose={onClose}>
            <div className="edit-profile-modal-content">
                <EditProfileForm user={user} />
            </div>
        </Modal>
    );
}

export default EditProfileModal;
