import React, { Component } from "react";
import '../css/User.css';
import { createUser } from '../services/UserService';

export default class UserSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            reEnterPassword: ''
        };
        this.storeUser = this.storeUser.bind(this);
        this.setPageProp = this.setPageProp.bind(this)
    }

    setPageProp(){
        this.props.setPageRedirect('');
    }

    storeUser(event) {

        const user = {
            userEmail: this.state.emailId,
            userId : this.state.userId,
            password: this.state.password
        }
        createUser(user);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form className="forms" id="signup_form" onSubmit={this.storeUser}>
                    Email Id:<br />
                    <input type="email" value={this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })} required></input><br />
                    User Id:<br />
                    <input type="text" value={this.state.userId} onChange={(e) => this.setState({ userId: e.target.value })} required></input><br />
                    Password:<br />
                    <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} required></input><br />
                    Re Enter Password:<br />
                    <input type="password" value={this.state.reEnterPassword} onChange={(e) => this.setState({ reEnterPassword: e.target.value })} required></input><br />
                    <button type="submit" id="signup_btn" onSubmit={this.storeUser}>Sign Up</button>
                </form>
                <button id="signup_btn" onClick={this.setPageProp}>Already have an account ? Log in </button>
            </div>

        );
    }
}