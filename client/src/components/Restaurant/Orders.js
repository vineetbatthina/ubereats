import React, { Component } from 'react';

export default class Orders extends Component {
    render() {
        return (
            <div className="container">
                <br />
                <br />
                <br />
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Ordered By</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Biryani</td>
                            <td>Vineet</td>
                            <td>$15</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}