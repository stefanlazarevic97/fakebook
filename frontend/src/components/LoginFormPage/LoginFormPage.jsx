import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/sessionReducer";
import './LoginFormPage.css';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SignUpModal from "../SignUpModal/SignUpModal";

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const sessionErrors = useSelector(state => state.errors.session);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    
    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ credential, password }));
    }

    const handleCreateAccount = (e) => {
        setShowSignUpModal(true)
    }

    const handleDemoLogin = (e) => {
        dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'demo-password' }))
    }

    return (
        <>
            <div className="login-form-page">
                <div className="fakebook">
                    <h1 className="login-logo">fakebook</h1>
                    <p className="login-slogan">Connect with friends and the world around you on Fakebook.</p>
                </div>

                <div className="login">
                    <form className="login-form" onSubmit={handleSubmit}>
                        {/* <ul>
                            {sessionErrors.map(error => <li key={error}>{error}</li>)}
                        </ul> */}

                        <label className="login-label">
                            <input
                                className="login-input"
                                type="text"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                                placeholder="Email or phone number"
                            />
                        </label>

                        <label className="login-label">
                            <input
                                className="login-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                        </label>

                        <button className="login-button">Log In</button>
                    </form>

                    <div className="login-buttons-container">
                        <button
                            onClick={handleDemoLogin}
                            className="demo-user-login">Demo Login
                        </button>

                        <button className="create-new-account-button"
                            onClick={handleCreateAccount}>
                            Create new account
                        </button>
                    </div>
                </div>
            </div>

            <div className="create-new-account-modal">
                {showSignUpModal && <SignUpModal 
                    showModal={showSignUpModal} 
                    onClose={() => setShowSignUpModal(false)} 
                />}
            </div>
        </>
    );
}

export default LoginFormPage;