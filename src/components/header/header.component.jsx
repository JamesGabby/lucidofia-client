import React from "react";
import './header.styles.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { setUser } from "../../features/user/userSlice";
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleLogoutClick = () => {
        // Remove the user
        dispatch(setUser(''))
        // Refresh page so user data no longer remains
        window.location.reload(false)
    }

    const handleMenuClick = () => {
        setShowMenu(!showMenu)
    }

    return (
        <div className="header-container">
            <div className="left-side">
                <Link to='/'>
                    <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo" id="link" width={50} />
                </Link>
            </div>
            <div className="right-side">
                <p id="menu" onClick={handleMenuClick}>{!showMenu ? <GiHamburgerMenu style={{fontSize: '2rem'}} /> : <GrClose style={{fontSize: '2rem', backgroundColor: 'white'}} />}</p>
            </div>
            <div className={showMenu ? 'menu-dropdown-left' : 'menu-dropdown-hide'} />
            <div className={showMenu ? 'menu-dropdown-right' : 'menu-dropdown-hide'}>
                <div className="links">
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
                                <p id="link" style={{color: 'white'}}>Login</p>
                            </Link>
                        :
                            <p id="link" onClick={handleLogoutClick}>Logout</p>
                    }
                </div>
                
            </div>
        </div>
    );
    
}

export default Header;

