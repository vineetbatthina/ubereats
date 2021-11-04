import React, { Component } from 'react';
import { getCustomerProfileByEmailId } from '../../services/CustomerService';
import '../../css/Generic.css';
import { sendOrders } from '../../services/CustomerService';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateCart } from '../../_actions/index';
import CustomerNavBar from './CustomerNavBar';

class Checkout extends Component {

    constructor(props) {

        super(props);
        this.state = {
            restaurantName: '',
            timings: '',
            emailId: '',
            phone: '',
            street: '',
            city:'',
            state: '',
            country: '',
            pincode: '',
            dishes: [],
            cartPrice: 0,
            totalPrice: 0,
            orderSuccessfull: false
        }
    }

    placeOrder = async () => {
        const modeofPayment = document.querySelector('input[name="inlineRadioOptions"]:checked').value;

        const currentDate = new Date();

        if(this.state.street!=='' && this.state.state!=='' && this.state.city!=='' && this.state.country!=='' && this.state.pincode!=='' ){
            const order = {
                custEmailId: localStorage.getItem('emailId'),
                restaurantId: this.props.location.state.restaurantId,
                dishes: JSON.stringify(this.state.dishes),
                deliveryAddress: JSON.stringify({
                    street: this.state.street,
                    city: this.state.city,
                    state: this.state.state,
                    country: this.state.country,
                    pincode: this.state.pincode
                }),
                orderTimeStamp: String(currentDate),
                paymentMode: modeofPayment,
                totalPrice: this.state.totalPrice,
            }
    
            console.log(order);
    
            let order_successful = await sendOrders(order);
    
            if (order_successful) {
                alert("Order Placed Successfully");
                const cart_dishes = {
                    restaurantId: '',
                    dishes : []
                }
                localStorage.setItem('cart_dishes',JSON.stringify(cart_dishes));
                this.props.updateCart(localStorage.getItem("cart_dishes"));
                this.setState({
                    orderSuccessfull : true
                });
            }
            else {
                alert("Constact Administrator");
            }
        }
        else{
            alert("Enter all address fields.");
        }
        
    }

    async componentDidMount() {
        let emailId = 'default@default.com';
        try {
            emailId = localStorage.getItem('emailId');
        }
        catch (error) {
            console.log(error);
        }
        const request = {
            emailId: emailId
        }
        const customerProfile = await getCustomerProfileByEmailId(request);
        const totalPrice = (parseFloat(this.props.location.state.cartPrice) + parseFloat(this.props.location.state.cartPrice * 0.1) + parseFloat(this.props.location.state.cartPrice * 0.01)).toFixed(2);

        if (customerProfile) {
            const address = JSON.parse(customerProfile.address);
            this.setState({
                street: (address.street) ? address.street : '',
                city : (address.city) ? address.city : '',
                state: (address.state) ? address.state : '',
                country: (address.country) ? address.country : '',
                pincode: (address.pincode) ? address.pincode : '',
                dishes: (this.props.location.state.cartDishes) ? this.props.location.state.cartDishes : [],
                cartPrice: (this.props.location.state.cartPrice) ? parseInt(this.props.location.state.cartPrice) : 0,
                totalPrice: totalPrice
            })
        }
        else{
            this.setState({
                street: '',
                city : '',
                state: '',
                country: '',
                pincode: '',
                dishes: (this.props.location.state.cartDishes) ? this.props.location.state.cartDishes : [],
                cartPrice: (this.props.location.state.cartPrice) ? parseInt(this.props.location.state.cartPrice) : 0,
                totalPrice: totalPrice
            })
        }
    }

    render() {

        let redirectComponent = null;
        if (this.state.orderSuccessfull === true) {
            redirectComponent = <Redirect to="/custdashboard" />
        }
        return (
            <div className="row">
                {redirectComponent}
                < CustomerNavBar />
                <div className="col-8" style={{ margin: "2% 0 0 2%" }}>
                    <div>
                        <div className="row">
                            <h3> Delivery Address </h3>
                        </div>
                        <br />
                        <div className="row">
                            <form>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Street" value={this.state.street} onChange={(e) => this.setState({ street: e.target.value })} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="City" value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="State" value={this.state.state} onChange={(e) => this.setState({ state: e.target.value })} />
                                        </div>
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Country" value={this.state.country} onChange={(e) => this.setState({ country: e.target.value })} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col">
                                            <input type="number" className="form-control" placeholder="Pincode" value={this.state.pincode} onChange={(e) => this.setState({ pincode: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <br />
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col">
                                <h2>{this.state.restaurantName}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h5>Your Dishes</h5>
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
                                            this.state.dishes.map((dish) => {
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
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h5>Payment Type</h5>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="cash" defaultChecked />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Cash</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="cards" />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Credit / Debit Card</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="paypal" />
                                    <label className="form-check-label" htmlFor="inlineRadio3">Paypal</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3" style={{ margin: "2% 0 0 2%" }}>
                    <div className="row">
                        <h3> Price Break </h3>
                    </div>
                    <table className="table">
                        <tbody>

                            <tr>
                                <td>Subtotal</td>
                                <td>{this.state.cartPrice}</td>
                            </tr>
                            <tr >
                                <td>Taxes and Fees</td>
                                <td>{(this.state.cartPrice * 0.1).toFixed(2)}</td>
                            </tr>
                            <tr >
                                <td>Delivery Fee</td>
                                <td>{(this.state.cartPrice * 0.01).toFixed(2)}</td>
                            </tr>
                            <tr >
                                <td>Total</td>
                                <td>{(parseFloat(this.state.cartPrice) + parseFloat(this.state.cartPrice * 0.1) + parseFloat(this.state.cartPrice * 0.01)).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="container">
                        <div className="row" style={{ backgroundColor: '#05944F', color: 'white' }}>
                            <button style={{ color: 'white' }} onClick={this.placeOrder}> Place Order </button>
                        </div>

                        <Link to = "/custdashboard" style = {{color: 'inherit'}} >
                            <div className="row" style={{ marginTop: '2%', backgroundColor: 'Black', color: 'white' }}>
                                <button style={{ color: 'white' }}> Missed Something ? Go to Menu </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (payload) => dispatch(updateCart(payload))
    }
}

export default  connect(null, mapDispatchToProps)(Checkout);