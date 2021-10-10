import React, { Component } from 'react';
import CustomerNavBar from './CustomerNavBar';
import { getFavourites, getRestaurantProfileByID } from '../../services/CustomerService';
import RestaurantCard from '../Common/RestaurantCard';

export default class CustomerFavourites extends Component {

    constructor(props) {
        super(props);

        this.state = {
            favRestaurants: []
        }
    }

    async componentDidMount() {
        let currFavourites = [];
        let favRestaurants = [];
        const requestFavourites = {
            emailId: localStorage.getItem('emailId')
        }
        const result = await getFavourites(requestFavourites);
        if (result) {
            currFavourites.push(...(JSON.parse(result)))
        }
        currFavourites.forEach(async (fav) => {
            let currRestaurant = {
                resId: parseInt(fav)
            };
            const resultRestaurant = await getRestaurantProfileByID(currRestaurant);
            if (resultRestaurant) {
                favRestaurants.push(resultRestaurant);
            }
            this.setState({
                favRestaurants: favRestaurants
            });
        });
        
    }

    render() {
        return (
            <div>
                < CustomerNavBar />

                <div style={{ marginLeft: '3%' }} hidden={this.state.favRestaurants.length === 0}>
                    <center>
                        <h3>Your Favourite Restaurants</h3>
                    </center>

                    <div className="row">
                        {
                            this.state.favRestaurants.map((restaurant) => {
                                return (
                                    <div className="col-3" key={restaurant.restaurant_id}>
                                        <RestaurantCard restaurantName={restaurant.store_name} restaurantLocation={restaurant.store_location} restaurantDescription={restaurant.description} restaurantImg={restaurant.restaurant_img} restaurantId={restaurant.restaurant_id} pathName="/restaurantDisplayForCustomer" source="customer" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{ marginLeft: '3%' }} hidden={this.state.favRestaurants.length !== 0}>
                    <center>
                        Visit Dashboard to search for restaurants and add them to favourites to be appeared here.
                    </center>
                </div>
            </div>
        );
    }
}