import React, { Component } from 'react';
import { MdReceipt } from "react-icons/md";
import { Modal } from 'react-bootstrap';
import { updateOrder } from "../../services/RestaurantService";

export default class CustomerOrderCard extends Component {

    constructor(props) {
        super(props);

        this.state = {

            orderId: "",
            custEmailId: "",
            restaurantName: "",
            dishesOrdered: "[]",
            deliveryAddress: "",
            orderTimestamp: "",
            orderPrice: "",
            paymentMode: "",
            status: "",
            message: "",
            showCart: false

        }
    }

    async componentDidMount() {

        let order = this.props.order;

        this.setState({
            orderId: order._id,
            custEmailId: order.cust_email_id,
            restaurantName: order.restaurant_name,
            dishesOrdered: order.dishes_ordered,
            deliveryAddress: order.delivery_address,
            orderTimestamp: order.order_timestamp,
            orderPrice: order.order_price,
            paymentMode: order.payment_mode,
            status: order.status,
            message: order.message
        })

    }

    closePopup = (e) => {
        this.setState({
            showCart: false
        });
    }

    onCartClick = () => {
        console.log("Clicked receipt");
        this.setState({
            showCart: true
        });
    }

    cancelOrder = async () => {
        const currOrder = {
            _id: this.state.orderId,
            custEmailId: this.state.custEmailId,
            restaurantName: this.state.restaurantName,
            dishesOrdered: this.state.dishesOrdered,
            deliveryAddress: this.state.deliveryAddress,
            orderTimestamp: this.state.orderTimestamp,
            orderPrice: this.state.orderPrice,
            paymentMode: this.state.paymentMode,
            status: "CANCELLED",
            message: this.state.message
        }
        const updateSuccessful = await updateOrder(currOrder);
        console.log(updateSuccessful);
        this.setState({
            showCart: false
        });
        window.location.href='/customerOrders';
    }

    render() {

        return (
            <div>
                <div key={this.state.orderId} className="card w-50" >
                    <div className="card-body">
                        <div className="card-title">
                            <b>{this.state.restaurantName}</b>
                        </div>
                        <div className="row">
                            <div className="col-10">
                                Order Price: ${this.state.orderPrice}
                            </div>
                            <div className="col-2" onClick={this.onCartClick}>
                                <MdReceipt />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col" >
                                Status: {this.state.status}
                            </div>
                        </div>


                    </div>
                </div>
                <Modal show={this.state.showCart} onHide={this.closePopup} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Your order from {this.state.restaurantName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <center>
                            <div className="container">
                                <br /><br />
                                <div className="row">
                                    <h5>Order Details</h5>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        Payment Mode :
                                    </div>
                                    <div className="col-6">
                                        {this.state.paymentMode}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        Order Placed on :
                                    </div>
                                    <div className="col-6">
                                        {this.state.orderTimestamp}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        Total Price :
                                    </div>
                                    <div className="col-6">
                                        {this.state.orderPrice}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        Order Status :
                                    </div>
                                    <div className="col-6">
                                        <b>{this.state.status}</b>
                                    </div>
                                </div>
                                <div className="row" hidden={this.state.message === null}>
                                    <div className="col-6">
                                        Order Notes :
                                    </div>
                                    <div className="col-6">
                                        {this.state.message}
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <h5>Dishes Ordered</h5>
                                </div>
                                {
                                    JSON.parse(this.state.dishesOrdered).map((dish) => {
                                        return (
                                            <div>

                                                <div key={dish.dishId} className="card w-50" style={{ marginLeft: '10%' }}>
                                                    <div className="card-body">
                                                        <div className="card-title">
                                                            <b>{dish.dishName}</b>
                                                        </div>
                                                        <div className="card-text">
                                                            Quantity: {dish.dish_quantity}
                                                        </div>
                                                        <div className="card-text">
                                                            Price: ${dish.dish_price}
                                                        </div>
                                                    </div>

                                                </div>
                                                <br />
                                            </div>
                                        )
                                    })
                                }
                                <hr />
                            </div>
                        </center>
                    </Modal.Body>
                    <Modal.Footer hidden={this.state.status !== "RECEIVED"} style={{marginRight:"35%"}}>
                            <button onClick={this.cancelOrder}>
                                Cancel Order
                            </button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}