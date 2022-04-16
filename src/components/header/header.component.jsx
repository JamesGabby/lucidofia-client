import React from "react";
import './header.styles.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, removeUser } from "../../features/user/userSlice";

const Header = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setUser(''))
    }

    return (
        <div className="header-container">
            <div className="left-side">
                <Link to='/'>
                    <img src="/thoth.png" alt="logo" id="link" width={50} />
                </Link>
            </div>
            <div className="right-side">
                <p id="link">About</p>
                <p id="link">Journal</p>
                <p id="link">Contact</p>
                {
                    user.length === 0 ? 
                        <Link to='/login'>
                            <p id="link" style={{color: 'black'}}>Login</p>
                        </Link>
                    :
                        <p id="link" onClick={handleClick}>Logout</p>
                }
            </div>
        </div>
    );
    
}

export default Header;

