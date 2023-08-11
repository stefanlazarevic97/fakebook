import { useState } from "react";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useDispatch } from "react-redux";
import { activateSessionModal } from "../../store/uiReducer";

const Splash = props => {
    const [showRegister, setShowRegister] = useState(false);
    const dispatch = useDispatch();

    return (
        <>
            <h2>Splash</h2>

            <button onClick={() => dispatch(activateSessionModal)}>Create an Account</button>
            {showRegister && (
                <RegisterForm closeModal={() => setShowRegister(false)}/>
            )}
        </>
    );
}

export default Splash;