import React, { Component } from "react";
import '../../css/User.css';
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { addCustomerUser } from "../../_actions/index";

class CustomerSignup extends Component {

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

  export default connect(mapStateToProps , mapDispatchToProps)(CustomerSignup);