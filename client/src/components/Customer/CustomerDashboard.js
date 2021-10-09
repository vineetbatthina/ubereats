import React, { Component } from 'react';
import CustomerNavBar from './CustomerNavBar';
import CustomerRestaurantsDisplay from './CustomerRestaurantsDisplay';
import {getCustomerProfileByEmailId} from '../../services/CustomerService';

export default class CustomerDashboard extends Component {

    constructor(props) {
        super(props);
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
                    city:'',
                    state: '',
                    country : '',
                    pincode: '',
                    profileImg: '',
                    noProfileData: true
                })
            }
            else {
                if(JSON.parse(customerProfile.address).city){
                    localStorage.setItem('cust_location',JSON.parse(customerProfile.address).city);
                }
                this.setState({
                    emailId: localStorage.getItem('emailId'),
                    phone: customerProfile.phone,
                    name: customerProfile.name,
                    nickName: customerProfile.nick_name,
                    dob: customerProfile.DOB,
                    street: JSON.parse(customerProfile.address).street,
                    city :  JSON.parse(customerProfile.address).city,
                    state: JSON.parse(customerProfile.address).state,
                    country : JSON.parse(customerProfile.address).country,
                    pincode: JSON.parse(customerProfile.address).pincode,
                    profileImg: customerProfile.profile_img,
                    noProfileData: false
                })
            }
        }
    }

    render() {
        return (
            <div>
                < CustomerNavBar />

                <div className="row">
                    <div className="col" style={{marginLeft:'2%'}}>
                        <CustomerRestaurantsDisplay />
                    </div>
                </div>
            </div>
        );
    }
}