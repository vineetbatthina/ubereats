import React, { Component } from 'react';

export default class Dish extends Component {
    render() {
        return (
            <div className="container">
                <div className="row" style={{border:'1px solid red'}}>
                    <div className="col-sm" style={{border:'1px solid red'}}>
                        Dish Photo
                    </div>
                    <div className="row" style={{border:'1px solid red'}}>
                        <div className="col-sm" style={{border:'1px solid red'}}>
                            <h3>Dish Name</h3>
                        </div>
                    </div>
                </div>
                <div className="row" style={{border:'1px solid red'}}>
                    <div className="col-sm" style={{border:'1px solid red'}}>
                        Dish Description
                    </div>
                </div>
                <div className="row" style={{border:'1px solid red'}}>
                    <div className="col-sm" style={{border:'1px solid red'}}>
                        Dish Category
                    </div>
                </div>
                <div className="row" style={{border:'1px solid red'}}>
                    <div className="col-sm" style={{border:'1px solid red'}}>
                        Dish Ingredients
                    </div>
                </div>
                <div className="row" style={{border:'1px solid red'}}>
                    <div className="col-sm" style={{border:'1px solid red'}}>
                        Dish Price
                    </div>
                </div>
            </div>
        );
    }
}