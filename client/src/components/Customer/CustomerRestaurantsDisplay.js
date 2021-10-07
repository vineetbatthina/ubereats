import React, { Component } from "react";
import '../../css/Customer.css';
import { getAllRestaurants } from '../../services/UserService';
import RestaurantCard from "../Common/RestaurantCard";

export default class CustomerRestaurantsDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: []
        }

    }

    async componentDidMount() {

        const initMap = new Map();
        localStorage.restaurantMap = JSON.stringify(Array.from(initMap));

        const restaurants = await getAllRestaurants();
        if (restaurants) {
            this.setState({
                restaurants: restaurants,
            })
            
            const restaurantMap = new Map(JSON.parse(localStorage.restaurantMap));
            restaurants.map((restaurant) => {
                restaurantMap.set(restaurant.restaurant_id,restaurant.store_name)
            })
            localStorage.restaurantMap = JSON.stringify(Array.from(restaurantMap));
        }

        console.log(localStorage.restaurantMap);
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
                               <div className="col" key={restaurant.restaurant_id}>
                                   <RestaurantCard restaurantName={restaurant.store_name} restaurantDescription={restaurant.description} restaurantId = {restaurant.restaurant_id} pathName="/restaurantDisplayForCustomer" source="customer"/>
                                </div>
                           )
                        })
                    }
                </div>
            </div>
        );

    }

}