import React, { useState } from "react";
import './log-in.styles.css'
import Header from "../../components/header/header.component";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../../features/user/userSlice";

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const user = useSelector((state) => state.user)
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

        fetch('http://localhost:3003/users/login', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json')
                const data = isJson && await response.json()

                if (!response.ok) {
                    const error = (data && data.message) || response.status
                    return Promise.reject(error)
                }

                dispatch(setUser(data.user._id))
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
                <h1>hello {user}</h1>
            </form>
        </div>
    );
}

export default LogIn;