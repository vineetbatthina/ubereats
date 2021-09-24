import React, { Component } from 'react';
import Dish from '../Common/Dish';
import '../../css/Restaurant.css';
import { AiFillEdit } from "react-icons/ai";

export default class RestaurantMenu extends Component {

    constructor(props){
        super(props);

        this.displayEditMenu = this.displayEditMenu.bind(this);
    }

    displayEditMenu(){
        this.props.renderEditMenu();
    }

    render() {
        return(
            <div className="container" style={{border:'1px solid red'}}>
                <div className = "row" style={{border:'1px solid red'}}>
                    <div className ="col" style={{border:'1px solid red'}}>
                        <h2>Our Menu</h2>
                    </div>
                    <div className ="col-2" style={{border:'1px solid red'}}>
                        <button style={{ borderRadius : '10px'} } onClick={this.displayEditMenu}><AiFillEdit /> Edit Menu</button>
                    </div>
                </div>
                <Dish />
            </div>
        );
    }
}