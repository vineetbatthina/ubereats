import React, { Component } from 'react';
import { getOrdersByResId } from '../../services/RestaurantService';
import { AiFillEdit } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Modal } from 'react-bootstrap';

export default class Orders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            filteredOrders: [],
            editStatusModalVisible : false,
            orderModalVisible : false
        }

        this.editStatusModal = this.editStatusModal.bind(this);
        this.orderModal = this.orderModal.bind(this);
    }

    editStatusModal(){
        this.setState({
            editStatusModalVisible : true,
            orderModalVisible : false
        })
    }

    orderModal(){
        this.setState({
            editStatusModalVisible : false,
            orderModalVisible : true
        })
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
        const orders = await getOrdersByResId(request);
        const filteredOrders = [];
        if (orders) {

            orders.map((order) => {
                if (order.status === 'RECIEVED') {
                    filteredOrders.push(order);
                }
            })

            this.setState({
                orders: orders,
                filteredOrders: filteredOrders
            })

        }
        else {
            console.log("Error Fetching Orders");
            this.setState({
                orders: [],
                filteredOrders: []
            })
        }
    }

    render() {
        return (
            <div>
                <h5>Order Status</h5>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="cash" defaultChecked />
                    <label className="form-check-label" htmlFor="inlineRadio2">Recieved</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="cards" />
                    <label className="form-check-label" htmlFor="inlineRadio1">Preparing</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="paypal" />
                    <label className="form-check-label" htmlFor="inlineRadio3">On The way</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="paypal" />
                    <label className="form-check-label" htmlFor="inlineRadio3">Delivered</label>
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
                                        <tr key={order.order_id}>
                                            <td>{order.cust_email_id}</td>
                                            <td>${order.order_price}</td>
                                            <td>
                                                <div className="row" onClick={this.editStatusModal}>
                                                    <div className="col-2">
                                                        <AiFillEdit />
                                                    </div>
                                                    <div className="col" onClick={this.orderModal}>
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
                <Modal show={this.state.editStatusModalVisible} onHide={this.closePopup} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>DishName</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <center>
                            <p>Description</p>
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

                <Modal show={this.state.orderModalVisible} onHide={this.closePopup} centered>
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
            </div>

        )
    }
}