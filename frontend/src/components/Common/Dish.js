import React, { Component } from 'react';

export default class Dish extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="card" style={{ width: '18rem' }}>
                <img src={this.props.dishImg} className="img-thumbnail" onError={(e)=>{e.target.onerror = null; e.target.src="../../images/default_dish.jpg"}}/>
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