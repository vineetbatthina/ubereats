import React, { Component } from 'react';
import '../../css/Generic.css';

export default class RestaurantProfile extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render() {
        var restaurantName = 'Biryaniz';
        return (
            <div className="container">
                <form>
                    <div class="form-group">
                        <label for="formGroupExampleInput">Restaurant Name</label>
                        <input type="text" class="form-control" value={restaurantName}/>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Location</label>
                        <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Description</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Timings</label>
                        <input type="text" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label for="formGroupExampleInput2">Contact Information</label>
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" />
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-1">
                            <button type="submit" class="btn btn-dark" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </div>    
                </form>
            </div>
        );
    }
}