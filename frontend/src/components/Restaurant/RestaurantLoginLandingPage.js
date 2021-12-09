import React, { Component } from 'react';
import '../../css/Restaurant.css';
import { Redirect } from 'react-router';

import { withApollo } from 'react-apollo';
import { CREATE_RESTAURANT_QUERY, CREATE_USER_QUERY } from '../../mutations/mutations';

class RestaurantLoginLandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            storeName: '',
            storeLocation: '',
            ownerName: '',
            emailId: '',
            pwd: '',
            rePwd: '',
            addedRestaurant: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.pwd !== this.state.rePwd) {
            alert("Passwords Don't Match");
            return 0;
        }

        var restaurantResponse = false;
        var userResponse = false;
        console.log("Here 1");
        this.props.client.mutate({
            mutation: CREATE_RESTAURANT_QUERY,
            variables: {
                store_name: this.state.storeName,
                store_location: this.state.storeLocation,
                owner_email: this.state.emailId,
            }
        })
            .then(response => {
                console.log("inside success")
                console.log("response in update profile owner ", response.data);
                restaurantResponse = (response.data.createRestaurantProfile.success === true) ? true : false;
                console.log(restaurantResponse);
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                restaurantResponse = false;
            })

        this.props.client.mutate({
            mutation: CREATE_USER_QUERY,
            variables: {
                user_name: this.state.ownerName,
                user_emailId: this.state.emailId,
                user_pwd: this.state.pwd,
                restaurant_owner: 'Y'
            }
        })
            .then(response => {
                console.log("inside success")
                console.log("response in update profile owner ", response.data);
                userResponse = (response.data.createUser.success === true) ? true : false;
                console.log(userResponse);
                console.log(restaurantResponse);
                console.log(userResponse);
                if (restaurantResponse && userResponse) {
                    console.log("here 11");
                    this.setState({
                        addedRestaurant: "SUCCESS"
                    })
                }
                else {
                    console.log("here 22");
                    this.setState({
                        addedRestaurant: "FAILURE"
                    })
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                userResponse = false;
            })

    }

    render() {
        let redirectComponent = null;
        console.log(this.state.addedRestaurant);
        if (this.state.addedRestaurant === "SUCCESS") {
            alert("Signup is successful");
            redirectComponent = <Redirect to="/" />
        }
        else if (this.state.addedRestaurant === "FAILURE") {
            alert('Email Id / User Id exists. Please Retry');
            this.setState({
                addedRestaurant : ''
            })
        }
        return (
            <div className="restaurant_landingpage">
                {redirectComponent}
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

export default withApollo(RestaurantLoginLandingPage);