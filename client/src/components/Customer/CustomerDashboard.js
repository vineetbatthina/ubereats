import React, { Component } from 'react';
import CustomerNavBar from './CustomerNavBar';
import CustomerRestaurantsDisplay from './CustomerRestaurantsDisplay';
import { getCustomerProfileByEmailId } from '../../services/CustomerService';
import CustomerFilters from './CustomerFilters';

export default class CustomerDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currFilters : {}
        }

        this.filtersChanged = this.filtersChanged.bind(this);
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
        const customerProfile = await getCustomerProfileByEmailId(request);
        if (customerProfile) {
            if (customerProfile.length === 0) {
                this.setState({
                    emailId: localStorage.getItem('emailId'),
                    phone: '',
                    name: '',
                    nickName: '',
                    dob: '',
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                    pincode: '',
                    profileImg: '',
                    noProfileData: true
                })
            }
            else {
                if (JSON.parse(customerProfile.address).city) {
                    localStorage.setItem('cust_location', JSON.parse(customerProfile.address).city);
                }
                this.setState({
                    emailId: localStorage.getItem('emailId'),
                    phone: customerProfile.phone,
                    name: customerProfile.name,
                    nickName: customerProfile.nick_name,
                    dob: customerProfile.DOB,
                    street: JSON.parse(customerProfile.address).street,
                    city: JSON.parse(customerProfile.address).city,
                    state: JSON.parse(customerProfile.address).state,
                    country: JSON.parse(customerProfile.address).country,
                    pincode: JSON.parse(customerProfile.address).pincode,
                    profileImg: customerProfile.profile_img,
                    noProfileData: false
                })
            }
        }
    }

    filtersChanged(currFilters){
        this.setState({
            currFilters : currFilters
        })
    }

    render() {
        return (
            <div>
                < CustomerNavBar />
                <div className="row">
                    <div className="col-3">
                        <CustomerFilters filtersChanged = {this.filtersChanged}/>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col" style={{ marginLeft: '2%' }}>
                                <CustomerRestaurantsDisplay currFilters={this.state.currFilters}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}