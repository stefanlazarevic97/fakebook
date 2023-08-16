import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import { CgProfile } from 'react-icons/cg';

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = (e) => {
        e.stopPropagation();
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button className="profile-button" onClick={openMenu}>
                <CgProfile className="profile-button-logo" />
            </button>

            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.firstName} {user.lastName}</li>
                    {user.email && <li>{user.email}</li>}
                    {user.phone && <li>{user.phone}</li>}

                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}