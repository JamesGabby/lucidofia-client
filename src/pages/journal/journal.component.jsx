import React, { useEffect, useState } from "react";
import './journal.styles.css'
import Header from "../../components/header/header.component";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { CgClose } from 'react-icons/cg'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Journal = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [emotions, setEmotions] = useState('');
    const [lucid, setLucid] = useState(false);
    const [totalDreams, setTotalDreams] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [date, setDate] = React.useState(new Date());

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

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
    
    const handleChange = (newValue) => {
        setDate(newValue);
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
        <div>
            <Header />
            {userToken.length > 1 ?
                <div>
                    <form onSubmit={handleSubmit} className="journal-container">
                        <div className="journal-header-container">
                            <h1>Add dream</h1>
                        </div>
                        <div className="journal-headers">
                        <h3>Date and Time</h3>
                            <ThemeProvider theme={darkTheme}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        value={date}
                                        onChange={(newValue) => {
                                          setDate(newValue)
                                        }}
                                        disableFuture={true}
                                    />
                                </LocalizationProvider>
                            </ThemeProvider>
                        </div>
                        <div className="journal-headers">
                            <h3>Title</h3>
                        </div>
                        <label>
                            <input className="add-dream-input" placeholder="Pink Giraffe" type="text" value={title} onChange={handleTitleChange} />
                        </label>
                        <div className="journal-headers">
                            <h3>What happened?</h3>
                        </div>
                        <label> 
                            <textarea className="add-dream-text-area" placeholder="I opened my door then..." type="text" value={description} onChange={handleDescChange} />
                        </label>
                        <div className="journal-headers">
                            <h3>How did you feel?</h3>
                        </div>
                        <label>
                            <input className="add-dream-input" placeholder="Amused, shocked, happy..." type="text" value={emotions} onChange={handleEmoteChange} />
                        </label>
                        <h3>Were you lucid?
                            <input className="check-input" placeholder="Lucid" type="checkbox" checked={lucid} onChange={handleLucidChange} />
                        </h3>
                        <input className="journal-submit" type="submit" value="Add dream" />
                        <div className="dreams-container">
                            { 
                                totalDreams.slice(0).reverse().map((dream, i) => (
                                    <div className="dream-list-container">
                                        <div className="dream-list">
                                            <span className="delete-button">
                                                <div onClick={() => deleteDream(dream._id)}><CgClose style={{fontSize: '1.5rem', color: 'white'}} /></div>
                                            </span>
                                            <label className="dream-label">Title</label>
                                            <div className="title-con">
                                                <h2>{dream.title}</h2>
                                            </div>
                                            <label className="dream-label">The dream</label>
                                            <div className="desc-con">
                                                <p className="fs">{dream.description}</p>
                                            </div>
                                            <label className="dream-label">How you felt</label>
                                            <div className="emote-con">
                                                <p className="fs">{dream.emotionsAndFeelings}</p>
                                            </div>
                                            <label className="dream-label">Were you lucid?</label>
                                            <p className="lucid-con">{dream.wasLucid ? 'Yes!' : 'Nope'}</p>
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