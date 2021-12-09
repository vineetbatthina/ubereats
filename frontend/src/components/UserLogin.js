import React, { Component } from "react";
import '../css/User.css';
import { Redirect } from 'react-router';

import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

const LOGIN_QUERY = gql`
query LoginQuery($user_emailId: String, $user_pwd: String){
        login(user_emailId: $user_emailId, user_pwd: $user_pwd){
            user_name,
            restaurant_owner
    }
}`

class UserLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            pwd: '',
            loginSuccess: false,
            isRestaurantOwner : ''
        }

        this.setPageProp = this.setPageProp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    setPageProp() {
        this.props.setPageRedirect('signup');
    }

    handleLogin(event) {
        event.preventDefault();

        this.props.client.query({
            query: LOGIN_QUERY,
            variables: {
                user_emailId : this.state.emailId,
                user_pwd: this.state.pwd
            }
        }).then(response => {
            console.log("Response: ", response);
            this.setState({
                loginSuccess : true,
                isRestaurantOwner : response.data.login.restaurant_owner
            })
        }).catch(error => {
            console.log("In error");
        })
    }

    render() {
        let redirectComponent = null;
        if (this.state.loginSuccess ) {
            alert("Login is successful");
            localStorage.setItem('isLoggedIn', this.state.loginSuccess);
            localStorage.setItem('isRestaurantOwner', this.state.isRestaurantOwner);
            localStorage.setItem('emailId', this.state.emailId);
            const cart_dishes = {
                restaurantId: '',
                dishes: []
            }

            localStorage.setItem('cart_dishes', JSON.stringify(cart_dishes));

            if (this.state.isRestaurantOwner === 'N') {
                redirectComponent = <Redirect to="/custdashboard" />
            }
            else if (this.state.isRestaurantOwner === 'Y') {
                redirectComponent = <Redirect to="/dashboard" />
            }
        }

        return (
            <div>
                {redirectComponent}
                <form onSubmit={this.handleLogin} id="signin_form" style={{ marginLeft: '3%' }}>
                    <div className="row">
                        <div className="col">
                            <h5>Email Id:</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="email" required value={this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })} className="form-control" placeholder="Email Id" ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <h5>Password:</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="password" required value={this.state.pwd} onChange={(e) => this.setState({ pwd: e.target.value })} className="form-control" placeholder="Enter Your Password" ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <button type="submit" id="login_btn" className="btn btn-dark">Login</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button id="signup_btn" onClick={this.setPageProp} className="btn btn-dark">Don't have an account? Signup</button>
                        </div>
                    </div>
                </form>
                <div className="container">
                    <br />
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col" id="error_div" style={{ color: 'red' }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withApollo(UserLogin);