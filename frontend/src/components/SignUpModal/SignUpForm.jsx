import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from "../../store/sessionReducer";
import './SignUpForm.css'

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const sessionUser = useSelector(state => state.session.user);
    const sessionErrors = useSelector(state => state.errors.session);

    if (sessionUser) return <Redirect to="/" />;

    const handleFile = (e) => {
        const file = e.currentTarget.files[0];
        setProfilePicture(file);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // const userData = { firstName, lastName, bio, password, passwordConfirmation };
        
        const userData = new FormData();
        userData.append('user[firstName]', firstName);
        userData.append('user[lastName]', lastName);
        userData.append('user[bio]', bio);
        userData.append('user[password]', password);
        userData.append('user[passwordConfirmation]', passwordConfirmation);
        if (email !== '') userData.append('user[email]', email);
        if (phone !== '') userData.append('user[phone]', phone);
        if (profilePicture) userData.append('user[profilePicture]', profilePicture);

        dispatch(sessionActions.signup(userData)) 
    };

    return (
        <>
            <h1 className="signup-header">Sign Up</h1>
            <p className="signup-slogan">It's quick and easy.</p>

            <form className="signup-form" onSubmit={handleSubmit}>
                <ul>
                    {sessionErrors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <div className="names-container">
                    <input
                        className="name-inputs"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="First name"
                    />


                    <input
                        className="name-inputs"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Last name"
                    />
                </div>

                <textarea
                    className="other-inputs"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                />

                <input
                    className="other-inputs"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <input
                    className="other-inputs"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                />

                <input
                    className="other-inputs"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />

                <input
                    className="other-inputs"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirm password"
                    required
                />
                <label>Upload Profile Picture: 
                    <input
                        type="file"
                        onChange={handleFile}
                    />
                </label>
               

                <button className="signup-button">Sign Up</button>
            </form>
        </>
    );
}

export default SignUpForm;