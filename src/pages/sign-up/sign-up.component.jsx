import React from "react";
import './sign-up.styles.css'
import Header from "../../components/header/header.component";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          password: ''
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async postToServer() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password
            })
        };

        const response = await fetch('https://secret-cove-06846.herokuapp.com/users', requestOptions)
        const data = await response.json()  
        console.log(data);
        this.setState({name: ''}) 
        this.setState({email: ''})      
        this.setState({password: ''})
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        this.postToServer()
        event.preventDefault();
    }

    render() {
        return (
            <div className="login-signup-container">
                <Header />
                <div className="sign-up-container">
                    <form onSubmit={this.handleSubmit} className="form-container">
                        <label>
                            <input placeholder="Name" type="text" value={this.state.name} onChange={this.handleNameChange} />
                        </label>
                        <label>
                            <input placeholder="Email" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                        </label>
                        <label>
                            <input placeholder="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </label>
                        <input className="input-submit" type="submit" value="Sign up" />
                        <div>
                            Already have an account?{' '}
                            <Link to='/login'>
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;