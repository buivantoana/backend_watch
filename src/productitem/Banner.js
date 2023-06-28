import React from 'react';
import "../product/banner.css"

function Banner({span}) {
    return (
        <div className='banner-product'>
            <div className="banner-product-title">
                <h1>SHOP</h1>
                <span>Trang chủ  &#62;  </span> <span style={{ color: "orange" }}> { span}</span> 
            </div>
        </div>
    );
}

export default Banner;