import React, { useEffect, useState } from "react";
import './journal.styles.css'
import Header from "../../components/header/header.component";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from "moment";

const Journal = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [emotions, setEmotions] = useState('');
    const [lucid, setLucid] = useState(false);
    const [totalDreams, setTotalDreams] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [date, setDate] = useState(new Date());
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const serverUrl = 'https://xofiabase.herokuapp.com/'
    const userToken = useSelector((state) => state.userToken)
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` }

    const postToServer = async () => {
        console.log(date)
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "date": date,
                "title": title,
                "description": description,
                "emotionsAndFeelings": emotions,
                "wasLucid": lucid
            })
        };
        await fetch(`${serverUrl}/dreams`, requestOptions)
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
        await fetch(`${serverUrl}/dreams/${id}`, requestOptions)
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
        fetch(`${serverUrl}/dreams`, { headers })
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
    }, [])

    return (
        <div style={{paddingBottom: '3rem'}}>
            <Header />
            {userToken.length > 1 ?
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="journal-container">
                            <div className="journal-header-container">
                                <h1>Add dream</h1>
                            </div>
                            <div >
                                <h3 className="journal-headers"></h3>
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
                            </div>
                            <label className="journal-label">
                                <input className="add-dream-input" placeholder="Title" type="text" value={title} onChange={handleTitleChange} />
                            </label>
                            <div className="journal-headers">
                            </div>
                            <label className="journal-label"> 
                                <textarea className="add-dream-text-area" placeholder="Description" type="text" value={description} onChange={handleDescChange} />
                            </label>
                            <div className="journal-headers">
                            </div>
                            <label className="journal-label">
                                <input className="add-dream-input" placeholder="How did you feel?" type="text" value={emotions} onChange={handleEmoteChange} />
                            </label>
                            <h3>Were you lucid?
                                <input className="check-input" placeholder="Lucid" type="checkbox" checked={lucid} onChange={handleLucidChange} />
                            </h3>
                            <input className="journal-submit" type="submit" value="Add dream" />
                            <div style={{paddingTop: '2rem'}} />
                            <div className="dream-list-container">
                                { 
                                    totalDreams.slice(0).reverse().map((dream, i) => (
                                        <div className="container">
                                            <Accordion style={{background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.1995) 0%, rgba(217, 217, 217, 0.1995) 101.85%)', color: 'white'}} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon sx={{color: 'white'}} />}
                                                    aria-controls={`panel${i}bh-content`}
                                                    id={`panel${i}bh-header`}
                                                >
                                                    <Typography sx={{ width: '100%', padding: '0 !important' }}>
                                                        <b>{dream.title}</b>
                                                    </Typography>
                                                    
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                        <p>{moment(dream.date).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                                    <Typography>
                                                        {dream.description}
                                                    </Typography>
                                                    <p>How you felt</p>
                                                    <Typography>
                                                        {dream.emotionsAndFeelings}
                                                    </Typography>
                                                    <p>Were you lucid?</p>
                                                    <Typography>
                                                        {dream.wasLucid === true ? 'Yes' : 'No'}
                                                    </Typography>
                                                </AccordionDetails>
                                                <AccordionDetails sx={{paddingTop: '0 !important', color: 'red'}}>
                                                    <Typography >
                                                    <div style={{cursor: 'pointer'}} onClick={() => deleteDream(dream._id)}>Delete Dream</div>
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </form>
                                  
                </div>
            :   
                <div>
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
