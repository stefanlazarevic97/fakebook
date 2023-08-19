import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/sessionReducer';
import './ProfileButton.css'
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import formatPhoneNumber from "../../util/formatPhone";

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
            <div className="profile-button" onClick={openMenu}>
                {user.photoUrl ? 
                    <img className="profile-button-image" src={user.profilePictureUrl} alt="User Profile" /> : 
                    <BsPersonCircle className="profile-button-logo" />
                }
            </div>

            {showMenu && (
                <ul className="profile-dropdown">
                    <Link to={`/users/${user.id}`}>
                        <li>
                            {user.firstName} {user.lastName}
                        </li>
                    </Link>
                    
                    {user.email && <li>{user.email}</li>}
                    {user.phone && <li>{formatPhoneNumber(user.phone)}</li>}

                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}