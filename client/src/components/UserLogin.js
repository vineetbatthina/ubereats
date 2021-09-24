import React, { Component } from "react";
import '../css/User.css';
import { login } from '../services/index';

export default class UserLogin extends Component {

    constructor(props)
    {
        super(props);

        this.state ={
            emailId : '',
            pwd : ''
        }

        this.setPageProp = this.setPageProp.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    setPageProp(){
        this.props.setPageRedirect('signup');
    }

    async handleLogin(event){
        event.preventDefault();
        const credentials = {
            emailId : this.state.emailId,
            pwd: this.state.pwd 
        }
        const loginResult = await login(credentials);
        console.log(loginResult)
        if(loginResult.code === 200 ){
            if(loginResult.restaurantOwner === 'Y'){
                localStorage.setItem('res','res_logged_in');
                localStorage.setItem('emailId',credentials.emailId);
                window.location.href="/dashboard";
            }
            else if(loginResult.restaurantOwner === 'N') {
                localStorage.setItem('cust','cus_logged_in');
                localStorage.setItem('emailId',credentials.emailId);
                window.location.href="/custdashboard";
            }
        }
        else if (loginResult.code === 400){
            document.getElementById('error_div').innerHTML = loginResult.errorMessege;
        }
        else{
            document.getElementById('error_div').innerHTML = "Contact Administrator";
        }
    }

    render() {
        return (
            <div>
                <form className="forms" id="signin_form" onSubmit={this.handleLogin}>
                    Email Id:<br/>
                    <input type ="email" required value={this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })}></input><br/>
                    Password:<br/>
                    <input type ="password" required value={this.state.pwd} onChange={(e) => this.setState({ pwd: e.target.value })}></input><br />
                    <button type="submit" id="login_btn">Login</button>
                </form>
                <button id="signup_btn" onClick={this.setPageProp}>Don't have an account? Signup</button>
                <div className="container">
                    <br/>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col" id="error_div" style={{color:'red'}}></div>
                    </div>
                </div>
            </div>
        );
    }
}