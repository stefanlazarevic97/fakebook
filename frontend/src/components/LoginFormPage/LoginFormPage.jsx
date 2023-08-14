import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './LoginFormPage.css';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;

                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }

                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });
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
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
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

                    <button className="create-new-account-button">Create new account</button>
                </div>
            </div>
        </>
    );
}

export default LoginFormPage;