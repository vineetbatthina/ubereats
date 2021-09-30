import React, { Component } from 'react';
import Dish from '../Common/Dish';
import '../../css/Restaurant.css';
import { AiFillEdit } from "react-icons/ai";
import { getDishes } from '../../services/RestaurantService';

export default class RestaurantMenu extends Component {

    constructor(props){
        super(props);

        this.state = {
            dishes : []
        }

        this.displayEditMenu = this.displayEditMenu.bind(this);
    }

    displayEditMenu(){
        this.props.renderEditMenu();
    }

    async componentDidMount(){
        let emailId = 'default@default.com';
        try {
            emailId = localStorage.getItem('emailId');
        }
        catch (error) {
            console.log(error);
        }
        const request = {
            emailId: emailId
        }
        const dishesFromBackend = await getDishes(request);
        if(dishesFromBackend){
            this.setState({
                dishes : dishesFromBackend
            });
        }
        console.log(this.state.dishes);
    }

    render() {
        return(
            <div className="container" >
                <div className = "row" >
                    <div className ="col-10">
                    </div>
                    <div className ="col-2" >
                        <button onClick={this.displayEditMenu}><AiFillEdit /> Edit Menu</button>
                    </div>
                </div>
                <br/>
                <div className ="col" >
                        <h2>Menu</h2>
                </div>
                <div className="row">
                    {
                        this.state.dishes.map((dish) => {
                           return (
                               <div className="col-3">
                                   <Dish dishName={dish.dish_name} dishDescription={dish.dish_description} dishPrice={dish.dish_price} dishIngredients={dish.dish_ingredients} dishCategory={dish.dish_category}/>
                                </div>
                           )
                        })
                    }
                </div>
            </div>
        );
    }
}