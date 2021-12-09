import React, { Component } from 'react';
import { Link } from "react-router-dom";
import defaultRestaurant from '../../images/restaurant_2.jpg';

export default class RestaurantCard extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="card margin_bottom" style={{ width: '20rem' }} >
                <Link
                    to={{
                        pathname: this.props.pathName,
                        state: {
                            restaurantId: this.props.restaurantId,
                            restaurantEmailId: this.props.restaurantEmailId,
                            restaurantName: this.props.restaurantName,
                            restaurantDescription: this.props.restaurantDescription,
                            restaurantLocation : this.props.restaurantLocation,
                            source : this.props.source,
                            dishType : this.props.dishType
                        }
                    }}>
                    <img src={this.props.restaurantImg} className="img-thumbnail" onError={(e) => { console.log("Image error");e.target.onerror = null; e.target.src = defaultRestaurant }} />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{this.props.restaurantName}</h5>
                    <p className="card-text">{this.props.restaurantDescription}</p>
                </div>
            </div>
        );
    }
}