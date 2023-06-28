import React from 'react';
import { Link } from "react-router-dom";
import "./homeheader.css"


function Homeheader(props) {
    return (
        <div className='homeheader'>
            <ul>
                
         <Link to="/adminhome/product"><li><a className="active" >Product</a></li></Link>
        <Link to="/adminhome/category"> <li><a >Category</a></li></Link>
                <Link to="/adminhome/brand"> <li><a >Brand</a></li></Link>
                <Link to="/adminhome/detail"> <li><a >Detail</a></li></Link>
                <Link to="/adminhome/order"> <li><a >Order</a></li></Link>
          
        </ul>
        </div>
    );
}

export default Homeheader;



