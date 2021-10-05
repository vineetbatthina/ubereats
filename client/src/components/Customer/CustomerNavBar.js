import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/Generic.css';
import '../../css/Customer.css';
import CustomerSideBar from './CustomerSideBar';
import CustomerProfile from './CustomerProfile';
import { BiCartAlt } from "react-icons/bi";
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Orders from './Orders';

class CustomerNavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locationSearch: '',
            dishSearch: '',
            showCart: false,
            restaurantName: '',
            cartPrice: '',
            cartDishes: [],
            restaurantId : ''
        };

        this.loadSideNavBar = this.loadSideNavBar.bind(this);
        this.collapseSidebar = this.collapseSidebar.bind(this);
        this.renderProfile = this.renderProfile.bind(this);
        this.renderOrders = this.renderOrders.bind(this);
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
            showProfile: true
        });
    }

    renderOrders(){
        this.setState({
            showOrders: true,
            showProfile: false
        });
    }

    searchByLocation(event) {
        if (event.key === 'Enter') {
            this.props.searchByLocation(this.state.locationSearch);
        }
    }

    closePopup = (e) => {
        this.setState({
            showCart: false
        });
    }

    onCartClick = () => {
        const restaurantMap = new Map(JSON.parse(localStorage.restaurantMap));
        let cartDishes = JSON.parse(localStorage.getItem("cart_dishes"))
        const restaurantId = (cartDishes ? cartDishes.restaurantId : '1');
        const restaurantName = (restaurantMap ? restaurantMap.get(restaurantId) : "Restaurant Name");

        let cartPrice = 0;

        const empty_cart_dishes = {
            restaurantId: '',
            dishes: []
        }

        if (cartDishes) {
            cartDishes.dishes.map((dish) => {
                const totalPriceofDish = parseInt(dish.dish_price) * parseInt(dish.dish_quantity);
                cartPrice += totalPriceofDish;
            })
        }
        else {
            cartDishes = empty_cart_dishes;
        }

        this.setState({
            restaurantName: restaurantName,
            restaurantId : cartDishes.restaurantId,
            showCart: true,
            cartPrice: String(cartPrice),
            cartDishes: cartDishes.dishes
        });
    }

    render() {

        return (
            <div>
                <div>
                    {this.state.sideNavbarVisible === true ? <CustomerSideBar collapseSidebar={this.collapseSidebar} renderProfile={this.renderProfile} renderOrders={this.renderOrders} /> : null}
                </div>
                <div className="navbar">
                    <span className="hamburger" onClick={this.loadSideNavBar}>&#9776;</span>
                    <a href="/">
                        <img alt="Uber Eats Home" role="img" src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" width="146" height="24" />
                    </a>
                    <input type="text" placeholder="Enter location" value={this.state.locationSearch} onChange={(e) => this.setState({ locationSearch: e.target.value })} className="customer_location_input" onKeyDown={this.searchByLocation}></input>
                    <input type="text" placeholder="What are you craving" value={this.state.dishSearch} onChange={(e) => this.setState({ dishSearch: e.target.value })} className="food_input" onKeyDown={this.searchByLocation}></input>
                    <button id="cart" onClick={this.onCartClick}><BiCartAlt /> Cart. {this.props.cartCount === 0 ? JSON.parse(localStorage.getItem('cart_dishes')).dishes.length : this.props.cartCount} </button>
                </div>
                <div className="container">
                    {this.state.showProfile === true ? <CustomerProfile /> : null}
                </div>
                <div className="container">
                    {this.state.showOrders === true ? <Orders /> : null}
                </div>

                <Modal show={this.state.showCart} onHide={this.closePopup} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Your order from {this.state.restaurantName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <center>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Dish</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        JSON.parse(localStorage.getItem('cart_dishes')).dishes.map((dish) => {
                                            return (
                                                <tr key={dish.dishId}>
                                                    <td>{dish.dishName}</td>
                                                    <td>${dish.dish_price}</td>
                                                    <td>{dish.dish_quantity}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>


                        </center>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link
                            to={{
                                pathname: "/checkout",
                                state: {
                                    cartDishes: this.state.cartDishes,
                                    cartPrice: this.state.cartPrice,
                                    restaurantName: this.state.restaurantName,
                                    restaurantId : this.state.restaurantId
                                }
                            }}>
                            <button style={{ width: "100%", backgroundColor: "black", color: "white" }}>
                                Checkout Price : ${this.state.cartPrice}
                            </button>
                        </Link>

                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartCount: (state.customerReducer.cart !== '') ? JSON.parse(state.customerReducer.cart).dishes.length : 0
    };
};

export default connect(mapStateToProps)(CustomerNavBar);
