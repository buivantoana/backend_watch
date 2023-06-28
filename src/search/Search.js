import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Header from '../header/Header';
import Loading from '../loading/Loading';
import Banner from '../productitem/Banner';
import { getallproduct, getstar, searchproduct } from '../servide/service';

function Search(props) {
    const { text } = useParams();
     const [rating, setRating] = useState(0);
  const [product, setproduct] = useState([]);
   const [star, setstar] = useState([]);
 
    
    


  const changeRating = (newRating) => {
    setRating(newRating);
    };
    const history = useNavigate();
  const router = (id) => {
    
      history(`/productitem/${id}`)
  }
async function getall() {
    let data = await searchproduct({ type: text });
   
  let res = await getstar();
      if (data&&res) {
        setproduct(data.data.data);
        setstar(res.data.data)
      }
    }
   const [loading, setLoading] = useState(true);
  useEffect(() => {
    getall()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const handlehome = () => {
       history("/")
   }
    
    return (
        <div>
            {loading ? <Loading check={loading} /> :
                <div>
                    <Header />
                    <Banner span={"Search Product"} />
           
                    {product&& product[0] ? <div className='product'>
                        <div className="product-title">
                            <h2>Tìm Kiếm Sản Phẩm : {text}</h2>
                            <p>Những mẫu đồng hồ mới về trong tuần</p>
                        </div>
                 
                        <div className="product-list">
                  
                            {product && product.length && product.map((item, index) => {
            
                                return <div key={item.id} onClick={() => router(item.id)} className="product-item">
            
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
                                        <img src={item.image} alt="" />
                                        <p>ĐỒNG HỒ CƠ</p>
                                        <h4>{item.productname.slice(0, 35) + "..."}</h4>
                                        <StarRatings
                                            rating={item.starall.star === null ? rating : item.starall.star}
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
                                            <span>THÊM VÀO GIỎ HÀNG</span>
                                            <div className="product-tab">
                                                <div className="tab1"></div>
                 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
            
               
                        </div>
                    </div> : <div style={{ width: "1270px", margin: "0 auto", textAlign: "center" }} className="order-completed-container">
                        <h3 style={{ fontSize: "40px" }}>Hiện không tìm thấy sản phẩm có tên : {text} </h3>
                        <p>Mời bạn vào trang Home để tìm kiếm</p>
                        <span onClick={handlehome}><i className="fa-solid fa-arrow-left"></i>Home</span>
                    </div>}
                </div>}
        </div>
    );
}

export default Search;