import React from 'react';
import Product from './productitem/Product';

function ProductItem({getdata}) {
    return (
        <div className='container-product-item'>
            <Product  getdata={getdata}/>
        </div>
    );
}

export default ProductItem;