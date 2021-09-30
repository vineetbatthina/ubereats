import React, { Component } from 'react';
import restaurantImage from '../../images/restaurant_default.jpg';

export default class RestaurantCard extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="card margin_bottom" style={{ width: '10rem' }} id={this.props.restaurantId}>
                <img src={restaurantImage} className="img-thumbnail" onError={(e)=>{e.target.onerror = null; e.target.src="../../images/default_dish.jpg"}}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.restaurantName}</h5>
                    <p className="card-text">{this.props.restuarantDescription}</p>
                </div>
            </div>
        );
    }
}