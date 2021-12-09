import React, { Component } from 'react';
import RestaurantNavBar from './RestaurantNavBar';
import '../../css/Restaurant.css';
import defaultRestaurant from '../../images/restaurant_1.jpg';
import { GET_PROFILE_QUERY } from '../../queries/queries';

import { withApollo } from 'react-apollo';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantName: '',
            location: '',
            description: '',
            restaurantImgUrl: '',
            timings: '',
            emailId: '',
            phone: '',
            street : '',
            state : '',
            country : '',
            pincode : '',
            saveMessege: true
        }
    }

    async componentDidMount(){
        let emailId = 'default@default.com';
        try {
            emailId = localStorage.getItem('emailId');
        }
        catch (error) {
            console.log(error);
        }

        this.props.client.query({
            query: GET_PROFILE_QUERY,
            variables: {
                owner_email: emailId
            }
        }).then(response => {
            console.log("Response: ", response);

            const restaurantProfile = response.data.restaurantProfile;

            let isDeliveryChecked = false;
            let isPickupChecked = false;
            let isVegChecked = false;
            let isNonVegChecked = false;
            if (restaurantProfile.delivery_type) {
                let delivery_types = restaurantProfile.delivery_type.split(",");

                delivery_types.map((type) => {
                    if (type === "DELIVERY") {
                        isDeliveryChecked = true;
                    }
                    else {
                        isPickupChecked = true;
                    }
                })

            }

            if (restaurantProfile.dishes_type) {

                let dishTypes = restaurantProfile.dishes_type.split(",");

                dishTypes.map((type) => {
                    if (type === "VEGAN") {
                        isVegChecked = true;
                    }
                    else if (type === "NONVEG") {
                        isNonVegChecked = true;
                    }
                })
            }

            this.setState({
                restaurantName: restaurantProfile.store_name,
                location: restaurantProfile.store_location,
                description: (restaurantProfile.description) ? restaurantProfile.description : '',
                restaurantImgUrl: restaurantProfile.restaurant_img,
                timings: (restaurantProfile.timings) ? restaurantProfile.timings : '',
                emailId: localStorage.getItem('emailId'),
                phone: (restaurantProfile.phone) ? restaurantProfile.phone : '',
                street: (restaurantProfile.street) ? restaurantProfile.street : '',
                state: (restaurantProfile.state) ? restaurantProfile.state : '',
                country: (restaurantProfile.country) ? restaurantProfile.country : '',
                pincode: (restaurantProfile.pincode) ? restaurantProfile.pincode : ''
            })
        }).catch(error => {
            console.log("In error");
        })
    }

    render() {

        return (
            <div>
                <RestaurantNavBar />
                <div>
                    <div className="text-center">
                        <img src={this.state.restaurantImgUrl} className="img-fluid" onError={(e) => { console.log("Image error");e.target.onerror = null; e.target.src = defaultRestaurant }} />
                        <div className="caption">
                            <h1>{this.state.restaurantName}</h1>
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withApollo(Dashboard);