import React, { Component } from 'react';
import '../../css/Customer.css';
import { getDishesbyResId } from '../../services/CustomerService';
import Dish from './Dish';
import CustomerNavBar from '../Customer/CustomerNavBar';

export default class RestaurantDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: []
        };
    }

    async componentDidMount() {
        const request = {
            restaurantId: ''
        }
        if (this.props.location.state.restaurantId) {
            request.restaurantId = this.props.location.state.restaurantId;
        }
        const dishesFromBackend = await getDishesbyResId(request);
        if (dishesFromBackend) {
            this.setState({
                dishes: dishesFromBackend
            });
        }
        console.log(this.state.dishes);
    }

    render() {
        return (
            <div>
                < CustomerNavBar searchByLocation={this.searchByLocation} />
                <div className="row">
                    <div className="col">
                        <h2>{this.props.location.state.restaurantName} </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.props.location.state.restaurantDescription}
                    </div>
                </div>
                <br />
                <div className="row">
                    {
                        this.state.dishes.map((dish) => {
                            return (
                                <div className="col-3" key={dish.dish_id} style={{ marginBottom: '1%' }}>
                                    <div className="row" style={{ marginBottom: '1.5%' }}>
                                        <div className="col-3">
                                        </div>
                                        <div className="col-6">
                                            <button>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <Dish dishName={dish.dish_name} dishDescription={dish.dish_description} dishPrice={dish.dish_price} dishIngredients={dish.dish_ingredients} dishCategory={dish.dish_category} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}