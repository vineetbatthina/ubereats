import React, { Component } from "react";
import '../../css/Customer.css';
import { getAllRestaurants } from '../../services/UserService';
import { getRestaurantsBasedonSearch } from '../../services/CustomerService';
import RestaurantCard from "../Common/RestaurantCard";
import { BsSearch } from "react-icons/bs";

export default class CustomerRestaurantsDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchedRestaurants: [],
            locationRestaurants: [],
            restaurants: [],
            searchString: ''
        }

        this.searchByString = this.searchByString.bind(this);
    }

    async componentDidMount() {

        const initMap = new Map();
        localStorage.restaurantMap = JSON.stringify(Array.from(initMap));

        const locationRestaurants = [];
        const restaurants = await getAllRestaurants();
        if (restaurants) {
            const restaurantMap = new Map(JSON.parse(localStorage.restaurantMap));
            console.log(localStorage.getItem('cust_location'));
            if (localStorage.getItem('cust_location')) {
                restaurants.forEach((restaurant) => {
                    restaurantMap.set(restaurant.restaurant_id, restaurant.store_name);
                    console.log(restaurant.store_location);
                    console.log(localStorage.getItem('cust_location'));
                    if (restaurant.store_location === localStorage.getItem('cust_location')) {
                        locationRestaurants.push(restaurant);
                    }
                })
            }
            this.setState({
                restaurants: restaurants,
                locationRestaurants: locationRestaurants,
            })

            localStorage.restaurantMap = JSON.stringify(Array.from(restaurantMap));
            console.log(locationRestaurants);
        }
    }

    async searchByString(event) {
        if (event.key === 'Enter' && this.state.searchString !== '') {

            const request = {
                searchString: this.state.searchString
            }
            const restaurants = await getRestaurantsBasedonSearch(request);
            if (restaurants) {
                this.setState({
                    searchedRestaurants: restaurants,
                })
            }
        }
        else if (event.key === 'Enter' && this.state.searchString === '') {
            this.setState({
                searchString: '',
                searchedRestaurants: [],
            })
        }
    }

    render() {
        return (
            <div id="customer_restaurants">
                <center>
                    <div className="input-group rounded" style={{ width: '50%' }}>
                        <input type="search" className="form-control" placeholder=" Search for Restaurants, Dishes, Cuisines and Location ! " aria-label="Search"
                            aria-describedby="search-addon" value={this.state.searchString} onChange={(event) => { this.setState({ searchString: event.target.value }) }} onKeyDown={this.searchByString} />
                        <span className="input-group-text border-0" id="search-addon">
                            <BsSearch />
                        </span>
                    </div>
                </center>
                <div hidden={(this.state.searchedRestaurants.length !== 0) || (this.state.locationRestaurants.length === 0)}>
                    <div className="row">
                        <h2>Based on Your Location</h2>
                    </div>
                    <div className="row">
                        {
                            this.state.locationRestaurants.map((restaurant) => {
                                return (
                                    <div className="col-3" key={restaurant.restaurant_id}>
                                        <RestaurantCard restaurantName={restaurant.store_name} restaurantLocation={restaurant.store_location} restaurantDescription={restaurant.description} restaurantImg={restaurant.restaurant_img} restaurantId={restaurant.restaurant_id} pathName="/restaurantDisplayForCustomer" source="customer" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div hidden={this.state.searchedRestaurants.length === 0}>
                    <div className="row">
                        <h2>Search Results</h2>
                    </div>
                    <div className="row">
                        {
                            this.state.searchedRestaurants.map((restaurant) => {
                                return (
                                    <div className="col-3" key={restaurant.restaurant_id}>
                                        <RestaurantCard restaurantName={restaurant.store_name} restaurantLocation={restaurant.store_location} restaurantDescription={restaurant.description} restaurantImg={restaurant.restaurant_img} restaurantId={restaurant.restaurant_id} pathName="/restaurantDisplayForCustomer" source="customer" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div hidden={(this.state.searchedRestaurants.length !== 0) || (this.state.locationRestaurants.length !== 0)}>
                    <div className="row">
                        <h2>Our Restaurant Partners</h2>
                    </div>
                    <div className="row">
                        {
                            this.state.restaurants.map((restaurant) => {
                                return (
                                    <div className="col-3" key={restaurant.restaurant_id}>
                                        <RestaurantCard restaurantName={restaurant.store_name} restaurantLocation={restaurant.store_location} restaurantDescription={restaurant.description} restaurantImg={restaurant.restaurant_img} restaurantId={restaurant.restaurant_id} pathName="/restaurantDisplayForCustomer" source="customer" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );

    }

}