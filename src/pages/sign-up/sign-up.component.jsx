import React, { useState } from "react";
import './sign-up.styles.css'
import Header from "../../components/header/header.component";
import { Link, Navigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userCreated, setUserCreated] = useState(false);

    async function postToServer() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        };
        const response = await fetch('https://secret-cove-06846.herokuapp.com/users', requestOptions)
        const data = await response.json()  
        if (data) {
          setUserCreated(true)
        } else {
          setUserCreated(false)
        }
        setName('') 
        setEmail('')    
        setPassword('')
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        postToServer()
        e.preventDefault()
    }

    
    return (
        <div className="login-signup-container">
          <Header />
            { userCreated === false ? 
              <div className="sign-up-container">
                  <form onSubmit={handleSubmit} className="form-container">
                      <h1>Sign Up</h1>
                      <label>
                          <input className="add-dream-input" placeholder="Name" type="text" value={name} onChange={handleNameChange} />
                      </label>
                      <label>
                          <input className="add-dream-input" placeholder="Email" type="text" value={email} onChange={handleEmailChange} />
                      </label>
                      <label>
                          <input className="add-dream-input" placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
                      </label>
                      <input className="journal-submit" type="submit" value="Sign up" />
                      <div>
                          Already have an account?{' '}
                          <Link to='/login'>
                              Log in
                          </Link>
                      </div>
                  </form>
              </div> : <Navigate to="/login" /> }
        </div>
    )
}

export default SignUp;