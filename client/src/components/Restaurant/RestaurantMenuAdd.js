import React, { Component } from "react";
import { saveDish } from "../../services/RestaurantService";
import {uploadDishtoS3} from "../../services/UserService";

export default class RestaurantMenuAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishName : '',
            dishDescription: '',
            dishPrice: '',
            dishIngredients: '',
            dishCategory: '',
            dishMessege: '',
            dishImg : '',
        }

        this.addDish = this.addDish.bind(this);
    }

    async addDish(event) {
        event.preventDefault();

        let dishImgUrl = '';

        if (this.state.dishImg) {
            const imageData = new FormData();
            imageData.append('image', this.state.dishImg);
            const response = await uploadDishtoS3(imageData);
            dishImgUrl = response.data.imageUrl;
            console.log(dishImgUrl);
        }

        const dish = {
            dishName : this.state.dishName,
            dishDescription: this.state.dishDescription,
            dishPrice: this.state.dishPrice,
            dishIngredients: this.state.dishIngredients,
            dishCategory: this.state.dishCategory,
            dishImgUrl: dishImgUrl,
            emailId: localStorage.getItem('emailId')
        }

        const response = await saveDish(dish);
        if (response === 200) {
            this.setState({
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

    onDishImageChange = (event) => {
        const file = event.target.files[0];
        this.setState({
            dishImg : file
        })
      };

    render() {
        return (
            <div>
                <form onSubmit={this.addDish} style={{marginLeft:'3%'}}>
                    <div className="row">
                        <div className="col-3">
                            Dish Image<input accept="image/*" type="file" className="form-control-file" placeholder="Dish Image Upload" onChange={this.onDishImageChange} required></input>
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