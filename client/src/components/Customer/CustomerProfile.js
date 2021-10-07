import React, { Component } from 'react';
import '../../css/Generic.css';
import CustomerNavBar from '../Customer/CustomerNavBar';
import { getCustomerProfileByEmailId } from '../../services/CustomerService';
import {saveCustomerProfile} from '../../services/CustomerService';
import {updateCustomerProfile} from '../../services/CustomerService';

export default class CustomerProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            phone: '',
            name: '',
            nickName: '',
            dob: '',
            address: '',
            profileImg: '',
            noProfileData: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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
        const restaurantProfile = await getCustomerProfileByEmailId(request);
        if (restaurantProfile) {
            if (restaurantProfile.length === 0) {
                this.setState({
                    emailId: localStorage.getItem('emailId'),
                    phone: '',
                    name: '',
                    nickName: '',
                    dob: '',
                    street: '',
                    state: '',
                    country : '',
                    pincode: '',
                    profileImg: '',
                    noProfileData: true
                })
            }
            else {
                this.setState({
                    emailId: localStorage.getItem('emailId'),
                    phone: restaurantProfile[0].phone,
                    name: restaurantProfile[0].name,
                    nickName: restaurantProfile[0].nick_name,
                    dob: restaurantProfile[0].DOB,
                    street: JSON.parse(restaurantProfile[0].address).street,
                    state: JSON.parse(restaurantProfile[0].address).state,
                    country : JSON.parse(restaurantProfile[0].address).country,
                    pincode: JSON.parse(restaurantProfile[0].address).pincode,
                    profileImg: restaurantProfile[0].profile_img,
                    noProfileData: false
                })
            }
        }
    }

    async handleSubmit(event){

        event.preventDefault();

        const address = {
            street : this.state.street,
            state: this.state.state,
            country : this.state.country,
            pincode : this.state.pincode
        }

        const request = {
            emailId : this.state.emailId,
            phone : this.state.phone,
            name : this.state.name,
            nickName :  this.state.nickName,
            dob: this.state.dob,
            address : JSON.stringify(address),
            profileImg : this.state.profile_img
        }

        if(this.state.noProfileData){
            try{
                const response = await saveCustomerProfile(request);
                if(response){
                    document.getElementById('save_messege').innerHTML = 'Successfully Saved your Profile';
                }
                else{
                    document.getElementById('save_messege').innerHTML = 'Error Saving Profile. Please try after sometime';
                }
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            try{
                const response = await updateCustomerProfile(request);
                if(response){
                    document.getElementById('save_messege').innerHTML = 'Successfully Updated your Profile';
                }
                else{
                    document.getElementById('save_messege').innerHTML = 'Error Saving Profile. Please try after sometime';
                }
            }
            catch(error){
                console.log(error);
            }
        }
        

    }

    render() {
        return (
            <div>
                {console.log(this.state.name)}
                < CustomerNavBar searchByLocation={this.searchByLocation} />
                <div className="container">
                    <form>
                    <h2>Profile</h2>
                    <div className="form-group">
                            <label >Name</label>
                            <input type="text" className="form-control" value={this.state.name}  onChange={(e) => this.setState({ name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label >Nick Name</label>
                            <input type="text" className="form-control" value={this.state.nickName}  onChange={(e) => this.setState({ nickName: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label >D.O.B</label>
                            <input type="text" className="form-control" value={this.state.dob} onChange={(e) => this.setState({ dob: e.target.value })} />
                        </div>
                        
                        <br/>
                        <hr/>
                        <h4>Address</h4>
                        <br/>
                        <div className="form-group">
                            <label >Street</label>
                            <input type="text" className="form-control" value={this.state.street} onChange={(e) => this.setState({ street: e.target.value })} />
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
                            <label >Pincode</label>
                            <input type="number" className="form-control" value={this.state.pincode} onChange={(e) => this.setState({ pincode: e.target.value })} />
                        </div>

                        <br />
                        <hr />
                        <h4>Contact Information</h4>
                        <br/>
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