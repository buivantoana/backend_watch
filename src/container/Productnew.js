import React, { useEffect, useState } from 'react';
import "./product.css";
import image from "../image/z4092421423118_f181fbf5060f72631edff69623ccf72b-410x410.jpg";
import StarRatings from "react-star-ratings";
import { getallwhitlist, getstar, gettypeproduct, whitlist } from '../servide/service';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { datauser, datawhitlist } from '../redux/reselect';
import { whitlistdata } from '../redux/action';

function Productnew() {

  const [product, setproduct] = useState([]);
   const [star, setstar] = useState([]);
 
 const history = useNavigate();
  const router = (id) => {
    
      history(`/productitem/${id}`)
  }
async function getall() {
  let data = await gettypeproduct({ type: 2 });
  let res = await getstar();
      if (data&&res) {
        setproduct(data.data.data);
        setstar(res.data.data)
      }
    }
  useEffect(() => {
    
    getall();
   
  }, [])
  let dispath = useDispatch()
   let userdata = useSelector(datauser);
const handlehead = async(id,name,price,image) => {
    let res = await whitlist({
      product_id: id,
      custumer_id:userdata.userData.id,
      productname:name,
      price:price,
      image:image,
    })
    if (res) {
      let data = await getallwhitlist({ id: userdata.userData.id })
      if (data) {
          dispath(whitlistdata(data.data.data))
        }
   }
  }
    const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
  };
  
  let arr = []
  let whitlistall = useSelector(datawhitlist);
  whitlistall.map(item => {
    return arr.push(item.product_id)
  })
  
  let data = product.filter((item,index) => {
    return arr.includes(item.id)
  })
 
    return (
        <div className='product'>
            <div className="product-title">
                <h2>SẢN PHẨM HOT</h2>
                <p>Những mẫu đồng hồ mới về trong tuần</p>
            </div>
            <div className="product-list">
                { 
          product && product.length && product.map((item, index) => {
            const targetProduct = data.find(product => product.id === item.id);
            if (targetProduct) {
              return <div key={item.id} className="product-item">
            
                <div className="product-item-center">
                  <div className="product-icon">
                    <div className="head"  style={{background:"red"}}  onClick={userdata.userData ? () => handlehead(item.id, item.productname, item.price, item.image) : () => { }}>
                      <i style={{color:"white"}}  className="fa-regular fa-heart"></i>
                    </div>
                    <div className="compare">
                      <i className="fa-solid fa-signal"></i>
                    </div>
                    <div className="parameter">
                      <i className="fa-solid fa-compress"></i>
                    </div>
                  </div>
                  <img src={item.image} alt="" />
                  <p>ĐỒNG HỒ CƠ</p>
                  <h4>{item.productname.slice(0, 35) + "..."}</h4>
                  <StarRatings
                    rating={! item.starall[0] ? rating : item.starall[0].star}
                    starRatedColor="blue"
                    changeRating={changeRating}
                    numberOfStars={5}
                    starDimension="15px"
                    starSpacing="5px"
                    name="rating"
                  />
                  <br></br>
                  <div className="product-price">
                    <span className='sale'>{item.price}<sup>đ</sup> </span>
                    <span className='curren-price'>{item.price}<sup>đ</sup> </span>

                  </div>
                  <div className="product-price-add">
                    <span onClick={() => router(item.id)}>THÊM VÀO GIỎ HÀNG</span>
                    <div className="product-tab">
                      <div className="tab1"></div>
                 
                    </div>
                  </div>
                </div>
              </div>
             
            } else {
              return <div key={item.id} className="product-item">
            
                <div className="product-item-center">
                  <div className="product-icon">
                    <div className="head"   onClick={userdata.userData ? () => handlehead(item.id, item.productname, item.price, item.image) : () => { }}>
                      <i  className="fa-regular fa-heart"></i>
                    </div>
                    <div className="compare">
                      <i className="fa-solid fa-signal"></i>
                    </div>
                    <div className="parameter">
                      <i className="fa-solid fa-compress"></i>
                    </div>
                  </div>
                  <img src={item.image} alt="" />
                  <p>ĐỒNG HỒ CƠ</p>
                  <h4>{item.productname.slice(0, 35) + "..."}</h4>
                  <StarRatings
                    rating={! item.starall[0] ? rating : item.starall[0].star}
                    starRatedColor="blue"
                    changeRating={changeRating}
                    numberOfStars={5}
                    starDimension="15px"
                    starSpacing="5px"
                    name="rating"
                  />
                  <br></br>
                  <div className="product-price">
                    <span className='sale'>{item.price}<sup>đ</sup> </span>
                    <span className='curren-price'>{item.price}<sup>đ</sup> </span>

                  </div>
                  <div className="product-price-add">
                    <span onClick={() => router(item.id)}>THÊM VÀO GIỎ HÀNG</span>
                    <div className="product-tab">
                      <div className="tab1"></div>
                 
                    </div>
                  </div>
                </div>
              </div>
           }
             
            
            })
         
            

          }
            </div>
        </div>
    );
}

export default Productnew;