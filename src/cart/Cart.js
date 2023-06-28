import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Loading from '../loading/Loading';
import Banner from '../productitem/Banner';
import { cartdata } from '../redux/action';
import { datacart } from '../redux/reselect';
import { deletecart, getcart, getcartupdate } from '../servide/service';
import {  toast } from 'react-toastify';
import "./cart.css"
function Cart({getdata}) {
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Giả định việc lấy dữ liệu từ server mất 2 giây để hoàn thành
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  
    let data = useSelector(datacart);
    
    let dispath = useDispatch();
    let subtotal = 0;
    let arr = [];
    let [array, setarray] = useState([]);
    
    const arrmap = () => {
         data.map(item => {
            return arr.push(item.quancity)
        })
        
        setarray(arr)
    }
      
    useEffect(() => {
     arrmap()
       
      
    }, [data]);

    
    const handlequancity = (type, index) => {
        if (array[index] === 0) {
           setarray(prev => {
                return [...prev,array[index]=1]
            })
        }
        if (type == 1) {
            setarray(prev => {
                return [...prev,prev[index]++]
            })
        } else {
             setarray(prev => {
                return [...prev,prev[index]--]
            })
            }
             
    }
    
    const handleupdate = async() => {
        let splicearr = array.slice(0, data.length);
        
        
        if (data) {
            let res = await getcartupdate({ arr: splicearr,id:data[0].custumer_id });
            if (res) {
                 let datares = await getcart({ id:data[0].custumer_id })
                if (datares) {
                    dispath(cartdata(datares.data.data))
                 }
                      else {
                 dispath(cartdata([]));
                 }
            }
        }
    }
    let history = useNavigate()
    const handlerouter = () => {
       history("/order")
    }
    const handledestroy = async(id) => {
        let res = await deletecart({ id });
        if (res.data.mesasge===0) {
            let datares = await getcart({ id:data[0].custumer_id })
                if (datares) {
                    dispath(cartdata(datares.data.data))
                 }
                    else {
                 dispath(cartdata([]));
                 }
        toast.success("Bạn đã xóa sản phẩm thành công")
    } else {
       toast.error("Bạn đã xóa sản phẩm thất bại")
    }
    }
    
    const handlehome = () => {
       history("/")
   }
    return (
       <div className="container-cart">
            {loading ? <Loading check={loading} /> :
                <div>
                    <Header getdata={getdata}/>
                    <Banner span={"Cart"} />
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
                        <div className="cart-container-flex">
                            {data[0] ?
                                <div className="cart-container-left">
                                    <div className="cart-container-title">
                                        <div className="cart-container-title-image">IMAGE</div>
                                        <div className="cart-container-title-productname">PRODUCT NAME</div>
                                        <div className="cart-container-title-price">PRICE</div>
                                        <div className="cart-container-title-quancity">QUANCITY</div>
                                        <div className="cart-container-title-total">TOTAL</div>
                                        <div className="cart-container-title-delete">
                                            <i className="fa-solid fa-xmark"></i>
                                        </div>
                                    </div>
                                    {
                          
                                
                                        data && data.length && data.map((item, index) => {
                                            let total = item.price * item.quancity;
                                            subtotal += total;

                                            let money2 = (item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                            let money1 = (total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                            
                           
                                            return <div key={item.id} className="cart-container-title">
                                                <div className="cart-container-title-image"><img src={item.image}  style={{ marginTop: "22px" }}  alt="" /></div>
                                                <div className="cart-container-title-productname">{item.productname}</div>
                                                <div className="cart-container-title-price">{money2}</div>
                                                <div className="cart-container-title-quancity">
                                                    <div className="detail-slider-add-number">
                                                        <div className="detail-slider-add-number-item">
                                                            <div className="detail-number">
                                                                
                                                                <p>{array[index]}</p>

                                                            </div>
                                                            <div className="detail-slider-add-number-items">
                                                                <button ><i onClick={() => handlequancity(1, index)} className="fa-solid fa-plus"></i></button><br></br>
                                                                <button ><i onClick={() => handlequancity(2, index)} className="fa-solid fa-minus"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="cart-container-title-total">{money1}</div>
                                                <div onClick={() => handledestroy(item.id)} className="cart-container-title-delete">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </div>
                                            </div>
                                        })
                                    }
                        
                                    <div onClick={handleupdate} className="cart-container-update">
                                        <button>UPDATE CART</button>
                                    </div>
                                </div>: <div style={{width:"870px" ,textAlign:"center"}} className="order-completed-container">
                            <h3 style={{fontSize:"40px"}}>Bạn không có sản phẩm trong giỏ hàng</h3>
                            <p>Mời bạn vào trang Home để chọn sản phẩm</p>
                            <span  onClick={handlehome}><i className="fa-solid fa-arrow-left"></i>Home</span>
                        </div>}
                            <div className="cart-container-right">
                                <div className="cart-container-right-content">
                                    <div className="cart-container-right-total">
                                        <div className="cart-total">
                                            <h3>CART TOTALS</h3>
                                        </div>
                                        <div className="sub-total">
                                            <p>SUBTOTAL</p>
                                            <span>{(subtotal).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                        </div>
                                        <div className="ship-total">
                                            <p>GIAO HÀNG</p>
                                            <span>Giao hàng miễn phí<br></br>
                                                Tùy chọn giao hàng sẽ được<br></br> cập nhật trong quá trình<br></br> thanh toán.</span>
                                        </div>
                                        <div className="total-total">
                                            <p>TOTAL</p>
                                            <span>{(subtotal).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="proceer-to-checkout">
                                    <button onClick={data[0]?handlerouter:""}>PROCEED TO CHECKOUT</button>
                                </div>
                       
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>}
       </div>
    );
}

export default Cart;