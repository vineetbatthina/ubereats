import React, { Component } from 'react';
import { getOrdersByResId } from '../../services/RestaurantService';
import { AiFillEdit } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Modal } from 'react-bootstrap';
import RestaurantNavBar from './RestaurantNavBar';
import { updateOrder } from "../../services/RestaurantService";
import '../../css/Generic.css';

import { withApollo } from 'react-apollo';
import { GET_RESTAURANT_ORDERS } from '../../queries/queries';
import { UPDATE_ORDER_STATUS } from '../../mutations/mutations';

class Orders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            filteredOrders: [],
            editStatusModalVisible: false,
            orderModalVisible: false,
            currentOrder: {},
            currentOrderDishes: '[]',
            changedStatus: '',
            currentOrdersStatus: 'RECEIVED'
        }

        this.editStatusModal = this.editStatusModal.bind(this);
        this.orderModal = this.orderModal.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.displayOrdersByStatus = this.displayOrdersByStatus.bind(this);
    }

    editStatusModal(order) {
        console.log(order);
        this.setState({
            editStatusModalVisible: true,
            orderModalVisible: false
        })
    }

    orderModal() {
        this.setState({
            editStatusModalVisible: false,
            orderModalVisible: true
        })
    }

    async changeStatus() {
        const currOrder = this.state.currentOrder;
        if (currOrder.status !== this.state.changedStatus && currOrder.status !== '') {
            currOrder.status = this.state.changedStatus;

            this.props.client.mutate({
                mutation: UPDATE_ORDER_STATUS,
                variables: {
                    _id: currOrder._id,
                    status: currOrder.status
                }
            }).then(response => {
                console.log("After Update, Response from backend is: ",response);
                if (response.data.updateOrderStatus) {
                    let emailId = 'default@default.com';
                    try {
                        emailId = localStorage.getItem('emailId');
                    }
                    catch (error) {
                        console.log(error);
                    }
                    this.props.client.query({
                        query: GET_RESTAURANT_ORDERS,
                        variables: {
                            email_id: emailId
                        }
                    }).then(response => {
                        console.log(response);
                        if (response.data.getOrdersByRestaurantId) {
                            const filteredOrders = [];
                            response.data.getOrdersByRestaurantId.forEach((order) => {
                                if (order.status === 'RECEIVED') {
                                    filteredOrders.push(order);
                                }
                            })
            
                            this.setState({
                                orders: response.data.getOrdersByRestaurantId,
                                filteredOrders: filteredOrders
                            })
                        }
                    }).catch(err => {
                        console.log("Error Fetching Orders");
                        this.setState({
                            orders: [],
                            filteredOrders: []
                        })
                    })
                }
            }).catch(err => {
                console.log("Error Fetching Orders");
                this.setState({
                    orders: [],
                    filteredOrders: []
                })
            })
        }
    }

    displayOrdersByStatus(event) {
        if (event.target.value !== this.state.currentOrdersStatus) {
            const filteredOrders = [];
            if (this.state.orders) {

                this.state.orders.forEach((order) => {
                    if (order.status === event.target.value) {
                        filteredOrders.push(order);
                    }
                })

                this.setState({
                    filteredOrders: filteredOrders,
                    currentOrdersStatus: event.target.value,
                    changedStatus: event.target.value
                })

            }
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

        this.props.client.query({
            query: GET_RESTAURANT_ORDERS,
            variables: {
                email_id: emailId
            }
        }).then(response => {
            console.log(response);
            if (response.data.getOrdersByRestaurantId) {
                const filteredOrders = [];
                response.data.getOrdersByRestaurantId.forEach((order) => {
                    if (order.status === 'RECEIVED') {
                        filteredOrders.push(order);
                    }
                })

                this.setState({
                    orders: response.data.getOrdersByRestaurantId,
                    filteredOrders: filteredOrders
                })
            }
        }).catch(err => {
            console.log("Error Fetching Orders");
            this.setState({
                orders: [],
                filteredOrders: []
            })
        })
    }

    render() {
        return (
            <div>
                <RestaurantNavBar />
                <div style={{ marginLeft: '3%' }}>
                    <h5>Order Status</h5>
                    <div >
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="RECEIVED" onChange={this.displayOrdersByStatus} checked={(this.state.changedStatus) ? ((this.state.changedStatus === "RECEIVED") ? true : false) : true} />
                            <label className="form-check-label" htmlFor="inlineRadio2">Received</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="PREPARING" onChange={this.displayOrdersByStatus} checked={(this.state.changedStatus) ? ((this.state.changedStatus === "PREPARING") ? true : false) : false} />
                            <label className="form-check-label" htmlFor="inlineRadio1">Preparing</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="OTW" onChange={this.displayOrdersByStatus} checked={(this.state.changedStatus) ? ((this.state.changedStatus === "OTW") ? true : false) : false} />
                            <label className="form-check-label" htmlFor="inlineRadio3">On The way</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="DELIVERED" onChange={this.displayOrdersByStatus} checked={(this.state.changedStatus) ? ((this.state.changedStatus === "DELIVERED") ? true : false) : false} />
                            <label className="form-check-label" htmlFor="inlineRadio3">Delivered</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="CANCELLED" onChange={this.displayOrdersByStatus} checked={(this.state.changedStatus) ? ((this.state.changedStatus === "CANCELLED") ? true : false) : false} />
                            <label className="form-check-label" htmlFor="inlineRadio3">Cancelled</label>
                        </div>
                    </div>

                    <div className="container">
                        <br />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Ordered By</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.filteredOrders.map((order) => {
                                        return (
                                            <tr key={order._id}>
                                                <td>{order.cust_email_id}</td>
                                                <td>${order.order_price}</td>
                                                <td>
                                                    <div className="row" >
                                                        <div className="col-2" hidden={(order.status === "DELIVERED") || (order.status === "CANCELLED") ? true : false} onClick={() => {
                                                            this.setState({
                                                                currentOrder: order,
                                                                editStatusModalVisible: true,
                                                                orderModalVisible: false,
                                                                currentOrderDishes: order.dishes_ordered
                                                            })
                                                        }
                                                        }>
                                                            <AiFillEdit />
                                                        </div>
                                                        <div className="col-1" onClick={() => {
                                                            this.setState({
                                                                currentOrder: order,
                                                                editStatusModalVisible: false,
                                                                orderModalVisible: true,
                                                                currentOrderDishes: order.dishes_ordered
                                                            })
                                                        }
                                                        }>
                                                            <GrView />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <Modal show={this.state.editStatusModalVisible} onHide={() => { this.setState({ editStatusModalVisible: false }) }} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Status</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <center>
                                <p> Order From : {this.state.currentOrder.cust_email_id}  </p>
                                <p> Order Price : ${this.state.currentOrder.order_price}  </p>
                                <p> Current Status : {this.state.currentOrder.status}  </p>
                                <div onChange={(event) => { this.setState({ changedStatus: event.target.value }) }}>
                                    <h4 style={{ marginRight: '2%' }}> Order Status </h4>
                                    {
                                        (this.state.currentOrder.status === 'RECEIVED') ? null :
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status_change_radios" id="status_change_radio1" value="RECEIVED" />
                                                <label className="form-check-label" htmlFor="inlineRadio2">Received</label>
                                            </div>
                                    }
                                    {
                                        (this.state.currentOrder.status === 'PREPARING') ? null :
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status_change_radios" id="status_change_radio2" value="PREPARING" />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Preparing</label>
                                            </div>
                                    }
                                    {
                                        (this.state.currentOrder.status === 'OTW') ? null :
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status_change_radios" id="status_change_radio3" value="OTW" />
                                                <label className="form-check-label" htmlFor="inlineRadio3">On The way</label>
                                            </div>
                                    }
                                    {
                                        (this.state.currentOrder.status === 'DELIVERED') ? null :
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status_change_radios" id="status_change_radio4" value="DELIVERED" />
                                                <label className="form-check-label" htmlFor="inlineRadio3">Delivered</label>
                                            </div>
                                    }
                                    {
                                        (this.state.currentOrder.status === 'CANCELLED') ? null :
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status_change_radios" id="status_change_radio5" value="CANCELLED" />
                                                <label className="form-check-label" htmlFor="inlineRadio3">Cancelled</label>
                                            </div>
                                    }
                                </div>
                            </center>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={this.changeStatus}>
                                Save
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.orderModalVisible} onHide={() => { this.setState({ orderModalVisible: false }) }} centered dialogClassName="modal-90w">
                        <Modal.Header closeButton>
                            <Modal.Title>Order Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <center>
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            Payment Mode :
                                        </div>
                                        <div className="col">
                                            {this.state.currentOrder.payment_mode}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            Order Placed on :
                                        </div>
                                        <div className="col">
                                            {this.state.currentOrder.order_timestamp}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            Total Price :
                                        </div>
                                        <div className="col">
                                            {this.state.currentOrder.order_price}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            Order Status :
                                        </div>
                                        <div className="col">
                                            <b>{this.state.currentOrder.status}</b>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <h5>Dishes Ordered</h5>
                                    </div>
                                    {
                                        JSON.parse(this.state.currentOrderDishes).map((dish) => {
                                            return (
                                                <div key={dish._id}>
                                                    {dish.dishName}
                                                    <div className="col">
                                                        Quantity: {dish.dish_quantity}
                                                    </div>
                                                    <div className="col">
                                                        Price: ${dish.dish_price}
                                                    </div>
                                                    <hr />
                                                </div>
                                            )
                                        })
                                    }
                                    <hr />
                                </div>
                            </center>
                        </Modal.Body>
                    </Modal>
                </div>

            </div>

        )
    }
}

export default withApollo(Orders);