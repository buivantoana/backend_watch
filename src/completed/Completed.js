import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Loading from '../loading/Loading';
import Banner from '../productitem/Banner';
import "./completed.css"

function Completed({getdata}) {
    
     const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Giả định việc lấy dữ liệu từ server mất 2 giây để hoàn thành
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
    let history = useNavigate()
    const handleorder = () => {
        history("/order-completed")
    }
    return (
        <div className='completed-order'> 
            {loading ? <Loading check={loading} /> :
                <div>
                    <Header getdata={getdata}/>
                    <Banner span={"Order Completed"} />
                     <div className="cart-container">
                        <div className="cart-container-check">
                            <div className="cart-container-cart">
                                <p>Shopping Cart</p>
                            </div>
                            <div className="cart-container-checkout">
                                <p>checkout</p>
                            </div>
                            <div className="cart-container-order">
                                <p>Order Complated</p>
                            </div>
                        </div>
                        <div className="order-completed-container">
                            <h3>Bạn đã đặt hàng thành công</h3>
                            <p>Mời bạn vào trang Order để kiểm tra đơn hàng</p>
                            <span onClick={handleorder}><i className="fa-solid fa-arrow-left"></i>Order</span>
                        </div>

                    </div>
                    <Footer/>
                </div>}
        </div>
    );
}

export default Completed;