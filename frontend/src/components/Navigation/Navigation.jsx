import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ProfileButton from "./ProfileButton";
import './Navigation.css';
import LoginFormPage from "../LoginFormPage/LoginFormPage";
import { BsFacebook } from 'react-icons/bs';
export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <nav className="nav-header">
                    <NavLink exact to="/">
                        <BsFacebook className="fakebook-logo" />
                    </NavLink>
                    <ProfileButton user={sessionUser} />
                </nav>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormPage />
            </>
        );
    }

    return (
        <ul>
            {sessionLinks}
        </ul>
    )
}