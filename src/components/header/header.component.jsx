import React from "react";
import './header.styles.css'
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    
    render() {
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
                    <Link to='/login'>
                        <p id="link" style={{color: 'black'}}>Login</p>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;

