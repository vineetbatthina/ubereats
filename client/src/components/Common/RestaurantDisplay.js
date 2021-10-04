import React, { Component } from 'react';
import '../../css/Customer.css';
import { getDishesbyResId } from '../../services/CustomerService';
import DishCustomer from '../Customer/DishCustomer';
import CustomerNavBar from '../Customer/CustomerNavBar';
import 'reactjs-popup/dist/index.css';

export default class RestaurantDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: [],
            error_pop: false
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

        if (!this.props.location.state) {
            window.location.href = "/custdashboard";
        }

        return (
            <div style={{marginLeft:'2%'}}>
                < CustomerNavBar searchByLocation={this.searchByLocation} />
                <div className="row">
                    <div className="col-5">

                    </div>
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
                <div className="row" >
                    {
                        this.state.dishes.map((dish) => {
                            return (
                                <div className="col-3" key={dish.dish_id} style={{ marginBottom: '1%' }}>
                                    <div className="row">
                                        <DishCustomer restaurantId={this.props.location.state.restaurantId} dishId={dish.dish_id} dishName={dish.dish_name} dishDescription={dish.dish_description} dishPrice={dish.dish_price} dishIngredients={dish.dish_ingredients} dishCategory={dish.dish_category} />
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