import React, { Component } from "react";
import '../../css/Customer.css';
import { getAllRestaurants } from '../../services/CustomerService';
import RestaurantCard from "../Common/RestaurantCard";

export default class CustomerRestaurantsDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: []
        }
    }

    async componentDidMount() {
        const restaurants = await getAllRestaurants();
        if (restaurants) {
            this.setState({
                restaurants: restaurants
            })
        }
    }

    displayLocalRestaurants(){
        if(this.props.location){
            return(
                <div>
                    location available
                </div>
            )
        }
        return null;
    }

    displayRestaurant

    render() {
        return (
            <div id="customer_restaurants">
                {this.displayLocalRestaurants()}
                <div className="row">
                    <h2>Our Restaurant Partners</h2>
                </div>
                <div className="row">
                    {
                        this.state.restaurants.map((restaurant) => {
                           return (
                               <div className="col">
                                   <RestaurantCard restaurantName={restaurant.store_name} restuarantDescription={restaurant.description} restaurantId = {this.props.restaurant_id}/>
                                </div>
                           )
                        })
                    }
                </div>
            </div>
        );

    }

}