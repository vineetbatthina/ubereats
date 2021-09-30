import React, { Component } from "react";
import '../css/User.css';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { addCustomerUser } from "../_actions/index";

class UserSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            userName: '',
            reEnterPassword: ''
        };
        this.storeUser = this.storeUser.bind(this);
        this.setPageProp = this.setPageProp.bind(this)
    }

    setPageProp(){
        this.props.setPageRedirect('');
    }

    storeUser (event) {
        event.preventDefault();
        if(this.state.password !== this.state.reEnterPassword){
            alert("Passwords Not Matching");
            return ;
        }
        const customerUser = {
            userEmail: this.state.emailId,
            userName : this.state.userName,
            password: this.state.password,
            restaurantOwner: 'N'
        }
        this.props.addCustomerUser(customerUser);
    }

    render() {
        let redirectComponent = null;
        if(this.props.signupStatus==="SUCCESS"){
            alert('Signp is successfull. Please Login');
            redirectComponent = <Redirect to="/" />
        }
        else if(this.props.signupStatus==="DUP"){
            alert('Email Id / User Id exists. Please Retry');
        }
        else if(this.props.signupStatus==="ERR"){
            alert('Please contact administrator');
        }

        return (
            <div>
                {redirectComponent}
                <form className="forms" id="signup_form" onSubmit={this.storeUser}>
                    Email Id:<br />
                    <input type="email" value={this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })} required></input><br />
                    User Name:<br />
                    <input type="text" value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value })} required></input><br />
                    Password:<br />
                    <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} required></input><br />
                    Re Enter Password:<br />
                    <input type="password" value={this.state.reEnterPassword} onChange={(e) => this.setState({ reEnterPassword: e.target.value })} required></input><br />
                    <button type="submit" id="signup_btn">Sign Up</button>
                </form>
                <button id="signup_btn" onClick={this.setPageProp}>Already have an account ? Log in </button>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
      addCustomerUser : customerUser => dispatch(addCustomerUser(customerUser))
    }
  }

const mapStateToProps = state => {
    return { 
        signupStatus: state.userReducer.signupStatus,
     };
};

  export default connect(mapStateToProps , mapDispatchToProps)(UserSignup);