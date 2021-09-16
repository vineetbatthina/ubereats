import React, { Component } from 'react';
import '../css/Restaurant.css';
import { createRestaurant } from '../services/RestaurantService';

export default class RestaurantLoginLandingPage extends Component {

    constructor(props){
        super(props);

        this.state ={
            storeName : '',
            storeLocation: '',
            fullName : '',
            emailId : '',
            pwd : '',
            rePwd : ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        const restuarant = {
            storeName: this.state.storeName,
            storeLocation : this.state.storeLocation,
            fullName: this.state.fullName,
            emailId: this.state.emailId,
            pwd: this.state.pwd
        }
        createRestaurant(restuarant);
        event.preventDefault();
        window.location.href="/";
    }

    render() {
        return (
            <div className="restaurant_landingpage">
                <header className="restaurant_header">
                    <div className="uber_eats">
                        <span id="uber">Uber</span> <span id="eats">Eats</span> <span id="for_res">for Restaurants</span>
                        <div className="sign_in_up">
                            <a href="/userLogin">
                            <button id="signin">
                                Sign in
                            </button>
                            </a>
                            <a href="/restaurant">
                            <button id="signup">
                                Sign up
                            </button>
                            </a>
                        </div>
                    </div>
                </header>
                <div>
                    <form className="signup_form">
                        <p id="get_started">Get Started</p>
                        <input placeholder="Store Name" className="res_signup_inputs" value={this.state.storeName} onChange={(e) => this.setState({ storeName: e.target.value })} required></input>
                        <input placeholder="Store Location" className="res_signup_inputs" value={this.state.storeLocation} onChange={(e) => this.setState({ storeLocation: e.target.value })} required></input>
                        <input placeholder="Your Full Name" className="res_signup_inputs" value={this.state.fullName} onChange={(e) => this.setState({ fullName: e.target.value })} required></input>
                        <input placeholder="Email" type="email" className="res_signup_inputs" value={this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })} required></input>
                        <input placeholder="Password" type="password" className="res_signup_inputs" value={this.state.pwd} onChange={(e) => this.setState({ pwd: e.target.value })} required></input>
                        <input placeholder="Re Enter Password" type="password" className="res_signup_inputs" value={this.state.rePwd} onChange={(e) => this.setState({ rePwd: e.target.value })} required></input>
                        <button className="res_signup_submit" onClick={this.handleSubmit}> Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}