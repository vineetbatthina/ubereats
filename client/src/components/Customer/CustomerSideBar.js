import React, { Component } from 'react';
import '../../css/SideBar.css';
import { connect } from 'react-redux';
import { logOutUser } from '../../_actions/userActions';
import { Link } from 'react-router-dom';

class CustomerSideBar extends Component {

    constructor(props) {
        super(props);

        this.displayLandingPage = this.displayLandingPage.bind(this);
        this.displayProfile = this.displayProfile.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.displayOrders = this.displayOrders.bind(this);
    }

    displayLandingPage() {
        this.props.collapseSidebar();
    }

    displayProfile() {
        this.props.renderProfile();
    }

    displayOrders() {
        this.props.renderOrders();
    }

    handleLogout() {
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('isRestaurantOwner', '');
        localStorage.setItem('emailId', '');
        const cart_dishes = {
            restaurantId: '',
            dishes: []
        }

        localStorage.setItem('cart_dishes', JSON.stringify(cart_dishes));

        this.props.logOutUser();

        window.location.href = "/";
    }

    render() {
        return (
            <div>
                <div className="sideBar">
                    <Link to="/custDashboard" style={{ color: 'inherit' }} >
                        <button className="cust_sidebar_btns"> Dashboard </button>
                    </Link>
                    <Link to="/favourites" style={{ color: 'inherit' }} >
                        <button className="cust_sidebar_btns"> Favourites </button>
                    </Link>
                    <Link to="/customerProfile" style={{ color: 'inherit' }} >
                        <button className="cust_sidebar_btns"> Profile </button>
                    </Link>
                    <Link to="/customerOrders" style={{ color: 'inherit' }} >
                        <button className="cust_sidebar_btns"> Orders </button>
                    </Link>
                    <Link to="/" style={{ color: 'inherit' }} >
                        <button className="cust_sidebar_btns" onClick={this.handleLogout}> Log Out </button>
                    </Link>
                </div>
                <div className="blur" onClick={this.displayLandingPage}>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOutUser: () => dispatch(logOutUser())
    }
}

export default connect(null, mapDispatchToProps)(CustomerSideBar);