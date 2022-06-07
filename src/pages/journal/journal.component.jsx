import React, { useEffect, useState } from "react";
import './journal.styles.css'
import Header from "../../components/header/header.component";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Journal = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [emotions, setEmotions] = useState('');
    const [lucid, setLucid] = useState(false);
    const [totalDreams, setTotalDreams] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const userToken = useSelector((state) => state.userToken)
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` }

    const postToServer = async () => {
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "title": title,
                "description": description,
                "emotionsAndFeelings": emotions,
                "wasLucid": lucid
            })
        };

        await fetch('http://localhost:8080/dreams', requestOptions)
        setTitle('')
        setDescription('')
        setEmotions('')
        setLucid(false)
    }

    const deleteDream = async (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: headers
        };

        await fetch(`http://localhost:8080/dreams/${id}`, requestOptions)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescChange = (event) => {
        setDescription(event.target.value)
    }

    const handleEmoteChange = (event) => {
        setEmotions(event.target.value)
    }

    const handleLucidChange = (event) => {
        setLucid(event.target.checked)
    }

    const handleSubmit = (event) => {
        postToServer()
        event.preventDefault();
    }

    useEffect(() => {
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
            {userToken.length > 1 ?
                <div className="sign-up-container">
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="journal-header-container">
                            <h1>Got a new dream to add?</h1>
                        </div>
                        
                        <label>
                            <input placeholder="Title" type="text" value={title} onChange={handleTitleChange} />
                        </label>
                        <label> 
                            <textarea id="desc" placeholder="What happened?" type="text" value={description} onChange={handleDescChange} />
                        </label>
                        <label>
                            <input placeholder="How did you feel?" type="text" value={emotions} onChange={handleEmoteChange} />
                        </label>
                        <label>Were you lucid?
                            <input className="check-input" placeholder="Lucid" type="checkbox" checked={lucid} onChange={handleLucidChange} />
                        </label>
                        <input className="input-submit" type="submit" value="Add dream" />
                        <div className="dreams-container">
                            {
                                totalDreams.slice(0).reverse().map((dream, i) => (
                                    <div className="dream-list-container">
                                        <div className="dream-list">
                                            <span className="delete-button">
                                                <button onClick={() => deleteDream(dream._id)}>X</button>
                                            </span>
                                            <div className="title-con">
                                                <h1>{dream.title}</h1>
                                            </div>
                                            <div className="desc-con">
                                                <p className="dream-desc">{dream.description}</p>
                                            </div>
                                            <div className="emote-con">
                                                <p className="dream-emote">Emotions & Feelings: {dream._id}</p>
                                            </div>
                                            <p className="dream-">Were you lucid? {dream.wasLucid ? 'Yes!' : 'Nope'}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </form>           
                </div>
            :   <div>
                <div className="signup-or-login-msg1">
                        <Link to='/signup'>
                            <p>Sign up</p>
                        </Link>
                        <span id="span-journal" />
                        <p>or</p>
                        <span id="span-journal" />
                        <Link to='/login'>
                            <p>Log in</p>
                        </Link>
                </div>
                <div className="signup-or-login-msg2">
                    <p>to view and create dream entries</p>
                </div>
                </div>
            }
        </div>
    );
    
}

export default Journal;