import React, { useEffect, useState } from 'react';
import Header from './header/Header';
import Banner from './product/Banner';
import ProductContainer from './product/ProductContainer';
import Footer from "./footer/Footer"
import Loading from './loading/Loading';

function Product({getdata}) {
     const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
    return (
        <div>
            {loading ? <Loading check={loading} /> :
                <div className='container-productitem'>
            <Header  getdata={getdata}/>
                    <Banner />
                    <ProductContainer />
                    <Footer />
                </div>}

        </div>
    );
}

export default Product;