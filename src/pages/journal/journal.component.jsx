import React, { useEffect, useState } from "react";
import './journal.styles.css'
import Header from "../../components/header/header.component";
import { useSelector } from 'react-redux';

const Journal = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [lucid, setLucid] = useState('');
    const [totalDreams, setTotalDreams] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const user = useSelector((state) => state.user)

    const postToServer = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password
            })
        };

        const response = await fetch('http://localhost:8080/users', requestOptions)
        const data = await response.json()  
        console.log(data);          
    }

    const handleNameChange = (event) => {
        setTitle(event.target.value)
    }

    const handleEmailChange = (event) => {
        setDescription(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setLucid(event.target.value)
    }

    const handleSubmit = (event) => {
        alert(title + ' ' + description + ' ' + lucid);
        postToServer()
        event.preventDefault();
    }

    useEffect(() => {
        const headers = { 'Bearer Token': user }
        // GET request using fetch with error handling
        fetch(`http://localhost:8080/dreams`, { headers })
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
    
                setTotalDreams(data)
                console.log(this.state.totalDreams)
            })
            .catch(error => {
                setErrorMessage(error.toString());
                console.error('There was an error!', errorMessage);
            });
    })

    
    return (
        <div className="login-signup-container">
            <Header />
            <div className="sign-up-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <label>
                        <input placeholder="Title" type="text" value={title} onChange={handleNameChange} />
                    </label>
                    <label>
                        <input placeholder="Description" type="text" value={description} onChange={handleEmailChange} />
                    </label>
                    <label>
                        <input placeholder="Password" type="password" value={lucid} onChange={handlePasswordChange} />
                    </label>
                    <input className="input-submit" type="submit" value="Add dream" />
                    <h1 style={{color: 'white'}}>Dreams {totalDreams}</h1>
                    <h1>hello {user}</h1>
                </form>
            </div>
        </div>
    );
    
}

export default Journal;