import React, { Component } from "react";
import { saveDish } from "../../services/RestaurantService";

export default class RestaurantMenuAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newDishImage: null,
            dishName : '',
            dishDescription: '',
            dishPrice: '',
            dishIngredients: '',
            dishCategory: '',
            dishMessege: ''
        }

        this.saveItem = this.saveItem.bind(this);
    }

    async saveItem(event) {
        event.preventDefault();
        const dish = {
            newDishImage: (this.state.newDishImage) ? this.state.newDishImage : '',
            dishName : this.state.dishName,
            dishDescription: this.state.dishDescription,
            dishPrice: this.state.dishPrice,
            dishIngredients: this.state.dishIngredients,
            dishCategory: this.state.dishCategory,
            emailId: localStorage.getItem('emailId')
        }

        const response = await saveDish(dish);
        if (response === 200) {
            this.setState({
                newDishImage: null,
                dishName : '',
                dishDescription: '',
                dishPrice: '',
                dishIngredients: '',
                dishCategory: '',
                dishMessege: "Dish Successfully saved"
            })
        }
        else {
            this.setState({
                newDishImage: null,
                dishName : '',
                dishDescription: '',
                dishPrice: '',
                dishIngredients: '',
                dishCategory: '',
                dishMessege: "Dish couldn't be saved contact administrator"
            })
        }

        this.props.fetchDishes();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.saveItem} style={{marginLeft:'3%'}}>
                    <div className="row">
                        <div className="col-3">
                            Dish Images<input type="file" className="form-control-file" placeholder="Dish Image Upload"></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Dish Name" value={this.state.dishName} onChange={(e) => this.setState({ dishName: e.target.value })} required></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Dish Description" value={this.state.dishDescription} onChange={(e) => this.setState({ dishDescription: e.target.value })} required></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Dish Price" value={this.state.dishPrice} onChange={(e) => this.setState({ dishPrice: e.target.value })} required></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Dish Ingredients" value={this.state.dishIngredients} onChange={(e) => this.setState({ dishIngredients: e.target.value })} required></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Dish Category" value={this.state.dishCategory} onChange={(e) => this.setState({ dishCategory: e.target.value })} required></input>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-dark">Add Item</button>
                        </div>
                    </div>
                </form>
                <br />
                <div className="" id="save_items_msg"> {this.state.dishMessege} </div>
            </div>
        )
    }
}