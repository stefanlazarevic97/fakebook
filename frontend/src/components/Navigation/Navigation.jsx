import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ProfileButton from "./ProfileButton";
import './Navigation.css';
import NewsFeed from "../NewsFeed/NewsFeed";
import LoginFormPage from "../LoginFormPage/LoginFormPage";

export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <NewsFeed />
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
            <NavLink exact to="/">Home</NavLink>
            {sessionLinks}
        </ul>
    )
}