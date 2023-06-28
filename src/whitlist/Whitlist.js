
import Footer from '../footer/Footer';
import Header from '../header/Header';

import React, { useEffect, useState } from 'react';

import Loading from '../loading/Loading';
import Banner from '../productitem/Banner';
import "./whitlist.css"
import { useDispatch, useSelector } from 'react-redux';
import { datawhitlist } from '../redux/reselect';
import { deletewhitlist, getallwhitlist } from '../servide/service';
import { whitlistdata } from '../redux/action';
import {  toast } from 'react-toastify';


function Whitlist({getdata}) {
  
    let data = useSelector(datawhitlist);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
   
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  let distpath = useDispatch()
    const handlewhitlist = async(id,user) => {
        let data = await deletewhitlist({ id: id });
        if (data) {
           let res = await getallwhitlist({ id: user});
        if (res) {
           distpath(whitlistdata(res.data.data))
        }
       toast.success("Bạn đã xóa phẩm yêu thích thành công")
    } else {
       toast.error("Bạn đã xóa phẩm yêu thích thất bại")
    }
  }
  return (
    <div>
      { loading?<Loading check = { loading } /> :
    <div className='container-whitlist-all'>
      <Header getdata={getdata}/>
      <Banner span={ "WhitList"}/>
                  <div className="container-whitlist">
                      <h2 >WhitList</h2>
                      <div className="container-completed-order-check">
                          
                      <div className="cart-container-left">
                                <div className="cart-container-title">
                                    <div className="cart-container-title-image">IMAGE</div>
                                    <div className="cart-container-title-productname">PRODUCT NAME</div>
                                    <div className="cart-container-title-price">PRICE</div>
                                    
                                    <div className="cart-container-title-delete">
                                        <i className="fa-solid fa-heart-circle-xmark"></i>
                                    </div>
                                </div>
                                {
                          
                                
                                    data && data.length && data.map((item, index) => {
                                       

                                        let money2 = (item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                        
                            
                           
                                        return <div key={item.id} className="cart-container-title">
                                            <div className="cart-container-title-image"><img src={item.image} width="101px" style={{ marginTop: "22px" }} height="101px" alt="" /></div>
                                            <div className="cart-container-title-productname">{item.productname}</div>
                                            <div className="cart-container-title-price">{money2}</div>
                                            
                                           
                                           
                                            <div onClick={()=>handlewhitlist(item.product_id,item.custumer_id)} className="cart-container-title-delete">
                                               <i className="fa-solid fa-heart-circle-xmark"></i>
                                                
                                            </div>
                                        </div>
                                    })
                                }
                        
                              
                      </div>
                      <div className="cart-container-right">
                            <h3>Quyền lợi khách hàng </h3>
                            <ul>
                                <li> <p>Giao hàng miễn phí</p></li>
                                <li> <p>Kiểm tra hàng trước khi nhận</p></li>
                                <li> <p>Nhận đổi trả hàng trong vòng 24h</p></li>
                                <li> <p>Bảo hành 12 tháng</p></li>
                                <li><p>Lỗi 1 đổi 1</p></li>
                            </ul>
                           
                           
                           
                           
                            
                            
                        </div>
                      </div>
      </div>
      <Footer />
    </div>
  }
      
  </div>
    );
}

export default Whitlist;