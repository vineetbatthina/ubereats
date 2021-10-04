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
        this.displayRestaurantDetail = this.displayRestaurantDetail.bind(this);
    }

    searchByLocation(enteredLocation){
        this.setState({
            location : enteredLocation,
            showRestaurant : false
        })
    }

    displayRestaurantDetail(restaurantId){
        console.log(restaurantId);
    }

    componentWillUnmount(){
        console.log("CustomerDashboardUnmount");
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
                        <CustomerRestaurantsDisplay location={this.state.location} displayRestaurantDetail={this.displayRestaurantDetail}/>
                    </div>
                </div>
            </div>
        );
    }
}