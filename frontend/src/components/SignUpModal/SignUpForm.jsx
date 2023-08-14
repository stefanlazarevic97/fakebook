import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from "../../store/session";
import './SignUpModal.css'

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);

            return dispatch(sessionActions.signup({ firstName, lastName, bio, email, phone, password }))
                .catch(async res => {
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

        return setErrors(['Confirm Password field must match the Password field']);
    };

    return (
        <>
            <h1>Sign Up</h1>
            <p>It's quick and easy.</p>

            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>

                <label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="First name"
                    />
                </label>

                <label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Last name"
                    />
                </label>

                <label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                    />
                </label>

                <label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </label>

                <label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                    />
                </label>

                <label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </label>

                <label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                    />
                </label>

                <button>Sign Up</button>
            </form>
        </>
    );
}

export default SignUpForm;