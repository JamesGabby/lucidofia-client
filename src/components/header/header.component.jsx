import React, { useEffect, useState } from "react";
import './header.styles.css'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../../features/user/userSlice";
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgClose } from 'react-icons/cg'
import { HiOutlineBookOpen, HiLogin } from 'react-icons/hi'
import { FiTag, FiLogOut } from 'react-icons/fi'
import { BsInfoCircle } from 'react-icons/bs'
import { RiDraftLine } from 'react-icons/ri'

const Header = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize());
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

    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    return (
        <div className="header-container">
            <div className="left-side">
                <Link to='/'>
                    <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo" id="link" width={50} />
                </Link>
                <h2 id="title">Lucidofia</h2>
            </div>
            <div className="right-side">
                {windowSize.innerWidth < 600 ?
                    <p id="menu" onClick={handleMenuClick}>{!showMenu ? <GiHamburgerMenu style={{fontSize: '2rem'}} /> : <CgClose style={{fontSize: '2rem', color: 'white'}} />}</p>
                :
                <div className="widescreen-links">
                    {
                        user.length === 0 ? 
                            <div className="widescreen-links">
                                <Link to='/about'>
                                    <p id="link"><BsInfoCircle /> About</p>
                                </Link>
                                <p id="link"><FiTag /> Shop</p>
                                <Link to='/login'>
                                    <p id="link" style={{color: 'white', paddingTop: '0'}}><HiLogin /> Login</p>
                                </Link>
                            </div>
                        :
                            <div className="widescreen-links">
                                <Link to='/journal'>
                                    <p id="link"><HiOutlineBookOpen /> My Dreams</p>
                                </Link>
                                <Link to='/journal'>
                                    <p id="link"><RiDraftLine /> My Drafts</p>
                                </Link>
                                <Link to='/about'>
                                    <p id="link"><BsInfoCircle /> About</p>
                                </Link>
                                <p id="link"><FiTag /> Shop</p>
                                <Link to={process.env.PUBLIC_URL}>
                                    <p id="link" onClick={handleLogoutClick}> <FiLogOut /> Logout</p>
                                </Link>  
                            </div>  
                    }
                </div>}
            </div>
            <div className={showMenu ? 'menu-dropdown-left' : 'menu-dropdown-hide'} />
            <div className={showMenu ? 'menu-dropdown-right' : 'menu-dropdown-hide'}>
                <div className="links">
                    <Link to='/journal'>
                        <p id="link"><HiOutlineBookOpen /> My Dreams</p>
                    </Link>
                    <Link to='/journal'>
                        <p id="link"><RiDraftLine /> My Drafts</p>
                    </Link>
                    <Link to='/about'>
                        <p id="link"><BsInfoCircle /> About</p>
                    </Link>
                    
                    <p id="link"><FiTag /> Shop</p>
                    {
                        user.length === 0 ? 
                            <Link to='/login'>
                                <p id="link" style={{color: 'white', paddingTop: '1.2rem'}}><HiLogin /> Login</p>
                            </Link>
                        :
                            <Link to='/'>
                                <p id="link" onClick={handleLogoutClick} style={{paddingTop: '1.2rem'}}> <FiLogOut /> Logout</p>
                            </Link>    
                    }
                </div>
                
            </div>
        </div>
    );
    
}

export default Header;

