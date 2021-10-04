import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/Generic.css';
import '../../css/Customer.css';
import CustomerSideBar from './CustomerSideBar';
import CustomerProfile from './CustomerProfile';
import { BiCartAlt } from "react-icons/bi";
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

class CustomerNavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locationSearch: '',
            dishSearch: '',
            showCart : false
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
            sideNavbarVisible: false,
        });
    }

    searchByLocation(event) {
        if (event.key === 'Enter') {
            this.props.searchByLocation(this.state.locationSearch);
        }
    }

    showPopup = () => {
        this.setState({
            showCart: true
        });
    };

    closePopup = (e) => {
        this.setState({
            showCart: false
        });
    }

    modifyQuantity = (event) => {
        let quantity = parseInt(event.target.value);
        this.setState({
            item_quantity: quantity
        });
    };

    addDishesToCart = () => {
        let existingCart = JSON.parse(localStorage.getItem("cart_dishes"));

        if ((JSON.parse(localStorage.getItem("cart_dishes")).restaurantId)!==''  && (JSON.parse(localStorage.getItem("cart_dishes")).restaurantId) !== this.props.restaurantId){
            alert(" Previous Restaurant Dishes are Replaced !!")
            existingCart.restaurantId = '';
            existingCart.dishes = [];
            localStorage.setItem("cart_dishes", JSON.stringify(existingCart));
        }

        let existingDish = false;
        if(existingCart.dishes.length > 0){
            existingDish = existingCart.dishes.some( dish => dish.dishId === this.props.dishId);
        }

        if(!existingDish){
            existingCart = JSON.parse(localStorage.getItem("cart_dishes"));

            existingCart.dishes.push({
                dishId : this.props.dishId,
                dishName : this.props.dishName,
                dish_quantity : this.state.item_quantity,
                dish_price : this.props.dishPrice,
            });
            existingCart.restaurantId = this.props.restaurantId;
            localStorage.setItem("cart_dishes",JSON.stringify(existingCart));
            this.setState({
                showCart: false,
                item_quantity: 1
            });
        }

        console.log(localStorage.getItem("cart_dishes"));
        this.props.updateCart(localStorage.getItem("cart_dishes"));
    };

    removeFromCart = (event) => {
        let existingCart = JSON.parse(localStorage.getItem("cart_dishes"));

        let index = existingCart.dishes.findIndex((dish => dish.dishId === this.props.dishId));

        if (index !== -1) {
            event.target.textContent = "Add to Cart";
            existingCart.dishes.splice(index, 1);
            localStorage.setItem("cart_dishes", JSON.stringify(existingCart));
            this.setState({
                item_quantity: null
            });
        }

        console.log(localStorage.getItem("cart_dishes"));
        this.props.updateCart(localStorage.getItem("cart_dishes"));
    };

    componentWillUnmount(){
        console.log("UnMounting the NAvbar");
        console.log(this.state);
    }

    render() {
        let buttonText = "Add to Cart";

        let showCart = false;
        if (this.state) {
            showCart = this.state.showCart;
        }
        console.log(this.state.showCart);

        return (
            <div>
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
                    <button id="cart" onClick={ () => {this.setState({ showCart : true })} }><BiCartAlt /> Cart. {this.props.cartCount===0 ? JSON.parse(localStorage.getItem('cart_dishes')).dishes.length : this.props.cartCount} </button>
                </div>
                <div className="container">
                    {this.state.showProfile === true ? <CustomerProfile /> : null}
                </div>

                <Modal show={this.state.showCart} onHide={this.closePopup} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <center>
                            <p>{this.props.dishDescription}</p>
                            Quantity: <input type="number" name="Item Name" min="1" max="10" width="10%" onChange={this.modifyQuantity} defaultValue="1" autoFocus></input>
                        </center>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.closePopup}>
                            Close
                        </button>
                        <button onClick={this.addDishesToCart}>
                            Add to Cart
                        </button>
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

// const mapStateToProps = state => {
//     return {
//         cartCount: (state.customerReducer.cart ! == '') ? JSON.parse(state.customerReducer.cart).dishes.length : 0
//     };
// };

// export default connect(mapStateToProps,null)(CustomerNavBar);

//{this.props.cartCount ? this.props.cartCount  : JSON.parse(localStorage.getItem).dishes.length} 