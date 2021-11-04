import React, { Component } from 'react';
import '../../css/Restaurant.css';
import { addRestaurant } from '../../_actions/index';
import { addCustomerUser } from '../../_actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

class RestaurantLoginLandingPage extends Component {

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

    handleSubmit(event){
        event.preventDefault();
        if(this.state.pwd !== this.state.rePwd){
            alert("Passwords Don't Match");
            return 0;
        }
        const restaurantUser = {
            userEmail: this.state.emailId,
            userName : this.state.ownerName,
            password: this.state.pwd,
            restaurantOwner: 'Y'
        }
        const restuarant = {
            storeName: this.state.storeName,
            storeLocation : this.state.storeLocation,
            ownerEmail: this.state.emailId,
        }

        this.props.addCustomerUser(restaurantUser);
        this.props.addRestaurant(restuarant);
    }

    render() {
        let redirectComponent = null;
        if (this.props.userAdditionStatus === "SUCCESS" && this.props.restaurantAdditionStatus === "SUCCESS" ) {
            alert("Signup is successful");
            redirectComponent = <Redirect to="/" />
        }
        else if(this.props.userAdditionStatus==="DUP" || this.props.restaurantAdditionStatus==="DUP"){
            alert('Email Id / User Id exists. Please Retry');
        }
        else if(this.props.userAdditionStatus==="ERR" || this.props.restaurantAdditionStatus==="ERR"){
            alert('Please contact administrator');
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

const mapDispatchToProps = (dispatch) => {
    return {
        addCustomerUser : restaurantUser => dispatch(addCustomerUser(restaurantUser)),
        addRestaurant : restuarant => dispatch(addRestaurant(restuarant))   
     }
}

const mapStateToProps = state => {
    return {
        userAdditionStatus : state.userReducer.signupStatus,
        restaurantAdditionStatus : state.restaurantReducer.signupStatus
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantLoginLandingPage);