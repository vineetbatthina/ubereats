import React, { Component } from "react";

export default class RestaurantMenuEdit extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        Dish Images<input type="file" className="form-control-file" id="exampleFormControlFile1" placeholder="Dish Image Upload"></input>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Dish Description"></input>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Dish Price"></input>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Dish Ingredients"></input>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Dish Category"></input>
                    </div>
                    <div className="col">
                        <button className="btn btn-dark">Add Item</button>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                        Will Display Items Here
                    </div>
                </div>
            </div>
        )
    }
}