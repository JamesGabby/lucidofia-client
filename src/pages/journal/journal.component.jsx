import React, { useEffect, useState } from "react";
import './journal.styles.css'
import Header from "../../components/header/header.component";
import { useSelector } from 'react-redux';

const Journal = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [lucid, setLucid] = useState(false);
    const [totalDreams, setTotalDreams] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const userToken = useSelector((state) => state.userToken)
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
        const headers = { Authorization: `Bearer ${userToken}` }
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
                    {
                        totalDreams.map((dream, i) => (
                            <div className="dream-list">
                                <h1>#{i+1}{' '}{dream.title}</h1>
                                <p>{dream.description}</p>
                                <p>{dream.emotionsAndFeelings}</p>
                            </div>
                        ))
                    }
                </form>
            </div>
        </div>
    );
    
}

export default Journal;