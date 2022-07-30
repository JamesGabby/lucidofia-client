import React, { useState } from "react";
import './log-in.styles.css'
import Header from "../../components/header/header.component";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../../features/user/userSlice";
import { setUserToken } from "../../features/user/userTokenSlice";
import { setUserName } from "../../features/user/userNameSlice";

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const user = useSelector((state) => state.user)
    //const userToken = useSelector((state) => state.userToken)
    const userName = useSelector((state) => state.userName)
    const dispatch = useDispatch()
    
    const postToServer = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };

        fetch('https://secret-cove-06846.herokuapp.com/users/login', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json')
                const data = isJson && await response.json()

                if (!response.ok) {
                    const error = (data && data.message) || response.status
                    return Promise.reject(error)
                }

                dispatch(setUserToken(data.token))
                dispatch(setUser(data.user._id))
                dispatch(setUserName(data.user.name))
            }).catch(error => {
                setErrorMessage(error.toString())
                console.error('There was an error.', errorMessage);
            })
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        postToServer()
        setEmail('')
        setPassword('')
        event.preventDefault();
    }

    return (
        <div className="login-container">
            <Header />
            {
                user.length === 0 ? 
                <form onSubmit={handleSubmit} className="form-container">
                    <label>
                        <input placeholder="Email" type="text" value={email} onChange={handleEmailChange} />
                    </label>
                    <label>
                        <input placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <input className="input-submit" type="submit" value="Log in" />
                    <div>
                        Don't have an account?{' '}
                        <Link to='/signup'>
                            Sign up
                        </Link>
                    </div>
                </form>
            :   
                <div className="form-container">
                    <h1>Welcome {userName}!</h1>
                    <Link to='/journal'>
                        <input className="input-submit" type="submit" value="Go to journal" />
                    </Link>
                </div>
            }
        </div>
    );
}

export default LogIn;