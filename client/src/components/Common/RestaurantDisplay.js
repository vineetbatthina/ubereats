import React, { Component } from 'react';
import '../../css/Customer.css';
import { getDishesbyResId, getFavourites, updateFavourites } from '../../services/CustomerService';
import DishCustomer from '../Customer/DishCustomer';
import Dish from './Dish';
import CustomerNavBar from '../Customer/CustomerNavBar';
import 'reactjs-popup/dist/index.css';
import LandingNavBar from '../LandingNavBar';

export default class RestaurantDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: [],
            error_pop: false,
            currFavourites: [],
            isFavourite: false
        };

        this.addFavourite = this.addFavourite.bind(this);
        this.removeFavourite = this.removeFavourite.bind(this);
    }

    showDishComponent(dish) {
        let renderedDishCard = null
        if (this.props.location.state.source === "customer") {
            renderedDishCard = <DishCustomer restaurantId={this.props.location.state.restaurantId} dishId={dish.dish_id} dishName={dish.dish_name} dishDescription={dish.dish_description} dishPrice={dish.dish_price} dishIngredients={dish.dish_ingredients} dishCategory={dish.dish_category} dishImg={dish.dish_img} />
        }
        else {
            renderedDishCard = <Dish restaurantId={this.props.location.state.restaurantId} dishId={dish.dish_id} dishName={dish.dish_name} dishDescription={dish.dish_description} dishPrice={dish.dish_price} dishIngredients={dish.dish_ingredients} dishCategory={dish.dish_category} dishImg={dish.dish_img} />
        }
        return renderedDishCard;
    }

    async componentDidMount() {
        let currFavourites = [];
        let dishesFromBackend = [];
        let filters = [];
        const requestFavourites = {
            emailId: localStorage.getItem('emailId')
        }
        const request = {
            restaurantId: ''
        }
        if (this.props.location.state.restaurantId) {
            request.restaurantId = this.props.location.state.restaurantId;
        }

        dishesFromBackend = await getDishesbyResId(request);
        const result = await getFavourites(requestFavourites);
        if (result) {
            currFavourites.push(...(JSON.parse(result)))
        }
        if (dishesFromBackend) {

            if (this.props.location.state.source === "customer") {
                let searchFilters = this.props.location.state.dishType;
                if (searchFilters.isVegChecked || searchFilters.isNonVegChecked) {
                    if (searchFilters.isVegChecked) {
                        filters.push("VEGAN");
                    }
                    if (searchFilters.isNonVegChecked) {
                        filters.push("NONVEG");
                    }
                    dishesFromBackend = dishesFromBackend.filter((dish) => String(filters).includes(dish.dish_category));
                }
            }

            this.setState({
                dishes: dishesFromBackend,
                currFavourites: currFavourites,
                isFavourite: currFavourites.includes(JSON.stringify(this.props.location.state.restaurantId))
            });
        }
    }

    async addFavourite() {
        let updatedFavourites = [];
        if (this.state.currFavourites) {
            updatedFavourites = this.state.currFavourites;
        }
        updatedFavourites.push(JSON.stringify(this.props.location.state.restaurantId));
        const requestAddFavourites = {
            emailId: localStorage.getItem('emailId'),
            updatedFavourites: JSON.stringify(updatedFavourites)
        }
        const successUpdatingFavourites = await updateFavourites(requestAddFavourites);
        if (successUpdatingFavourites) {
            this.setState({
                currFavourites: updatedFavourites,
                isFavourite: true
            })
        }
        else {
            alert("Error updating Favourites, Please contact administrator");
        }
    }

    async removeFavourite() {

        let updatedFavourites = [];
        if (this.state.currFavourites) {
            updatedFavourites = this.state.currFavourites;
        }
        updatedFavourites = updatedFavourites.filter((value) => { return value !== JSON.stringify(this.props.location.state.restaurantId) });
        const requestAddFavourites = {
            emailId: localStorage.getItem('emailId'),
            updatedFavourites: JSON.stringify(updatedFavourites)
        }
        const successUpdatingFavourites = await updateFavourites(requestAddFavourites);
        if (successUpdatingFavourites) {
            this.setState({
                currFavourites: updatedFavourites,
                isFavourite: false
            })
        }
        else {
            alert("Error updating Favourites, Please contact administrator");
        }
    }

    render() {
        if (!this.props.location.state) {
            window.location.href = "/custdashboard";
        }

        let customNavBarVisibility = null;

        if (this.props.location.state.source === "customer") {
            customNavBarVisibility = < CustomerNavBar />;
        }
        else {
            customNavBarVisibility = <LandingNavBar />
        }
        return (
            <div >
                {customNavBarVisibility}
                <div style={{ marginLeft: '2%' }}>
                    <div className="row">
                        <div className="col-5">

                        </div>
                        <div className="col">
                            <h2>{this.props.location.state.restaurantName} </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <i>{this.props.location.state.restaurantDescription}</i>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-10">
                            Located at : <b><i>{this.props.location.state.restaurantLocation}</i></b>
                        </div>
                        <div className="col-2" hidden={this.props.location.state.source !== "customer"}>
                            <div hidden={this.state.isFavourite}>
                                <button onClick={this.addFavourite}>Add to Favourites</button>
                            </div>
                            <div hidden={!this.state.isFavourite}>
                                <button onClick={this.removeFavourite}>Remove from Favourites</button>
                            </div>
                        </div>

                    </div>
                    <br />
                    <div className="row" >
                        {
                            this.state.dishes.map((dish) => {
                                return (
                                    <div className="col-3" key={dish.dish_id} style={{ marginBottom: '1%' }}>
                                        <div className="row">
                                            {this.showDishComponent(dish)}
                                        </div>
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