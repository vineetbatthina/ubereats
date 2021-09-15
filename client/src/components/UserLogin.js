import React, { Component } from "react";
import '../css/User.css';
import {getAllUsers} from '../services/UserService';

export default class UserLogin extends Component {

    constructor(props)
    {
        super(props);
        this.setPageProp = this.setPageProp.bind(this)
    }

    setPageProp(){
        this.props.setPageRedirect('signup');
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <form className="forms" id="signin_form">
                    Email Id:<br/>
                    <input type ="text" required></input><br/>
                    Password:<br/>
                    <input type ="text" required></input><br />
                    <button type="submit" id="login_btn">Login</button>
                </form>
                <button id="signup_btn" onClick={this.setPageProp}>Don't have an account? Signup</button>
            </div>
        );
    }
}