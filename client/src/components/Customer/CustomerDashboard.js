import React, { Component } from 'react';
import CustomerNavBar from './CustomerNavBar';
import CustomerRestaurantsDisplay from './CustomerRestaurantsDisplay';
import CustomerFilters from './CustomerFilters';

export default class CustomerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location : ''
        }

        this.searchByLocation = this.searchByLocation.bind(this);
    }

    searchByLocation(enteredLocation){
        this.setState({
            location : enteredLocation
        })
    }

    render() {
        return (
            <div>
                < CustomerNavBar searchByLocation={this.searchByLocation}/>
                <div className="row">
                    <div className="col-3">
                        <CustomerFilters />

                    </div>
                    <div className="col-9">
                        <CustomerRestaurantsDisplay location={this.state.location}/>
                    </div>
                </div>
            </div>
        );
    }
}