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

        let locationRestaurants=[];
        let searchedRestaurants=[];
        let restaurants=[];

        if( this.props.currFilters.isVegChecked || this.props.currFilters.isNonVegChecked || this.props.currFilters.isDeliveryChecked || this.props.currFilters.isPickupChecked){
            if(this.props.currFilters.isVegChecked){
                if(this.state.locationRestaurants.length>0){
                    this.state.locationRestaurants.map((restaurant) => {
                        if(restaurant.dishes_type.includes("VEGAN")){
                            locationRestaurants.push(restaurant);
                        }
                    })
                }
                if(this.state.searchedRestaurants.length>0){
                    this.state.searchedRestaurants.map((restaurant) => {
                        if(restaurant.dishes_type.includes("VEGAN")){
                            searchedRestaurants.push(restaurant);
                        }
                    })
                }
                if(this.state.restaurants.length>0){
                    this.state.restaurants.map((restaurant) => {
                        if(restaurant.dishes_type.includes("VEGAN")){
                            restaurants.push(restaurant);
                        }
                    })
                }
            }
            if(this.props.currFilters.isNonVegChecked){
                if(this.state.locationRestaurants.length>0){
                    if(locationRestaurants.length===0){
                        this.state.locationRestaurants.map((restaurant) => {
                            if(restaurant.dishes_type.includes("NONVEG")){
                                locationRestaurants.push(restaurant);
                            }
                        })
                    }
                    else{
                        locationRestaurants = locationRestaurants.filter((restaurant) => restaurant.delivery_type.includes("NONVEG") )
                    }
                }
                if(this.state.searchedRestaurants.length>0){
                    if(searchedRestaurants.length===0){
                        this.state.searchedRestaurants.map((restaurant) => {
                            if(restaurant.dishes_type.includes("NONVEG")){
                                searchedRestaurants.push(restaurant);
                            }
                        })
                    }
                    else{
                        searchedRestaurants = searchedRestaurants.filter((restaurant) => restaurant.delivery_type.includes("NONVEG") )
                    }
                }
                if(this.state.restaurants.length>0){
                    if(restaurants.length===0){
                        this.state.restaurants.map((restaurant) => {
                            if(restaurant.dishes_type.includes("NONVEG")){
                                restaurants.push(restaurant);
                            }
                        })
                    }
                    else{
                        restaurants = restaurants.filter((restaurant) => restaurant.delivery_type.includes("NONVEG") )
                    }
                }
            }
            if(this.props.currFilters.isDeliveryChecked){
                if(this.state.locationRestaurants.length>0){
                    if(locationRestaurants.length===0){
                        this.state.locationRestaurants.map((restaurant) => {
                            if(restaurant.delivery_type.includes("DELIVERY")){
                                locationRestaurants.push(restaurant);
                            }
                        })
                    }
                    else{
                        locationRestaurants = locationRestaurants.filter((restaurant) => restaurant.delivery_type.includes("DELIVERY") )
                    }
                }
                if(this.state.searchedRestaurants.length>0){
                    if(searchedRestaurants.length===0){
                        this.state.searchedRestaurants.map((restaurant) => {
                            if(restaurant.delivery_type.includes("DELIVERY")){
                                searchedRestaurants.push(restaurant);
                            }
                        })
                    }
                    else{
                        searchedRestaurants = searchedRestaurants.filter((restaurant) => restaurant.delivery_type.includes("DELIVERY"))
                    }
                }
                if(this.state.restaurants.length>0){
                    if(restaurants.length===0){
                        this.state.restaurants.map((restaurant) => {
                            if(restaurant.delivery_type.includes("DELIVERY")){
                                restaurants.push(restaurant);
                            }
                        })
                    }
                    else{
                        restaurants = restaurants.filter((restaurant) => restaurant.delivery_type.includes("DELIVERY"));
                    }
                }
            }
            if(this.props.currFilters.isPickupChecked){
                if(this.state.locationRestaurants.length>0){
                    if(locationRestaurants.length===0){
                        this.state.locationRestaurants.map((restaurant) => {
                            if(restaurant.delivery_type.includes("PICKUP")){
                                locationRestaurants.push(restaurant);
                            }
                        })
                    }
                    else{
                        locationRestaurants = locationRestaurants.filter((restaurant) => restaurant.delivery_type.includes("PICKUP") )

                    }
                }
                if(this.state.searchedRestaurants.length>0){
                    if(searchedRestaurants.length===0){
                        this.state.searchedRestaurants.map((restaurant) => {
                            if(restaurant.delivery_type.includes("PICKUP")){
                                searchedRestaurants.push(restaurant);
                            }
                        })
                    }
                    else{
                        searchedRestaurants = searchedRestaurants.filter((restaurant) => restaurant.delivery_type.includes("PICKUP") )
                    }
                }
                if(this.state.restaurants.length>0){
                    if(restaurants.length===0){
                        this.state.restaurants.map((restaurant) => {
                            if(restaurant.delivery_type.includes("PICKUP")){
                                restaurants.push(restaurant);
                            }
                        })
                    }
                    else{
                        restaurants = restaurants.filter((restaurant) => restaurant.delivery_type.includes("PICKUP") )
                    }
                }
            }
        }
        else{
            locationRestaurants= this.state.locationRestaurants;
            searchedRestaurants= this.state.searchedRestaurants;
            restaurants= this.state.restaurants;
        }
        console.log("Location Restaurants are: " + locationRestaurants);
        console.log("Searched Restaurants are: " + searchedRestaurants);
        console.log("All Restaurants are: " + restaurants);

        return (
            <div id="customer_restaurants" style={{marginLeft:'1%'}}>
                <div className="row">
                    <div className="col">
                        <div className="input-group rounded" style={{ width: '50%' }}>
                            <input type="search" className="form-control" placeholder=" Search for Restaurants, Dishes, Cuisines and Location ! " aria-label="Search"
                                aria-describedby="search-addon" value={this.state.searchString} onChange={(event) => { this.setState({ searchString: event.target.value }) }} onKeyDown={this.searchByString} />
                            <span className="input-group-text border-0" id="search-addon">
                                <BsSearch />
                            </span>
                        </div>
                    </div>
                </div>
                <br/>
                <div hidden={(searchedRestaurants.length !== 0) || (locationRestaurants.length === 0)}>
                    <div className="row">
                        <h2>Based on Your Location</h2>
                    </div>
                    <div className="row">
                        {
                            locationRestaurants.map((restaurant) => {
                                return (
                                    <div className="col-4" key={restaurant.restaurant_id}>
                                        <RestaurantCard restaurantName={restaurant.store_name} restaurantLocation={restaurant.store_location} restaurantDescription={restaurant.description} restaurantImg={restaurant.restaurant_img} restaurantId={restaurant.restaurant_id} dishType ={ this.props.currFilters } pathName="/restaurantDisplayForCustomer" source="customer" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div hidden={searchedRestaurants.length === 0}>
                    <div className="row">
                        <h2>Search Results</h2>
                    </div>
                    <div className="row">
                        {
                            searchedRestaurants.map((restaurant) => {
                                return (
                                    <div className="col-4" key={restaurant.restaurant_id}>
                                        <RestaurantCard restaurantName={restaurant.store_name} restaurantLocation={restaurant.store_location} restaurantDescription={restaurant.description} restaurantImg={restaurant.restaurant_img} restaurantId={restaurant.restaurant_id} dishType ={ this.props.currFilters } pathName="/restaurantDisplayForCustomer" source="customer" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div hidden={(searchedRestaurants.length !== 0) || (locationRestaurants.length !== 0)}>
                    <div className="row">
                        <h2>Our Restaurant Partners</h2>
                    </div>
                    <div className="row">
                        {
                            restaurants.map((restaurant) => {
                                return (
                                    <div className="col-4" key={restaurant.restaurant_id}>
                                        <RestaurantCard restaurantName={restaurant.store_name} restaurantLocation={restaurant.store_location} restaurantDescription={restaurant.description} restaurantImg={restaurant.restaurant_img} restaurantId={restaurant.restaurant_id} dishType ={ this.props.currFilters } pathName="/restaurantDisplayForCustomer" source="customer" />
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