import React, { Component } from 'react';
import Dish from '../Common/Dish';
import '../../css/Restaurant.css';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { getDishes } from '../../services/RestaurantService';
import RestaurantNavBar from './RestaurantNavBar';
import RestaurantMenuAdd from './RestaurantMenuAdd';
import { Modal } from 'react-bootstrap';
import { updateDish } from '../../services/RestaurantService';
import { uploadDishtoS3 } from '../../services/UserService';

export default class RestaurantMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: [],
            hideAddItem: true,
            currDishId: 0,
            currDishImg: null,
            currDishName: '',
            currDishDescription: '',
            currDishPrice: '',
            currDishIngredients: '',
            currDishCategory: '',
            dishModalVisible: false,
            dishImg : '',
            dishImgUrl:''
        }

        this.fetchDishes = this.fetchDishes.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    async fetchDishes() {
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
        if (dishesFromBackend) {
            this.setState({
                dishes: dishesFromBackend,
                hideAddItem: true
            });
        }
        console.log(this.state.dishes);
    }

    async updateItem(event) {
        event.preventDefault();

        let dishImgUrl = '';

        if (this.state.dishImg) {
            const imageData = new FormData();
            imageData.append('image', this.state.dishImg);
            const response = await uploadDishtoS3(imageData);
            dishImgUrl = response.data.imageUrl;
            console.log(dishImgUrl);
        }
        else {
            dishImgUrl = this.state.dishImgUrl;
        }

        const dish = {
            dishId: this.state.currDishId,
            newDishImage: (this.state.currDishImg) ? this.state.currDishImg : '',
            dishName: this.state.currDishName,
            dishDescription: this.state.currDishDescription,
            dishPrice: this.state.currDishPrice,
            dishIngredients: this.state.currDishIngredients,
            dishCategory: this.state.currDishCategory,
            dishImgUrl : dishImgUrl
        }

        const response = await updateDish(dish);
        if (response === true) {
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
            if (dishesFromBackend) {
                this.setState({
                    dishes: dishesFromBackend,
                    dishModalVisible: false
                });
            }
        }
        else {
            console.log("Error Updating the Dish Data");
        }
    }

    async componentDidMount() {
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
        if (dishesFromBackend) {
            this.setState({
                dishes: dishesFromBackend
            });
        }
    }

    onDishImageChange = (event) => {
        const file = event.target.files[0];
        this.setState({
            dishImg : file
        })
      };

    render() {
        let buttonText = "Add Item";

        if (this.state) {
            buttonText = this.state.hideAddItem === true ? "Add Item" : "Close"
        }

        return (
            <div >
                <RestaurantNavBar />
                <div style={{ marginLeft: '3%' }}>
                    <div className="row">
                        <div className="col-10">
                        </div>
                        <div className="col-2" >
                            <button onClick={() => { this.setState({ hideAddItem: !this.state.hideAddItem }) }}><AiOutlineAppstoreAdd /> {buttonText}</button>
                        </div>
                    </div>
                    <div className="row" hidden={this.state.hideAddItem}>
                        <RestaurantMenuAdd fetchDishes={this.fetchDishes} />
                    </div>
                    <div className="col" >
                        <h2>Menu</h2>
                    </div>
                    <div className="row">
                        {
                            this.state.dishes.map((dish) => {
                                return (
                                    <div className="col-3" key={dish.dish_id} onClick={() => {
                                        this.setState({
                                            currDishId: dish.dish_id,
                                            currDishName: dish.dish_name,
                                            currDishDescription: dish.dish_description,
                                            currDishPrice: dish.dish_price,
                                            currDishIngredients: dish.dish_ingredients,
                                            currDishCategory: dish.dish_category,
                                            dishModalVisible: true,
                                            dishImgUrl : (dish.dish_img) ? dish.dish_img : ''
                                        })
                                    }}>
                                        <Dish dishName={dish.dish_name} dishDescription={dish.dish_description} dishPrice={dish.dish_price} dishIngredients={dish.dish_ingredients} dishCategory={dish.dish_category} dishImg={dish.dish_img}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Modal show={this.state.dishModalVisible} onHide={() => { this.setState({ dishModalVisible: false }) }} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.currDishName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <center>
                            <form onSubmit={this.updateItem} style={{ marginLeft: '3%' }}>
                                <div className="row">
                                    <div className="col-3">
                                        Dish Image<input accept="image/*" type="file" className="form-control-file" placeholder="Dish Image Upload" onChange={this.onDishImageChange} ></input>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Dish Name" value={this.state.currDishName} onChange={(e) => this.setState({ currDishName: e.target.value })} required></input>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Dish Description" value={this.state.currDishDescription} onChange={(e) => this.setState({ currDishDescription: e.target.value })} required></input>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Dish Price" value={this.state.currDishPrice} onChange={(e) => this.setState({ currDishPrice: e.target.value })} required></input>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Dish Ingredients" value={this.state.currDishIngredients} onChange={(e) => this.setState({ currDishIngredients: e.target.value })} required></input>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Dish Category" value={this.state.currDishCategory} onChange={(e) => this.setState({ currDishCategory: e.target.value })} required></input>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col">
                                        <button type="submit" className="btn btn-dark">Update Item</button>
                                    </div>
                                </div>
                            </form>
                        </center>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}