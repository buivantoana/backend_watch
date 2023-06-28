import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import Loading from '../loading/Loading';
import Banner from '../productitem/Banner';
import "./order.css";
import Footer from "../footer/Footer"
import { useDispatch, useSelector } from 'react-redux';
import { datacart } from '../redux/reselect';
import{ order }from "../servide/service"
import { useNavigate } from 'react-router-dom';
import { cartdata } from '../redux/action';
import {  toast } from 'react-toastify';

function Order({getdata}) {
    let data = useSelector(datacart);
    let total = 0;

    
    let [phone, setphone] = useState('');
    let [firstname, setfirstname] = useState('');
    let [lastname, setlastname] = useState('');
    let [address, setaddress] = useState('');
    let [city, setcity] = useState('');
    let [description, setdescription] = useState('');
  let history = useNavigate();
   

     const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Giả định việc lấy dữ liệu từ server mất 2 giây để hoàn thành
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
    
    let dispath = useDispatch()
    const handleorder = async () => {
        if (checkvalidate() === true) {
           if (data && data.length) {
            for (let i = 0; i < data.length; i++) {
                let resdata = {
                    product_id: data[i].product_id,
                    productname: data[i].productname,
                    custumer_id: data[i].custumer_id,
                    quancity: data[i].quancity,
                    price: data[i].price,
                    image: data[i].image,
                    status: 0,
                    phone: phone,
                    firstname: firstname,
                    lastname: lastname,
                    address: address,
                    city: city,
                    description: description
                }
                let res = await order(resdata)
                if (res && res.data.mesasge === 0) {
                  dispath(cartdata([]))
                    history('/completed')
                 toast.success("Bạn đã order sản phẩm thành công")
    } else {
       toast.error("Bạn đã order sản phẩm thất bại")
    }
            }
        }
        } 
        
    }
    
    const checkvalidate = () => {
        let isvalids = true
        let arrcheck = [phone,firstname,address,city,lastname,description];
        for (let i = 0; i < arrcheck.length; i++){
            if (!arrcheck[i]) {
                isvalids = false;
                alert("Bạn cần nhập đầy đủ thông tin tất cả các trường");
                break;
            }
        }
        return isvalids
    }
    
    return (
        <div className="order-cart">
            {loading ? <Loading check={loading} /> :
                <div>
                    <Header getdata={getdata}/>
                    <Banner span={"Order"} />
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
                        <div className="order-container">
                        <div className="order-left">
                                <h3>Billing Details</h3>
                                <div className="order-fist-last">
                                    <div className="firstname">
                                        <label >Tên</label><br></br>
                                        <input type="text" value={firstname} onChange={(e)=>setfirstname(e.target.value) } />
                                    </div>
                                    <div className="firstname">
                                        <label >Họ </label><br></br>
                                        <input type="text" value={lastname} onChange={(e)=>setlastname(e.target.value) }/>
                                    </div>
                                </div>
                                <div className="order-input ">
                                        <label >Địa chỉ </label><br></br>
                                        <input type="text" value={address} onChange={(e)=>setaddress(e.target.value) }/>
                                </div>
                                <div className="order-input ">
                                        <label >Tỉnh/Thành Phố </label><br></br>
                                        <input type="text" value={city} onChange={(e)=>setcity(e.target.value) }/>
                                </div>
                                <div className="order-input ">
                                        <label >Số điện Thoại </label><br></br>
                                        <input type="text" value={phone} onChange={(e)=>setphone(e.target.value) }/>
                                </div>
                                <div className="order-input ">
                                        <label >Ghi chú </label><br></br>
                                        <input type="text" value={description} onChange={(e)=>setdescription(e.target.value) } placeholder='Ghi chú thêm về đơn hàng thời gian ,địa chỉ giao chi tiết'/>
                                    </div>
                        </div>
                            <div className="order-right">
                                <h3>Your Order</h3>
                                <div className="order-right-item">
                                    <h4>SẢN PHẨM</h4>
                                    <p style={{color:"orange"}}>TẠM TÍNH</p>
                                </div>
                                <div className="">
                                    {data && data.length && data.map(item => {
                                        total+=item.price
                                         let money = (item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                     return  <div className="order-right-item">
                                         <span>{item.productname}<span style={{ fontSize: "6px",margin:"0 5px" }}>X</span>{item.quancity }</span>
                                         <p>{money }</p>
                                </div>
                                })}
                               
                                <div className="order-right-item">
                                    <h4>TẠM TÍNH</h4>
                                    <p style={{color:"orange"}}>{(total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                                <div className="order-right-item">
                                    <h4>GIAO HÀNG</h4>
                                    <p>Giao hàng miễn phí</p>
                                </div>
                                <div className="order-right-item">
                                    <h4>TỔNG</h4>
                                        <p style={{ color: "orange" }}>{ (total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                                
                                </div>
                                <div className="order-right-item-ship">
                                    <label >Trả tiền mặt khi nhận hàng</label><br></br>
                                    <input type="text" placeholder='Trả tiền mặt khi nhận hàng' />
                                    <span >Xem lại hóa đơn và vui lòng quý khách điền đầy đủ thông tin trên để đặt hàng.</span><br></br>
                                    <button onClick={handleorder}>Đặt Hàng</button>
                                </div>
                                
                        </div>
                        </div>

                    </div>
                    <Footer/>
                </div>}
       </div>
    );
}

export default Order;