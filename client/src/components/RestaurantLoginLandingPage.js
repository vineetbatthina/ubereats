import React, { Component } from 'react';
import '../css/Restaurant.css';
import { createRestaurant } from '../services/RestaurantService';
import { createUser } from '../services/UserService';

export default class RestaurantLoginLandingPage extends Component {

    constructor(props){
        super(props);

        this.state ={
            storeName : '',
            storeLocation: '',
            ownerName : '',
            emailId : '',
            pwd : '',
            rePwd : ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const user = {
            userEmail: this.state.emailId,
            userName : this.state.ownerName,
            password: this.state.pwd,
            restaurantOwner: 'Y'
        }
        const restuarant = {
            storeName: this.state.storeName,
            storeLocation : this.state.storeLocation,
            ownerName: this.state.ownerName,
        }
        const user_return_code = await createUser(user);
        if(user_return_code===301){
            alert('Email Id already exists Please Login');
        }
        else if(user_return_code===200){
            console.log('User Table Filled');
        }
        else {
            alert('Error signing up Restaurant. Please try again later');
        }
        const return_code = await createRestaurant(restuarant);
        if(return_code===310){
            alert('Store Name already exists Please Login');
        }
        else if(return_code===200){
            console.log('Restaurant Table Filled');
        }
        else {
            alert('Error signing up Restaurant. Please try again later');
        }
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
                    <form className="signup_form" onSubmit={this.handleSubmit}>
                        <p id="get_started">Get Started</p>
                        <input placeholder="Store Name" className="res_signup_inputs" value={this.state.storeName} onChange={(e) => this.setState({ storeName: e.target.value })} required></input>
                        <input placeholder="Store Location" className="res_signup_inputs" value={this.state.storeLocation} onChange={(e) => this.setState({ storeLocation: e.target.value })} required></input>
                        <input placeholder="User Name" className="res_signup_inputs" value={this.state.ownerName} onChange={(e) => this.setState({ ownerName: e.target.value })} required></input>
                        <input placeholder="Email" type="email" className="res_signup_inputs" value={this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })} required></input>
                        <input placeholder="Password" type="password" className="res_signup_inputs" value={this.state.pwd} onChange={(e) => this.setState({ pwd: e.target.value })} required></input>
                        <input placeholder="Re Enter Password" type="password" className="res_signup_inputs" value={this.state.rePwd} onChange={(e) => this.setState({ rePwd: e.target.value })} required></input>
                        <button type="submit" className="res_signup_submit"> Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}