import React, { Component } from 'react';
import { getOrdersByCustEmail } from '../../services/CustomerService';
import CustomerNavBar from '../Customer/CustomerNavBar';
import Pagination from '../Common/Pagination';

export default class Orders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            currentOrders: [],
            previousOrders: [],
            cancelledOrders:[],
            showCurrOrders: false,
            showPrevOrders: false,
            showCancelledOrders: false
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
        const orders = await getOrdersByCustEmail(request);
        const currentOrders = [];
        const previousOrders = [];
        const cancelledOrders = [];

        if (orders) {
            orders.map((order) => {
                if (order.status === 'DELIVERED' || order.status === 'PICKED_UP' || order.status === 'CANCELLED') {
                    previousOrders.push(order);
                    if (order.status === 'CANCELLED') {
                        cancelledOrders.push(order);
                    }
                }
                else {
                    currentOrders.push(order);
                }
            })
            this.setState({
                orders: orders,
                currentOrders: currentOrders,
                previousOrders: previousOrders,
                cancelledOrders: cancelledOrders,
                showCurrOrders: (currentOrders.length > 0 ? true : false),
                showPrevOrders: (previousOrders.length > 0 ? true : false)
            })
        }
        else {
            console.log("Error Fetching Orders");
            this.setState({
                orders: [],
                currentOrders: [],
                previousOrders: []
            })
        }
    }

    handleShowCancelledOrders  = () =>{
        this.setState({
            showCancelledOrders: true ,
            showPrevOrders : false,
            showCurrOrders : false
        });
    }

    handleShowAllOrders  = () =>{
        this.setState({
            showCancelledOrders: false ,
            showPrevOrders : true,
            showCurrOrders : true
        });
    }

    render() {
        return (
            <div>
                < CustomerNavBar searchByLocation={this.searchByLocation} />

                <div className="row" style={{ paddingLeft: '3%' }}>
                    <div className="col-2">
                        <button onClick={this.handleShowCancelledOrders }>Cancelled orders</button>
                    </div>
                    <div className="col-1" style={{ marginRight: '0%' }}>
                        <button onClick={this.handleShowAllOrders } >All orders</button>
                    </div>
                    <br />
                    <br />
                </div>
                <div className="row" hidden={!this.state.showCurrOrders} style={{ paddingLeft: '3%' }}>
                    <h3> Current Orders </h3>
                    <div className="col">
                        <Pagination orderslist={this.state.currentOrders} />
                        <br />
                    </div>
                </div>
                <div style={{ paddingLeft: '3%' }} className="row" hidden={!this.state.showPrevOrders}>
                    <h3> Previous Orders </h3>
                    <div className="col">
                        <Pagination orderslist={this.state.previousOrders} />
                        <br />
                    </div>
                </div>
                <div style={{ paddingLeft: '3%' }} className="row" hidden={!this.state.showCancelledOrders}>
                    <h3> Cancelled Orders </h3>
                    <div className="col">
                        <Pagination orderslist={this.state.cancelledOrders} />
                        <br />
                    </div>
                </div>
                <div style={{ paddingLeft: '3%' }} className="row" hidden={this.state.showCurrOrders || this.state.showPrevOrders || this.state.showCancelledOrders} >
                    No Orders were placed from your account. Explore our wide variety of cuisines from the Menu
                </div>
            </div>

        )
    }
}