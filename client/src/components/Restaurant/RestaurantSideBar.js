import React, { Component } from 'react';
import '../../css/SideBar.css';

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

    displayProfile(){
        this.props.renderProfile();
    }

    displayMenu(){
        this.props.renderMenu();
    }

    displayOrders(){
        this.props.renderOrders();
    }

    render() {
        return (
            <div>
                <div className="sideBar">
                    <button className="res_sidebar_btns" onClick={this.displayProfile}>
                        Profile
                    </button>
                    <button className="res_sidebar_btns" onClick={this.displayMenu}>
                        Menu
                    </button>
                    <button className="res_sidebar_btns" onClick={this.displayOrders}>
                        Orders
                    </button>
                    <button className="res_sidebar_btns" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/userLogin';
                    }}>
                        Log Out
                    </button>
                </div>
                <div className="blur" onClick={this.displayLandingPage}>
                </div>
            </div>
        );
    }
}