import React from 'react';
import Feedback from './Feedback';
import Lighbox from './Lighbox';
import Product from './Product';
import Productnew from './Productnew';
import Room from './Room';
import Wraper from './Wraper';

function Container() {
    return (
        <div  style={{marginTop:"50px"}}>
            <Wraper />
            <Room />
            <Product />
            <Productnew />
            <Feedback />
            <Lighbox/>
        </div>
    );
}

export default Container;