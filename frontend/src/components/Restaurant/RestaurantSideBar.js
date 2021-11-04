import React, { Component } from 'react';
import '../../css/SideBar.css';
import { Link } from 'react-router-dom';

export default class RestaurantSideBar extends Component {

    constructor(props) {
        super(props);

        this.displayLandingPage = this.displayLandingPage.bind(this);
        this.displayProfile = this.displayProfile.bind(this);
        this.displayMenu = this.displayMenu.bind(this);
        this.displayOrders = this.displayOrders.bind(this);
    }

    displayLandingPage() {
        this.props.collapseSidebar();
    }

    displayProfile() {
        this.props.renderProfile();
    }

    displayMenu() {
        this.props.renderMenu();
    }

    displayOrders() {
        this.props.renderOrders();
    }

    handleLogout(event) {
        event.preventDefault();
        window.location.href = '/userLogin';
    }

    render() {
        return (
            <div>
                <div className="sideBar">
                    <Link to="/restaurantProfile" style={{ color: 'inherit' }} >
                        <button className="res_sidebar_btns"> Profile </button>
                    </Link>
                    <Link to="/restaurantMenu" style={{ color: 'inherit' }} >
                        <button className="res_sidebar_btns"> Menu </button>
                    </Link>
                    <Link to="/restaurantOrders" style={{ color: 'inherit' }} >
                        <button className="res_sidebar_btns"> Orders </button>
                    </Link>
                    <Link to="/" style={{ color: 'inherit' }} >
                        <button className="res_sidebar_btns" onClick={this.handleLogout}> Log Out </button>
                    </Link>
                </div>
                <div className="blur" onClick={this.displayLandingPage}>
                </div>
            </div>
        );
    }
}