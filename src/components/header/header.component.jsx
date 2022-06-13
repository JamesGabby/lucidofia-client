import React from "react";
import './header.styles.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../../features/user/userSlice";

const Header = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleClick = () => {
        // Remove the user
        dispatch(setUser(''))
        // Refresh page so user data no longer remains
        window.location.reload(false)
    }

    return (
        <div className="header-container">
            <div className="left-side">
                <Link to='/'>
                    <img src={process.env.PUBLIC_URL + '/thoth.png'} alt="logo" id="link" width={50} />
                </Link>
            </div>
            <div className="right-side">
                <Link to='/about'>
                    <p id="link">About</p>
                </Link>
                <Link to='/journal'>
                    <p id="link">Journal</p>
                </Link>
                <p id="link">Shop</p>
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

