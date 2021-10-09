import React, { Component } from 'react';
import dish_0 from '../../images/default_dish.jpg';
import dish_1 from '../../images/default_dish_1.jpg';
import dish_2 from '../../images/default_dish_2.jpg';
import dish_3 from '../../images/default_dish_3.jpg';

export default class Dish extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const dish_img_array = [dish_0,dish_1,dish_2,dish_3];
        const dish_img = dish_img_array[Math.floor(Math.random() * dish_img_array.length)];
        return (
            <div className="card" style={{ width: '18rem' }}>
                <img src={dish_img} className="img-thumbnail" onError={(e)=>{e.target.onerror = null; e.target.src="../../images/default_dish.jpg"}}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.dishName}</h5>
                    <p className="card-text">{this.props.dishDescription}</p>
                    <p className="card-text">Contains: {this.props.dishIngredients}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Category : {this.props.dishCategory}</li>
                    <li className="list-group-item">Dish Price : ${this.props.dishPrice}</li>
                </ul>
            </div>
        );
    }
}