import React, { useState } from 'react';
import "./raleted.css";
import Slider from "react-slick";
import "../container/product.css";
import StarRatings from "react-star-ratings";
import image from "../image/z4092421423118_f181fbf5060f72631edff69623ccf72b-410x410.jpg";

function Raleted() {
    const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
  };
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };
    return (
        <div className='raleted'>
            <div className="raleted-title">
                <h2>RELATED PRODUCTS</h2>
            </div>
            <div className="raleted-slider">
                <Slider {...settings}>
          <div className='raleted-item'>
           <div className="product-item">
                  <div className="product-item-center">
<div className="product-icon">
              <div className="head">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="compare">
                <i className="fa-solid fa-signal"></i>
              </div>
              <div className="parameter">
                <i className="fa-solid fa-compress"></i>
              </div>
                </div>
                    <img src={image} alt="" />
                    <p>ĐỒNG HỒ CƠ</p>
                        <h4>Đồng Hồ Cơ Hublot Wheelface</h4>
                        <StarRatings
                         rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="5px"
                         name="rating"
                        />
              <br></br>

                     <div className="product-price">
                    <span className='sale'>2.500.000<sup>đ</sup> </span>
                    <span className='curren-price'>2.500.000<sup>đ</sup> </span>

              </div>
              <div className="product-price-add">
                <span>THÊM VÀO GIỎ HÀNG</span>
                <div className="product-tab">
                  <div className="tab1"></div>
                 
                </div>
              </div>
                  </div>
                </div>
          </div>
          <div className='raleted-item'>
           <div className="product-item">
                  <div className="product-item-center">
<div className="product-icon">
              <div className="head">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="compare">
                <i className="fa-solid fa-signal"></i>
              </div>
              <div className="parameter">
                <i className="fa-solid fa-compress"></i>
              </div>
                </div>
                    <img src={image} alt="" />
                    <p>ĐỒNG HỒ CƠ</p>
                        <h4>Đồng Hồ Cơ Hublot Wheelface</h4>
                        <StarRatings
                         rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="5px"
                         name="rating"
                        />
              <br></br>

                     <div className="product-price">
                    <span className='sale'>2.500.000<sup>đ</sup> </span>
                    <span className='curren-price'>2.500.000<sup>đ</sup> </span>

              </div>
              <div className="product-price-add">
                <span>THÊM VÀO GIỎ HÀNG</span>
                <div className="product-tab">
                  <div className="tab1"></div>
                 
                </div>
              </div>
                  </div>
                </div>
          </div>
          <div className='raleted-item'>
           <div className="product-item">
                  <div className="product-item-center">
<div className="product-icon">
              <div className="head">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="compare">
                <i className="fa-solid fa-signal"></i>
              </div>
              <div className="parameter">
                <i className="fa-solid fa-compress"></i>
              </div>
                </div>
                    <img src={image} alt="" />
                    <p>ĐỒNG HỒ CƠ</p>
                        <h4>Đồng Hồ Cơ Hublot Wheelface</h4>
                        <StarRatings
                         rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="5px"
                         name="rating"
                        />
              <br></br>

                     <div className="product-price">
                    <span className='sale'>2.500.000<sup>đ</sup> </span>
                    <span className='curren-price'>2.500.000<sup>đ</sup> </span>

              </div>
              <div className="product-price-add">
                <span>THÊM VÀO GIỎ HÀNG</span>
                <div className="product-tab">
                  <div className="tab1"></div>
                 
                </div>
              </div>
                  </div>
                </div>
          </div>
          <div className='raleted-item'>
            <div className="product-item">
                  <div className="product-item-center">
<div className="product-icon">
              <div className="head">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="compare">
                <i className="fa-solid fa-signal"></i>
              </div>
              <div className="parameter">
                <i className="fa-solid fa-compress"></i>
              </div>
                </div>
                    <img src={image} alt="" />
                    <p>ĐỒNG HỒ CƠ</p>
                        <h4>Đồng Hồ Cơ Hublot Wheelface</h4>
                        <StarRatings
                         rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="5px"
                         name="rating"
                        />
              <br></br>

                     <div className="product-price">
                    <span className='sale'>2.500.000<sup>đ</sup> </span>
                    <span className='curren-price'>2.500.000<sup>đ</sup> </span>

              </div>
              <div className="product-price-add">
                <span>THÊM VÀO GIỎ HÀNG</span>
                <div className="product-tab">
                  <div className="tab1"></div>
                 
                </div>
              </div>
                  </div>
                </div>
          </div>
          <div className='raleted-item'>
            <div className="product-item">
                  <div className="product-item-center">
<div className="product-icon">
              <div className="head">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="compare">
                <i className="fa-solid fa-signal"></i>
              </div>
              <div className="parameter">
                <i className="fa-solid fa-compress"></i>
              </div>
                </div>
                    <img src={image} alt="" />
                    <p>ĐỒNG HỒ CƠ</p>
                        <h4>Đồng Hồ Cơ Hublot Wheelface</h4>
                        <StarRatings
                         rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="5px"
                         name="rating"
                        />
              <br></br>

                     <div className="product-price">
                    <span className='sale'>2.500.000<sup>đ</sup> </span>
                    <span className='curren-price'>2.500.000<sup>đ</sup> </span>

              </div>
              <div className="product-price-add">
                <span>THÊM VÀO GIỎ HÀNG</span>
                <div className="product-tab">
                  <div className="tab1"></div>
                 
                </div>
              </div>
                  </div>
                </div>
          </div>
          <div className='raleted-item'>
           <div className="product-item">
                  <div className="product-item-center">
<div className="product-icon">
              <div className="head">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="compare">
                <i className="fa-solid fa-signal"></i>
              </div>
              <div className="parameter">
                <i className="fa-solid fa-compress"></i>
              </div>
                </div>
                    <img src={image} alt="" />
                    <p>ĐỒNG HỒ CƠ</p>
                        <h4>Đồng Hồ Cơ Hublot Wheelface</h4>
                        <StarRatings
                         rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="5px"
                         name="rating"
                        />
              <br></br>

                     <div className="product-price">
                    <span className='sale'>2.500.000<sup>đ</sup> </span>
                    <span className='curren-price'>2.500.000<sup>đ</sup> </span>

              </div>
              <div className="product-price-add">
                <span>THÊM VÀO GIỎ HÀNG</span>
                <div className="product-tab">
                  <div className="tab1"></div>
                 
                </div>
              </div>
                  </div>
                </div>
          </div>
          <div className='raleted-item'>
           <div className="product-item">
                  <div className="product-item-center">
<div className="product-icon">
              <div className="head">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="compare">
                <i className="fa-solid fa-signal"></i>
              </div>
              <div className="parameter">
                <i className="fa-solid fa-compress"></i>
              </div>
                </div>
                    <img src={image} alt="" />
                    <p>ĐỒNG HỒ CƠ</p>
                        <h4>Đồng Hồ Cơ Hublot Wheelface</h4>
                        <StarRatings
                         rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="5px"
                         name="rating"
                        />
              <br></br>

                     <div className="product-price">
                    <span className='sale'>2.500.000<sup>đ</sup> </span>
                    <span className='curren-price'>2.500.000<sup>đ</sup> </span>

              </div>
              <div className="product-price-add">
                <span>THÊM VÀO GIỎ HÀNG</span>
                <div className="product-tab">
                  <div className="tab1"></div>
                 
                </div>
              </div>
                  </div>
                </div>
          </div>
          <div className='raleted-item'>
           <div className="product-item">
                  <div className="product-item-center">
<div className="product-icon">
              <div className="head">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="compare">
                <i className="fa-solid fa-signal"></i>
              </div>
              <div className="parameter">
                <i className="fa-solid fa-compress"></i>
              </div>
                </div>
                    <img src={image} alt="" />
                    <p>ĐỒNG HỒ CƠ</p>
                        <h4>Đồng Hồ Cơ Hublot Wheelface</h4>
                        <StarRatings
                         rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="5px"
                         name="rating"
                        />
              <br></br>

                     <div className="product-price">
                    <span className='sale'>2.500.000<sup>đ</sup> </span>
                    <span className='curren-price'>2.500.000<sup>đ</sup> </span>

              </div>
              <div className="product-price-add">
                <span>THÊM VÀO GIỎ HÀNG</span>
                <div className="product-tab">
                  <div className="tab1"></div>
                 
                </div>
              </div>
                  </div>
                </div>
          </div>
          <div className='raleted-item'>
           <div className="product-item">
                  <div className="product-item-center">
<div className="product-icon">
              <div className="head">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="compare">
                <i className="fa-solid fa-signal"></i>
              </div>
              <div className="parameter">
                <i className="fa-solid fa-compress"></i>
              </div>
                </div>
                    <img src={image} alt="" />
                    <p>ĐỒNG HỒ CƠ</p>
                        <h4>Đồng Hồ Cơ Hublot Wheelface</h4>
                        <StarRatings
                         rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={5}
                        starDimension="15px"
                        starSpacing="5px"
                         name="rating"
                        />
              <br></br>

                     <div className="product-price">
                    <span className='sale'>2.500.000<sup>đ</sup> </span>
                    <span className='curren-price'>2.500.000<sup>đ</sup> </span>

              </div>
              <div className="product-price-add">
                <span>THÊM VÀO GIỎ HÀNG</span>
                <div className="product-tab">
                  <div className="tab1"></div>
                 
                </div>
              </div>
                  </div>
                </div>
          </div>
        </Slider>
            </div>
        </div>
    );
}

export default Raleted;