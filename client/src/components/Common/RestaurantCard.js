import React, { Component } from 'react';
import restaurantImage from '../../images/restaurant_default.jpg';
import { Link } from "react-router-dom";

export default class RestaurantCard extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="card margin_bottom" style={{ width: '10rem' }} >
                <Link
                    to={{
                        pathname: this.props.pathName,
                        state: {
                            restaurantId: this.props.restaurantId,
                            restaurantName: this.props.restaurantName,
                            restaurantDescription: this.props.restaurantDescription,
                            source : this.props.source
                        }
                    }}>
                    <img src={restaurantImage} className="img-thumbnail" onError={(e) => { e.target.onerror = null; e.target.src = "../../images/default_dish.jpg" }} />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{this.props.restaurantName}</h5>
                    <p className="card-text">{this.props.restaurantDescription}</p>
                </div>
            </div>
        );
    }
}