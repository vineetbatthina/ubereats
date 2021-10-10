import React, { Component } from "react";
import '../../css/Customer.css';

export default class CustomerFilters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVegChecked: false,
            isNonVegChecked: false,
            isDeliveryChecked: false,
            isPickupChecked: false
        }

        this.vegChange = this.vegChange.bind(this);
        this.nonVegChange = this.nonVegChange.bind(this);
        this.deliveryChange = this.deliveryChange.bind(this);
        this.pickUpChange = this.pickUpChange.bind(this);
    }

    vegChange(){
        const currFilters = {
            isVegChecked : !this.state.isVegChecked,
            isNonVegChecked : this.state.isNonVegChecked,
            isDeliveryChecked : this.state.isDeliveryChecked,
            isPickupChecked : this.state.isPickupChecked
        }

        this.setState({
            isVegChecked : !this.state.isVegChecked
        })
        
        this.props.filtersChanged(currFilters);
    }

    nonVegChange(){
        const currFilters = {
            isVegChecked : this.state.isVegChecked,
            isNonVegChecked : !this.state.isNonVegChecked,
            isDeliveryChecked : this.state.isDeliveryChecked,
            isPickupChecked : this.state.isPickupChecked
        }

        this.setState({
            isNonVegChecked : !this.state.isNonVegChecked
        })
        
        this.props.filtersChanged(currFilters);
    }

    deliveryChange(){
        const currFilters = {
            isVegChecked : this.state.isVegChecked,
            isNonVegChecked : this.state.isNonVegChecked,
            isDeliveryChecked : !this.state.isDeliveryChecked,
            isPickupChecked : this.state.isPickupChecked
        }

        this.setState({
            isDeliveryChecked : !this.state.isDeliveryChecked
        })
        
        this.props.filtersChanged(currFilters);
    }

    pickUpChange(){
        const currFilters = {
            isVegChecked : this.state.isVegChecked,
            isNonVegChecked : this.state.isNonVegChecked,
            isDeliveryChecked : this.state.isDeliveryChecked,
            isPickupChecked : !this.state.isPickupChecked
        }

        this.setState({
            isPickupChecked : !this.state.isPickupChecked
        })
        
        this.props.filtersChanged(currFilters);
    }

    render() {
        return (
            <div id="customer_filters">
                <form style={{ marginLeft: '12%', marginTop: '20%' }}>
                    <div className="form-group card">
                        <div className="card-body">
                            <label class="card-title">Restaurant Type </label>
                            <br />
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="Delivery" checked={this.state.isVegChecked} onChange={this.vegChange} />
                                <label class="form-check-label" >Vegan</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" value="Pickup" checked={this.state.isNonVegChecked} onChange={this.nonVegChange} />
                                <label class="form-check-label" >Non-Vegan</label>
                            </div>
                        </div>

                    </div>
                    <div className="card" style={{ marginTop: '10%', marginLeft: '0.05%' }}>
                        <div className="card-body">
                                <label class="card-title">Delivery Type </label>
                                <br />
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" value="Delivery" checked={this.state.isDeliveryChecked} onChange={this.deliveryChange} />
                                    <label class="form-check-label" >Delivery</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" value="Pickup" checked={this.state.isPickupChecked} onChange={this.pickUpChange} />
                                    <label class="form-check-label" >Pickup</label>
                                </div>
                        </div>

                    </div>
                </form>
            </div>
        );

    }

}