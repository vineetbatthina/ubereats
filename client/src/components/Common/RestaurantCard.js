import React, { Component } from 'react';
import res_img_0 from '../../images/restaurant_default.jpg';
import res_img_1 from '../../images/restaurant_1.jpg';
import res_img_2 from '../../images/restaurant_2.jpg';
import res_img_3 from '../../images/restaurant_3.jpg';
import { Link } from "react-router-dom";

export default class RestaurantCard extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const res_img_array = [res_img_0,res_img_1,res_img_2,res_img_3];
        const res_img = res_img_array[Math.floor(Math.random() * res_img_array.length)];
        return (
            <div className="card margin_bottom" style={{ width: '20rem' }} >
                <Link
                    to={{
                        pathname: this.props.pathName,
                        state: {
                            restaurantId: this.props.restaurantId,
                            restaurantName: this.props.restaurantName,
                            restaurantDescription: this.props.restaurantDescription,
                            restaurantLocation : this.props.restaurantLocation,
                            source : this.props.source
                        }
                    }}>
                    <img src={res_img} className="img-thumbnail" onError={(e) => { e.target.onerror = null; e.target.src = "../../images/default_dish.jpg" }} />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{this.props.restaurantName}</h5>
                    <p className="card-text">{this.props.restaurantDescription}</p>
                </div>
            </div>
        );
    }
}