import React, { Component } from 'react';
import '../../css/Generic.css';
import { getRestaurantProfile, saveRestaurantProfile, uploadRestaurantImgtoS3 } from '../../services/RestaurantService';
import RestaurantNavBar from './RestaurantNavBar';

export default class RestaurantProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantName: '',
            location: '',
            description: '',
            cuisine: '',
            timings: '',
            emailId: '',
            phone: '',
            street: '',
            state: '',
            country: '',
            pincode: '',
            isDeliveryChecked: false,
            isPickupChecked: false,
            isVegChecked: false,
            isNonVegChecked: false,
            saveMessege: true,
            restaurantImg: '',
            restaurantImgUrl: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onRestaurantImageChange = this.onRestaurantImageChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        let restaurantImgUrl = '';

        if (this.state.restaurantImg) {
            const imageData = new FormData();
            imageData.append('image', this.state.restaurantImg);
            const response = await uploadRestaurantImgtoS3(imageData);
            restaurantImgUrl = response.data.imageUrl;
            console.log(restaurantImgUrl);
        }
        else{
            restaurantImgUrl = this.state.restaurantImgUrl;
        }

        let deliveryType = [];

        let dishesType = [];

        if (this.state.isDeliveryChecked) {
            deliveryType.push("DELIVERY");
        }
        if (this.state.isPickupChecked) {
            deliveryType.push("PICKUP");
        }
        if(this.state.isVegChecked){
            dishesType.push("VEGAN");
        }
        if(this.state.isNonVegChecked){
            dishesType.push("NONVEG");
        }

        const restaurantProfile = {
            restaurantName: this.state.restaurantName,
            location: this.state.location,
            description: this.state.description,
            cuisine: this.state.cuisine,
            timings: this.state.timings,
            emailId: this.state.emailId,
            phone: this.state.phone,
            deliveryType: String(deliveryType),
            dishesType: String(dishesType),
            street: this.state.street,
            state: this.state.state,
            country: this.state.country,
            restaurantImgUrl : restaurantImgUrl,
            pincode: parseInt(this.state.pincode)
        };
        const response = await saveRestaurantProfile(restaurantProfile);
        if (response === 200) {
            this.setState({
                saveMessege: false
            })
            document.getElementById('save_messege').innerHTML = "Successfully Saved your Profile !!!";
        }
        else {

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
        const restaurantProfile = await getRestaurantProfile(request);
        if (restaurantProfile) {
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
                    else if(type === "NONVEG"){
                        isNonVegChecked = true;
                    }
                })
            }

            this.setState({
                restaurantName: restaurantProfile.store_name,
                location: restaurantProfile.store_location,
                description: (restaurantProfile.description) ? restaurantProfile.description : '',
                cuisine: (restaurantProfile.cuisine) ? restaurantProfile.cuisine : '',
                timings: (restaurantProfile.timings) ? restaurantProfile.timings : '',
                emailId: localStorage.getItem('emailId'),
                isDeliveryChecked: isDeliveryChecked,
                isNonVegChecked: isNonVegChecked,
                isVegChecked: isVegChecked,
                isPickupChecked: isPickupChecked,
                restaurantImgUrl : restaurantProfile.restaurant_img,
                phone: (restaurantProfile.phone) ? restaurantProfile.phone : '',
                street: (restaurantProfile.street) ? restaurantProfile.street : '',
                state: (restaurantProfile.state) ? restaurantProfile.state : '',
                country: (restaurantProfile.country) ? restaurantProfile.country : '',
                pincode: (restaurantProfile.pincode) ? restaurantProfile.pincode : ''
            })
            console.log(this.setState);
        }
    }

    onRestaurantImageChange(event){
        const file = event.target.files[0];
        this.setState({
            restaurantImg : file
        })
      };

    render() {
        return (
            <div>
                <RestaurantNavBar />
                <form style={{ marginLeft: '3%' }}>
                    <div className="form-group center_div">
                        <label htmlFor="formGroupExampleInput">Restaurant Name</label>
                        <input type="text" className="form-control" value={this.state.restaurantName} onChange={(e) => this.setState({ restaurantName: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Location</label>
                        <input type="text" className="form-control" value={this.state.location} onChange={(e) => this.setState({ location: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Description</label>
                        <textarea className="form-control" rows="3" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}></textarea>
                    </div>
                    <div className="form-group">
                        <div className="col-3">
                            Restaurant Image<input accept="image/*" type="file" className="form-control-file" placeholder="Upload your Restaurant Image" onChange={this.onRestaurantImageChange}></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Cuisine</label>
                        <input type="text" className="form-control" value={this.state.cuisine} onChange={(e) => this.setState({ cuisine: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Timings</label>
                        <input type="text" className="form-control" value={this.state.timings} onChange={(e) => this.setState({ timings: e.target.value })} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Type of Delivery</label>
                        <br />
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" value="Delivery" checked={this.state.isDeliveryChecked} onChange={() => { this.setState({ isDeliveryChecked: !this.state.isDeliveryChecked }) }} />
                            <label class="form-check-label" >Delivery</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" value="Pickup" checked={this.state.isPickupChecked} onChange={() => { this.setState({ isPickupChecked: !this.state.isPickupChecked }) }} />
                            <label class="form-check-label" >Pickup</label>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Your Restaurant has dishes of </label>
                        <br />
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" value="Delivery" checked={this.state.isVegChecked} onChange={() => { this.setState({ isVegChecked: !this.state.isVegChecked }) }} />
                            <label class="form-check-label" >Vegan</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" value="Pickup" checked={this.state.isNonVegChecked} onChange={() => { this.setState({ isNonVegChecked: !this.state.isNonVegChecked }) }} />
                            <label class="form-check-label" >Non-Vegan</label>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Address</label>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Street" value={this.state.street} onChange={(e) => this.setState({ street: e.target.value })} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="State" value={this.state.state} onChange={(e) => this.setState({ state: e.target.value })} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Country" value={this.state.country} onChange={(e) => this.setState({ country: e.target.value })} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <input type="number" className="form-control" placeholder="Pincode" value={this.state.pincode} onChange={(e) => this.setState({ pincode: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Contact Information</label>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" value={localStorage.getItem('emailId')} readOnly />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Phone Number" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-1">
                            <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div id="save_messege" hidden={this.state.saveMessege} style={{ marginTop: '1%' }}></div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}