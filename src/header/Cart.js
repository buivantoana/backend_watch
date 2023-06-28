import React from 'react';
import "./cart.css"
import { Link } from 'react-router-dom';
import { deletecart, getcart } from '../servide/service';
import { cartdata } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { datauser } from '../redux/reselect';
import {  toast } from 'react-toastify';

function Cart({ check,data, toggle }) {
    let total = 0;
    let user = useSelector(datauser)
    let dispath = useDispatch();
    const handledestroy = async(id) => {
        let res = await deletecart({ id });
        if (res.data.mesasge===0) {
            let datares = await getcart({ id:user.userData.id })
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
    return (
        <div className={`cart ${check ? "visible" : "hidden"}`}>
            <div className={check?"cart-right":"cart-rights"}>
                <div className="cart-right-close">
                    <i onClick={toggle} className="fa-solid fa-xmark"></i>
                    <h3>YOUR CART</h3>
                </div>
                {data[0]  ?
                    <div className="current-item-cart">
                        <div style={{height:"450px"}}>

                            {data && data.length && data.map(item => {
                                let money1 = (item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                total += item.price * item.quancity
                               
                            return  <div className="flex-current-item" key={item.id}>
                            <div className="flex-current-item-img">
                                <img src={item.image} width="77px" style={{objectFit:"cover"}} height="77px" alt="" />
                            </div>
                            <div className="flex-current-item-price">
                                <div className="flex-current-item-price-item">
                                    <p>{item.quancity} <span style={{ fontSize: "10px" }}>X</span> {money1} </p>
                                    <i onClick={()=>handledestroy(item.id)} className="fa-solid fa-xmark"></i>
                                </div>
                                    <h3>{item.productname }</h3>
                            </div>
                        
                        </div>
                        })}
                        </div>
                       
                        <div style={{ width: "90%", margin: "0 auto" }}>
                            <hr />

                        </div>
                        <div className="current-emsty">
                            <p>TOTAL:</p>
                            <p>{(total).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </p>
                        </div>
                        <div className="button-shopping">
                            <Link to="/cart"><button className='shopping'>VIEW CART</button></Link>

                        </div>
                        <div className="button-checkout">
                            <button >CHECKOUT</button>

                        </div>
                    </div> :
                    <div className="curren-item-no-cart">
                        <div className="current-emsty">
                            <p>CURRENTLY EMPTY:</p>
                            <p>0 <sup>₫</sup> </p>
                        </div>
                        <div className="button-shopping">
                            <button className='shopping'>CONTINUE SHOPPING</button>

                        </div>

                    </div>}
            </div>
        </div>
    );
}

export default Cart;