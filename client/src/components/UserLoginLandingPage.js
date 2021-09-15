import React, { Component } from "react";
import '../css/User.css';
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";

export default class UserLoginLandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = { page: '' };

        this.setPageRedirect = this.setPageRedirect.bind(this);
    }

    setPageRedirect(pageContent) {
        console.log("Inside User Login Landing Page Fuction");
        console.log(pageContent);
        this.setState({ page: pageContent })
    }

    render() {
        return (
            <div className="center-div">
                <a href="/" id="uber-eats-signin-img">
                    <img alt="Uber Eats Home" role="img" src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" width="200" height="40" />
                </a>
                {this.state.page==='signup' ? <UserSignup setPageRedirect={this.setPageRedirect}/> : < UserLogin setPageRedirect={this.setPageRedirect} />}
            </div>
        );
    }
}