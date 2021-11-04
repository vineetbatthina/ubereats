import React, { Component } from "react";
import '../css/User.css';
import { connect } from "react-redux";
import { loginUser } from '../_actions/index';
import { Redirect } from 'react-router';

class UserLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            pwd: ''
        }

        this.setPageProp = this.setPageProp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    setPageProp() {
        this.props.setPageRedirect('signup');
    }

    handleLogin(event) {
        event.preventDefault();
        const credentials = {
            emailId: this.state.emailId,
            pwd: this.state.pwd
        }
        this.props.loginUser(credentials);
    }

    render() {
        let redirectComponent = null;
        if (this.props.loginStatus === true) {
            alert("Login is successful");
            localStorage.setItem('isLoggedIn', this.props.loginStatus);
            localStorage.setItem('isRestaurantOwner', this.props.isRestaurantOwner);
            localStorage.setItem('emailId', this.state.emailId);

            const cart_dishes = {
                restaurantId: '',
                dishes: []
            }

            localStorage.setItem('cart_dishes', JSON.stringify(cart_dishes));

            if (this.props.isRestaurantOwner === 'N') {
                redirectComponent = <Redirect to="/custdashboard" />
            }
            else if (this.props.isRestaurantOwner === 'Y') {
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

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: customerUser => dispatch(loginUser(customerUser))
    }
}

const mapStateToProps = state => {
    return {
        loginStatus: state.userReducer.loginStatus,
        isRestaurantOwner: state.userReducer.isRestaurantOwner
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);