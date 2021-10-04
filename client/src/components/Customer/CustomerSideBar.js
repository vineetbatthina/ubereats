import React, { Component } from 'react';
import '../../css/SideBar.css';
import {connect} from 'react-redux';
import {logOutUser} from '../../_actions/userActions';

class CustomerSideBar extends Component {

    constructor(props) {
        super(props);

        this.displayLandingPage = this.displayLandingPage.bind(this);
        this.displayProfile = this.displayProfile.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    displayLandingPage() {
        this.props.collapseSidebar();
    }

    displayProfile() {
        this.props.renderProfile();
    }

    handleLogout(){
        localStorage.setItem('isLoggedIn',false);
        localStorage.setItem('isRestaurantOwner','');
        localStorage.setItem('emailId','');
        const cart_dishes = {
            restaurantId: '',
            dishes : []
        }

        localStorage.setItem('cart_dishes',JSON.stringify(cart_dishes));
        
        this.props.logOutUser();

        window.location.href="/";
    }

    render() {
        return (
            <div>
                <div className="sideBar">
                    <button className="cust_sidebar_btns" onClick={this.displayProfile}>
                        Profile
                    </button>
                    <button className="cust_sidebar_btns" onClick={this.handleLogout}>
                        Log Out
                    </button>
                </div>
                <div className="blur" onClick={this.displayLandingPage}>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        logOutUser : () => dispatch(logOutUser())
    }
  }

export default connect(null, mapDispatchToProps)(CustomerSideBar);