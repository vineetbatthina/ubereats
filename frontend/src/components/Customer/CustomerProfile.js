import React, { Component } from 'react';
import '../../css/Generic.css';
import CustomerNavBar from '../Customer/CustomerNavBar';
import { saveCustomerProfile, updateCustomerProfile, uploadProfilePicturetoS3 } from '../../services/CustomerService';

import { withApollo } from 'react-apollo';
import { GET_CUSTOMER_PROFILE } from '../../queries/queries';


class CustomerProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            phone: '',
            name: '',
            nickName: '',
            dob: '',
            address: '',
            state: '',
            street: '',
            city: '',
            country: '',
            pincode: '',
            profileImg: '',
            noProfileData: false,
            profilePicture: '',
            profilePictureUrl: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onProfilePictureChange = this.onProfilePictureChange.bind(this);
    }


    async componentDidMount() {
        let emailId = 'default@default.com';
        try {
            emailId = localStorage.getItem('emailId');
        }
        catch (error) {
            console.log(error);
        }
        this.props.client.query({
            query: GET_CUSTOMER_PROFILE,
            variables: {
                email_id: emailId
            }
        }).then(result => {
            console.log("Result from backend: ", result);
            let customerProfile = result.data.getCustomerProfile;
            if (customerProfile) {

                let profilePictureUrl = '';
                if (JSON.parse(customerProfile.address).city) {
                    localStorage.setItem('cust_location', JSON.parse(customerProfile.address).city);
                }
                else {
                    localStorage.setItem('cust_location', '');
                }
                if (customerProfile.profile_img) {
                    profilePictureUrl = customerProfile.profile_img
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
                    profilePictureUrl: profilePictureUrl,
                    noProfileData: false
                })

            }
            else {
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
        })
            .catch(error => {
                console.log(error);
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
            })
    }

    async handleSubmit(event) {

        event.preventDefault();

        let profilePictureUrl = '';

        if (this.state.profilePicture) {
            const imageData = new FormData();
            imageData.append('image', this.state.profilePicture);
            const response = await uploadProfilePicturetoS3(imageData);
            profilePictureUrl = response.data.imageUrl;
            console.log(profilePictureUrl);
        }

        const address = {
            street: this.state.street,
            state: this.state.state,
            country: this.state.country,
            pincode: this.state.pincode,
            city: this.state.city
        }

        const request = {
            emailId: this.state.emailId,
            phone: this.state.phone,
            name: this.state.name,
            nickName: this.state.nickName,
            dob: this.state.dob,
            address: JSON.stringify(address),
            profilePictureUrl: profilePictureUrl
        }

        if (this.state.noProfileData) {
            try {
                if (address.city) {
                    localStorage.setItem('cust_location', address.city);
                }
                else {
                    localStorage.setItem('cust_location', '');
                }
                const response = await saveCustomerProfile(request);
                if (response) {
                    document.getElementById('save_messege').innerHTML = 'Successfully Saved your Profile';
                }
                else {
                    document.getElementById('save_messege').innerHTML = 'Error Saving Profile. Please try after sometime';
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                if (address.city) {
                    localStorage.setItem('cust_location', address.city);
                }
                else {
                    localStorage.setItem('cust_location', '');
                }
                const response = await updateCustomerProfile(request);
                if (response) {
                    document.getElementById('save_messege').innerHTML = 'Successfully Updated your Profile';
                }
                else {
                    document.getElementById('save_messege').innerHTML = 'Error Saving Profile. Please try after sometime';
                }
            }
            catch (error) {
                console.log(error);
            }
        }


    }

    onProfilePictureChange(event) {
        const file = event.target.files[0];
        this.setState({
            profilePicture: file
        })
    };

    render() {
        return (
            <div>
                {console.log(this.state.name)}
                < CustomerNavBar searchByLocation={this.searchByLocation} />
                <div className="container">
                    <form>
                        <h2>Profile</h2>
                        <img src={this.state.profilePictureUrl} className="img-thumbnail" style={{ width: '10%' }} hidden={this.state.profilePictureUrl === ''}></img>
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label >Nick Name</label>
                            <input type="text" className="form-control" value={this.state.nickName} onChange={(e) => this.setState({ nickName: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label >D.O.B</label>
                            <input type="text" className="form-control" value={this.state.dob} onChange={(e) => this.setState({ dob: e.target.value })} />
                        </div>
                        <br />
                        <div className="form-group">
                            <div className="col-3">
                                Profile Image<input accept="image/*" type="file" className="form-control-file" placeholder="Upload your Profile Picture" onChange={this.onProfilePictureChange}></input>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <h4>Address</h4>
                        <br />
                        <div className="form-group">
                            <label >Street</label>
                            <input type="text" className="form-control" value={this.state.street} onChange={(e) => this.setState({ street: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label >City</label>
                            <input type="text" className="form-control" value={this.state.city} onChange={(e) => this.setState({ city: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label >State</label>
                            <input type="text" className="form-control" value={this.state.state} onChange={(e) => this.setState({ state: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label >Country</label>
                            <input type="text" className="form-control" value={this.state.country} onChange={(e) => this.setState({ country: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <select label="Country">
                                <option>India</option>
                                <option>USA</option>
                                <option>China</option>
                                <option>Mexico</option>
                                <option>Japan</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Pincode</label>
                            <input type="number" className="form-control" value={this.state.pincode} onChange={(e) => this.setState({ pincode: e.target.value })} />
                        </div>
                        <br />
                        <hr />
                        <h4>Contact Information</h4>
                        <br />
                        <div className="form-group">
                            <label >Email Id</label>
                            <input type="text" className="form-control" value={this.state.emailId} readOnly />
                        </div>
                        <div className="form-group">
                            <label >Phone</label>
                            <input type="text" className="form-control" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })} />
                        </div>

                        <br />
                        <div className="row">
                            <div className="col-1">
                                <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Save</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div id="save_messege" hidden={false} style={{ marginTop: '1%' }}></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default withApollo(CustomerProfile);