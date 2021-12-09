import React, { Component } from "react";
import '../../css/User.css';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { addCustomerUser } from "../../_actions/index";
import { withApollo } from 'react-apollo';
import { CREATE_USER_QUERY } from '../../mutations/mutations';

class CustomerSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            userName: '',
            reEnterPassword: '',
            signupStatus : ''
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

        let userResponse = false;
        this.props.client.mutate({
            mutation: CREATE_USER_QUERY,
            variables: {
                user_name: this.state.userName,
                user_emailId: this.state.emailId,
                user_pwd: this.state.password,
                restaurant_owner: 'N'
            }
        })
            .then(response => {
                console.log("inside success")
                console.log("response in update profile owner ", response.data);
                userResponse = (response.data.createUser.success === true) ? true : false;
                console.log(userResponse);
                console.log(userResponse);
                if (userResponse) {
                    this.setState({
                        signupStatus: "SUCCESS"
                    })
                }
                else {
                    console.log("here 22");
                    this.setState({
                        signupStatus: "FAILURE"
                    })
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                this.setState({
                    signupStatus: "FAILURE"
                })
            })
    }

    render() {
        let redirectComponent = null;
        if(this.state.signupStatus==="SUCCESS"){
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
                <form id="signup_form" onSubmit={this.storeUser} style={{ marginLeft: '3%' }}>
                    <div className="row">
                        <div className="col">
                            <h5>Email Id:</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="email" value={this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })} required className="form-control" placeholder="Email Id" ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <h5>User Name:</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value })} required className="form-control" placeholder="Email Id" ></input>
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
                            <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} required className="form-control" placeholder="Enter Your Password" ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <h5>Re Enter Password:</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="password" value={this.state.reEnterPassword} onChange={(e) => this.setState({ reEnterPassword: e.target.value })} required className="form-control" placeholder="Enter Your Password" ></input>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col">
                            <button type="submit" id="signup_btn" className="btn btn-dark">Sign Up</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button id="login_btn" onClick={this.setPageProp} className="btn btn-dark">Already have an account ? Log in</button>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}


export default withApollo(CustomerSignup);