import React, { Component } from "react";
import { uploadDishtoS3 } from "../../services/UserService";
import { withApollo } from 'react-apollo';
import { CREATE_DISH_QUERY } from '../../mutations/mutations';
import { GET_RESTAURANT_DISHES } from '../../queries/queries';

class RestaurantMenuAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishName: '',
            dishDescription: '',
            dishPrice: '',
            dishIngredients: '',
            dishCategory: '',
            dishMessege: '',
            dishImg: '',
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

        this.props.client.mutate({
            mutation: CREATE_DISH_QUERY,
            variables: {
                owner_email: localStorage.getItem('emailId'),
                dish_name: this.state.dishName,
                dish_description: this.state.dishDescription,
                dish_price: this.state.dishPrice,
                dish_ingredients: this.state.dishIngredients,
                dish_category: this.state.dishCategory,
                dish_img: dishImgUrl
            }
        })
            .then(response => {
                console.log("inside success")
                console.log("response in create dish ", response);
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
            })

        this.props.client.query({
            query: GET_RESTAURANT_DISHES,
            variables: {
                owner_email: localStorage.getItem('emailId')
            }
        })
            .then(response => {
                console.log("inside success")
                console.log("response in all items ", response.data);
                if (response.data.getRestaurantDishes.length > 0) {
                    console.log("response", response.data)
                    this.setState({
                        dishes: response.data.getRestaurantDishes
                    });
                    console.log("Dishes", this.state.getRestaurantDishes)
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
            })
    }

    onDishImageChange = (event) => {
        const file = event.target.files[0];
        this.setState({
            dishImg: file
        })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.addDish} style={{ marginLeft: '3%' }}>
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

export default withApollo(RestaurantMenuAdd);