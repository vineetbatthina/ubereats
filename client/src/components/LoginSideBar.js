import React, { Component } from 'react';
import '../css/SideBar.css';

export default class LoginSideBar extends Component {

    constructor(props) {
        super(props);

        this.displayLandingPage = this.displayLandingPage.bind(this);
    }

    displayLandingPage() {
        this.props.collapseSidebar();
    }

    render() {
        return (
            <div>
                <div id="loginSideBar" className="sideBar">
                    <button className="signin_btn" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/userLogin';
                    }}>
                        Sign in
                    </button>
                    <a href='/restaurant'>Add your Restaurant</a>
                </div>
                <div className="blur" onClick={this.displayLandingPage}>
                </div>
            </div>
        );
    }
}