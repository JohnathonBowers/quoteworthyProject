import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = props => {
    const { userId, handleLogoutItem } = props;

    const [userFirstName, setUserFirstName] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/user/' + userId, {
                withCredentials: true,
            })
            .then(res => setUserFirstName(res.data.firstName))
            .catch(err => console.log(err));
    }, [userId]);

    return (
        <div className="d-flex flex-row justify-content-between align-items-center mb-4">
            <h2>
                <strong>Quoteworthy</strong>
            </h2>
            <div className="dropdown">
                <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Welcome, {userFirstName}
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <Link
                            to="#"
                            className="dropdown-item"
                            onClick={handleLogoutItem}
                        >
                            Log out
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
