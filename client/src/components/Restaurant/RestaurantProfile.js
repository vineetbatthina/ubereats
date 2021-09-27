import React, { Component } from 'react';
import '../../css/Generic.css';
import { getRestaurantProfile } from '../../services/RestaurantService';

export default class RestaurantProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurantName: '',
            location: '',
            description: '',
            timings: '',
            emailId: '',
            contactInformation: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault();
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
            console.log(restaurantProfile);
            this.setState({
                restaurantName: restaurantProfile.store_name,
                location: restaurantProfile.store_location,
                description: (restaurantProfile.description) ? restaurantProfile.description : '',
                timings: (restaurantProfile.timings) ? restaurantProfile.descriptitimingson : '',
                emailId: localStorage.getItem('emailId'),
                phone: (restaurantProfile.phone) ? restaurantProfile.phone : ''
            })
        }
    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Restaurant Name</label>
                        <input type="text" className="form-control" value = {this.state.restaurantName} onChange={(e) => this.setState({ restaurantName: e.target.value })}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Location</label>
                        <input type="text" className="form-control" value = {this.state.location} onChange={(e) => this.setState({ location: e.target.value })}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Description</label>
                        <textarea className="form-control" rows="3" value = {this.state.description} onChange={(e) => this.setState({ description: e.target.value })}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Timings</label>
                        <input type="text" className="form-control" value = {this.state.timings} onChange={(e) => this.setState({ timings: e.target.value })}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput2">Contact Information</label>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" value = {this.state.emailId} onChange={(e) => this.setState({ emailId: e.target.value })}/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Phone Number" value = {this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })}/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-1">
                            <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}