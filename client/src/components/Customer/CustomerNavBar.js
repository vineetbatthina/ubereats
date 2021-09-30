import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/Generic.css';
import '../../css/Customer.css';
import CustomerSideBar from './CustomerSideBar';
import CustomerProfile from './CustomerProfile';
import { BiCartAlt } from "react-icons/bi";

export default class CustomerNavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locationSearch: '',
            dishSearch: ''
        };

        this.loadSideNavBar = this.loadSideNavBar.bind(this);
        this.collapseSidebar = this.collapseSidebar.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.searchByLocation = this.searchByLocation.bind(this);
    }

    loadSideNavBar() {
        this.setState({ sideNavbarVisible: !this.state.sideNavbarVisible })
    }

    collapseSidebar() {
        this.setState({ sideNavbarVisible: false })
    }

    renderProfile() {
        this.setState({
            showOrders: false,
            showEditMenu: false,
            showMenu: false,
            showProfile: true,
            sideNavbarVisible: false
        });
    }

    searchByLocation(event) {
        if (event.key === 'Enter') {
            this.props.searchByLocation(this.state.locationSearch);
        }
    }

    render() {
        return (
            <div className="landing_page">
                <div>
                    {this.state.sideNavbarVisible === true ? <CustomerSideBar collapseSidebar={this.collapseSidebar} renderProfile={this.renderProfile} /> : null}
                </div>
                <div className="navbar">
                    <span className="hamburger" onClick={this.loadSideNavBar}>&#9776;</span>
                    <a href="/">
                        <img alt="Uber Eats Home" role="img" src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" width="146" height="24" />
                    </a>
                    <input type="text" placeholder="Enter location" value={this.state.locationSearch} onChange={(e) => this.setState({ locationSearch: e.target.value })} className="customer_location_input" onKeyDown={this.searchByLocation}></input>
                    <input type="text" placeholder="What are you craving" value={this.state.dishSearch} onChange={(e) => this.setState({ dishSearch: e.target.value })} className="food_input" onKeyDown={this.searchByLocation}></input>
                    <a href="/"><button id="cart" ><BiCartAlt /> Cart</button></a>
                </div>
                <div className="container">
                    {this.state.showProfile === true ? <CustomerProfile /> : null}
                </div>
            </div>
        );
    }
}