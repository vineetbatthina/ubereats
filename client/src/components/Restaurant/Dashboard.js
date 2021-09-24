import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/Generic.css';
import '../../css/Restaurant.css';
import RestaurantSideBar from './RestaurantSideBar';
import RestaurantProfile from './RestaurantProfile';
import RestaurantMenu from './RestaurantMenu';
import RestaurantMenuEdit from './RestaurantMenuEdit';
import Orders from './Orders';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sideNavbarVisible: false,
            showProfile: false,
            showMenu: false,
            showEditMenu : false,
            showOrders : false,
        };

        this.loadSideNavBar = this.loadSideNavBar.bind(this);
        this.collapseSidebar = this.collapseSidebar.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.renderEditMenu = this.renderEditMenu.bind(this);
        this.renderOrders = this.renderOrders.bind(this);
    }

    loadSideNavBar() {
        this.setState({ sideNavbarVisible: !this.state.sideNavbarVisible })
    }

    collapseSidebar() {
        this.setState({ sideNavbarVisible: false })
    }

    renderProfile() {
        this.setState({
            showOrders : false,
            showEditMenu : false,
            showMenu: false,
            showProfile: true,
            sideNavbarVisible: false
        });
    }

    renderMenu() {
        this.setState({
            showOrders : false,
            showEditMenu : false,
            showMenu: true,
            showProfile: false,
            sideNavbarVisible: false
         });
    }

    renderEditMenu(){
        this.setState({ 
            showOrders : false,
            showEditMenu : true,
            showMenu: false,
            showProfile: false,
            sideNavbarVisible: false
         });
    }

    renderOrders(){
        this.setState({ 
            showOrders : true,
            showEditMenu : false,
            showMenu: false,
            showProfile: false,
            sideNavbarVisible: false
         });
    }

    handleLogout(){
        localStorage.clear();
        window.location.href="/";
    }

    render() {
        return (
            <div className="landing_page">
                <div>
                    {this.state.sideNavbarVisible === true ? <RestaurantSideBar collapseSidebar={this.collapseSidebar} renderProfile={this.renderProfile} renderMenu={this.renderMenu} renderOrders={this.renderOrders} /> : null}
                </div>
                <div className="navbar">
                    <span className="hamburger" onClick={this.loadSideNavBar}>&#9776;</span>
                    <a href="/">
                        <img alt="Uber Eats Home" role="img" src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" width="146" height="24" />
                    </a>
                    <a href="/"><button className="button" id="logout_btn" onClick={this.handleLogout}>Logout</button></a>
                </div>
                <div className="container">
                    {this.state.showProfile === true ? <RestaurantProfile /> : null}
                </div>
                <div className="container">
                    {this.state.showMenu === true ? <RestaurantMenu renderEditMenu={this.renderEditMenu}/> : null}
                </div>
                <div className="container">
                    {this.state.showEditMenu === true ? <RestaurantMenuEdit /> : null}
                </div>
                <div className="container">
                    {this.state.showOrders === true ? <Orders /> : null}
                </div>
            </div>
        );
    }
}