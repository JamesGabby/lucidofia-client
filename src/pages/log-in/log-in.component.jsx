import React, { useState } from "react";
import './log-in.styles.css'
import Header from "../../components/header/header.component";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../../features/user/userSlice";
import { setUserToken } from "../../features/user/userTokenSlice";
import { setUserName } from "../../features/user/userNameSlice";

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const serverUrl = 'https://xofiabase.herokuapp.com/'

    const user = useSelector((state) => state.user)
    //const userToken = useSelector((state) => state.userToken)
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

        fetch(`${serverUrl}/users/login`, requestOptions)
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
                setErrorMessage('Login Successful.')
            }).catch(error => {
                if (email === '' && password === '') {
                    setErrorMessage('Please enter your email and password.')
                } else if (password === '') {
                    setErrorMessage('Please enter your password.')
                } else if (email === '') {
                    setErrorMessage('Please enter your email.')
                } else if (error.toString() === '400') {
                    setErrorMessage('Email or password is incorrect.')
                } else {
                    setErrorMessage('There was an error.', errorMessage)
                }
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
                    <h1>Login</h1>
                    <label>
                        <input className="add-dream-input" placeholder="Email" type="text" value={email} onChange={handleEmailChange} />
                    </label>
                    <label>
                        <input className="add-dream-input" placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <input className="journal-submit" type="submit" value="Log in" />
                    <div className={user.length === 0 ? "error-message" : "success-message"}>
                        <p>{errorMessage}</p>
                    </div>
                    <div>
                        Don't have an account?{' '}
                        <Link to='/signup'>
                            Sign up
                        </Link>
                    </div>
                </form>
            :   
                <Navigate to="/journal" /> 
            }
        </div>
    );
}

export default LogIn;