import React, { useState } from "react";

import Pagination from "react-js-pagination";

import { Col } from "react-bootstrap";
import CustomerOrderCard from '../Customer/CustomerOrderCard';
import '../../css/Customer.css';

const PaginatedContent = ({ orderslist }) => {

    let [pagenumberselect, setPagenumberselect] = useState(5);

    const orders = orderslist;

    const ordersPerPage = pagenumberselect;

    const [activePage, setCurrentPage] = useState(1);

    const indexOfLastorder = activePage * ordersPerPage;

    const indexOfFirstorder = indexOfLastorder - ordersPerPage;

    let currentorders = [];

    if(orders){
        currentorders = orders.slice(indexOfFirstorder, indexOfLastorder);
    }

    const renderorders = currentorders.map((order) => {

        return (
            <div className="col-12" key={order._id} >
                <CustomerOrderCard order={order} />
                <br />
            </div>


        );



    });





    const handlePageChange = (pageNumber) => {

        console.log(`active page is ${pageNumber}`);

        setCurrentPage(pageNumber)

    };



    const onselectnumber = (e) => {

        setPagenumberselect(e.target.value)

    }

    return (

        <div>
            {renderorders}
            <center>
                <div className="row">
                    <div className="col-4">
                    </div>
                    <div className="col-2">
                        <p style={{marginLeft:"40%",marginTop:"3%"}}>Items per page:</p>
                    </div>
                    <div className="col-1" style={{marginRight:"10%"}}>
                        <select className="form-control" onChange={onselectnumber} value={pagenumberselect} style={{ width: "40%" }}>
                            <option>2</option>
                            <option>5</option>
                            <option>10</option>
                        </select>
                    </div>
                    
                </div>


            </center>
            <br />
            <div className="pagination">
                <Col>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={pagenumberselect}
                        totalItemsCount= {orders ? orders.length : 0}
                        pageRangeDisplayed={pagenumberselect}
                        onChange={handlePageChange}
                    />
                </Col>
            </div>
        </div>
    )
}
export default PaginatedContent;