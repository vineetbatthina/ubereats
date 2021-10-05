import React, { Component } from 'react';
import '../../css/Generic.css';
import CustomerNavBar from '../Customer/CustomerNavBar';

export default class CustomerProfile extends Component {

    render() {
        return (
            <div>
                < CustomerNavBar searchByLocation={this.searchByLocation}/>
                <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Email Id</label>
                        <input type="text" className="form-control" value = {localStorage.getItem('emailId')} readOnly/>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-1">
                            <button type="submit" className="btn btn-dark" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div id="save_messege" hidden={false} style={{marginTop : '1%'}}></div>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            
        );
    }
}