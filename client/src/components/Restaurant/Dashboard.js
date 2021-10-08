import React, { Component } from 'react';
import RestaurantNavBar from './RestaurantNavBar';
import res_default_image from '../../images/landing_page_background.jpg';
import '../../css/Restaurant.css';
import { getRestaurantProfile } from '../../services/RestaurantService';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantName: '',
            location: '',
            description: '',
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
        const request = {
            emailId: emailId
        }
        const restaurantProfile = await getRestaurantProfile(request);
        if (restaurantProfile) {
            this.setState({
                restaurantName: restaurantProfile.store_name,
                location: restaurantProfile.store_location,
                description: (restaurantProfile.description) ? restaurantProfile.description : '',
                timings: (restaurantProfile.timings) ? restaurantProfile.timings : '',
                emailId: localStorage.getItem('emailId'),
                phone: (restaurantProfile.phone) ? restaurantProfile.phone : '',
                street: (restaurantProfile.street) ? restaurantProfile.street : '',
                state: (restaurantProfile.state) ? restaurantProfile.state : '',
                country: (restaurantProfile.country) ? restaurantProfile.country : '',
                pincode: (restaurantProfile.pincode) ? restaurantProfile.pincode : ''
            })
        }
    }

    render() {
        return (
            <div>
                <RestaurantNavBar />
                <div>
                    <div class="text-center">
                        <img src={res_default_image} className="img-fluid" onError={(e) => { e.target.onerror = null; e.target.src = "../../images/default_dish.jpg" }} />
                        <div class="caption">
                            <h1>{this.state.restaurantName}</h1>
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}