import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateCart } from '../../_actions/index';

class DishCustomer extends Component {

    constructor(props) {
        super(props);

        this.setState({
            openPopup: false,
            item_quantity: 1,
            showConfirmation: false
        });

        this.showPopup = this.showPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.addDishesToCart = this.addDishesToCart.bind(this);
        this.confirmYes = this.confirmYes.bind(this);
        this.closeConfirmation = this.closeConfirmation.bind(this);
    }

    showPopup = () => {
        if ((JSON.parse(localStorage.getItem("cart_dishes")).restaurantId) !== '' && (JSON.parse(localStorage.getItem("cart_dishes")).restaurantId) !== this.props.restaurantId) {
            this.setState({
                showConfirmation: true
            });
        }
        else {

            this.setState({
                openPopup: true
            });
        }
    };

    closePopup = (e) => {
        this.setState({
            openPopup: false
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

        if ((JSON.parse(localStorage.getItem("cart_dishes")).restaurantId) !== '' && (JSON.parse(localStorage.getItem("cart_dishes")).restaurantId) !== this.props.restaurantId) {
            alert(" Previous Restaurant Dishes are Replaced !!")
            existingCart.restaurantId = '';
            existingCart.dishes = [];
            localStorage.setItem("cart_dishes", JSON.stringify(existingCart));
        }

        let existingDish = false;
        if (existingCart.dishes.length > 0) {
            existingDish = existingCart.dishes.some(dish => dish.dishId === this.props.dishId);
        }

        if (!existingDish) {
            existingCart = JSON.parse(localStorage.getItem("cart_dishes"));

            existingCart.dishes.push({
                dishId: this.props.dishId,
                dishName: this.props.dishName,
                dish_quantity: document.getElementById("item_quantity").value,
                dish_price: this.props.dishPrice,
            });
            existingCart.restaurantId = this.props.restaurantId;
            localStorage.setItem("cart_dishes", JSON.stringify(existingCart));
            this.setState({
                openPopup: false,
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

    confirmYes(){
        let existingCart = JSON.parse(localStorage.getItem("cart_dishes"));

        if ((JSON.parse(localStorage.getItem("cart_dishes")).restaurantId) !== '' && (JSON.parse(localStorage.getItem("cart_dishes")).restaurantId) !== this.props.restaurantId) {
            existingCart.restaurantId = '';
            existingCart.dishes = [];
            localStorage.setItem("cart_dishes", JSON.stringify(existingCart));
        }

        this.setState({
            openPopup: true,
            showConfirmation: false
        })
    }

    closeConfirmation(){
        this.setState({
            showConfirmation: false
        })
    }

    render() {

        let buttonText = "Add to Cart";
        let buttonClick = this.showPopup;

        let cart_dishes = JSON.parse(localStorage.getItem("cart_dishes")).dishes;

        if (cart_dishes) {
            let dishExists = cart_dishes.some(dish => dish.dishId === this.props.dishId);

            if (dishExists) {
                buttonText = "Remove from Cart";
                buttonClick = this.removeFromCart;
            }
        }

        let openPopup = false;
        if (this.state) {
            openPopup = this.state.openPopup;
        }
        let showConfirmation = false;
        if (this.state) {
            showConfirmation = this.state.showConfirmation;
        }

        return (
            <div>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={this.props.dishImg} className="img-thumbnail" onError={(e) => { e.target.onerror = null; e.target.src = "../../images/default_dish.jpg" }} />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.dishName}</h5>
                        <p className="card-text">{this.props.dishDescription}</p>
                        <p className="card-text">Contains: {this.props.dishIngredients}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Category : {this.props.dishCategory}</li>
                        <li className="list-group-item">Price : ${this.props.dishPrice}</li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col" style={{ marginTop: '2%', marginLeft: '20%' }} onClick={buttonClick}>
                        <button>{buttonText}</button>
                    </div>

                </div>

                <Modal show={openPopup} onHide={this.closePopup} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.dishName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <center>
                            <p>{this.props.dishDescription}</p>
                            Quantity: <input type="number" name="Item Name" id="item_quantity" min="1" max="10" width="10%" onChange={this.modifyQuantity} defaultValue="1" autoFocus></input>
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
                <Modal show={showConfirmation} onHide={this.closeConfirmation} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <center>
                            <p>Do you wish to replace the previous restaurant's dishes with this new restaurant dishes ? </p>
                        </center>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.confirmYes}>
                            Yes
                        </button>
                        <button onClick={this.closeConfirmation}>
                            No
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (payload) => dispatch(updateCart(payload))
    }
}

export default connect(null, mapDispatchToProps)(DishCustomer);