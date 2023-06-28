import Footer from "../footer/Footer";
import Header from "../header/Header";
import Banner from "./Banner";
import React, { useEffect, useState } from "react";
import "./productcontainer.css";
import { Range } from "react-range";
import "../container/product.css";
import image from "../image/z4092421423118_f181fbf5060f72631edff69623ccf72b-410x410.jpg";
import StarRatings from "react-star-ratings";
import {
  getallproduct,
  getalltypeproduct,
  getallwhitlist,
  getcountproduct,
  getstar,
  pagination,
  whitlist,
} from "../servide/service";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { datauser, datawhitlist } from "../redux/reselect";
import { whitlistdata } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Productcontainerleft from "./Productcontainerleft";
import { toast } from "react-toastify";

function Donghoco({ getdata }) {
  const [values, setValues] = useState([55, 85]);
  const [list, setlist] = useState(true);
  let [page, setpage] = useState(1);
  let [total, settotal] = useState(0);
  const [lists, setlists] = useState([]);
  const [limit, setlimit] = useState(0);

  const [oncheck, setoncheck] = useState(false);
  const handleoncheck = async () => {
    setoncheck(!oncheck);
  };

  const handleRangeChange = (values) => {
    setValues(values);
  };

  const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  let money1 = ((values[0] / 100) * 3000000).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  let money2 = ((values[1] / 100) * 3000000).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [star, setstar] = useState([]);

  const [count, setcount] = useState({});

  const history = useNavigate();
  const router = (id) => {
    history(`/productitem/${id}`);
  };
  async function getall() {
    let count = await getcountproduct();
    let res = await getstar();
    let panigation = await pagination(page);
    if (data && res) {
      setcount(count.data.data);

      setstar(res.data.data);
      let totalpage = Math.ceil(panigation.data.total / panigation.data.limit);
      setlimit(panigation.data.limit);
      settotal(totalpage);
      setlists(panigation.data.data);
    }
  }
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getall();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const handlechange = async (e) => {
    let value = e.target.value;
    if (value === "1") {
      let panigation = await pagination(page);
      if (panigation) {
        setlists(panigation.data.data);
      }
    } else if (value === "2") {
      let panigation = await pagination(page);
      if (panigation) {
        let arr = panigation.data.data.sort((a, b) => a.price - b.price);

        setlists(arr);
      }
    } else if (value === "3") {
      let panigation = await pagination(page);
      if (panigation) {
        let arr = panigation.data.data.sort((a, b) => b.price - a.price);

        setlists(arr);
      }
    }
  };

  const handleloc = async (value1, value2) => {
    let panigation = await pagination(page);
    let arr = panigation.data.data.filter((item) => {
      return item.price >= value1 && item.price <= value2;
    });
    setlists(arr);
  };

  let dispath = useDispatch();
  let userdata = useSelector(datauser);
  const handlehead = async (id, name, price, image) => {
    let res = await whitlist({
      product_id: id,
      custumer_id: userdata.userData.id,
      productname: name,
      price: price,
      image: image,
    });
    if (res) {
      let data = await getallwhitlist({ id: userdata.userData.id });
      if (data) {
        dispath(whitlistdata(data.data.data));
      }
      toast.success("Bạn đã thêm sản phẩm yêu thích thành công");
    } else {
      toast.error("Bạn đã thêm sản phẩm yêu thích thất bại");
    }
  };

  let arr = [];
  let whitlistall = useSelector(datawhitlist);
  whitlistall.map((item) => {
    return arr.push(item.product_id);
  });

  let data = lists.filter((item, index) => {
    return arr.includes(item.id);
  });

  const handlePageChange = async (id) => {
    setpage(id);
    let panigation = await pagination(id);
    if (panigation) {
      setlimit(panigation.data.data.length);
      setlists(panigation.data.data);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading check={loading} />
      ) : (
        <div className='donghoco-container'>
          <Header getdata={getdata} />
          <Banner span={"ĐỒNG HỒ CƠ"} />
          <div className='product-container'>
            <div className='oncheck' onClick={handleoncheck}>
              <i className='fa-solid fa-angles-left'></i>
            </div>
            <div className='product-container-left'>
              <div className='product-bg'>
                <div className='product-container-category'>
                  <div className='product-container-category-item'>
                    <h3>PRODUCT CATEGORIES</h3>
                    <div className='product-tab1'></div>
                    <ul>
                      <li>
                        {" "}
                        <Link to='/donghoco'>
                          {" "}
                          ĐỒNG HỒ CƠ : (
                          <span style={{ color: "orange" }}>
                            {count.donghoco}
                          </span>
                          ){" "}
                        </Link>
                      </li>
                      <li>
                        <Link to='/donghodayda'>
                          ĐỒNG HỒ DÂY DA : (
                          <span style={{ color: "orange" }}>
                            {count.donghodayda}
                          </span>
                          )
                        </Link>
                      </li>
                      <li>
                        <Link to='/donghodaykimloai'>
                          ĐỒNG HỒ DÂY KIM LOẠI : (
                          <span style={{ color: "orange" }}>
                            {count.donghodaykimloai}
                          </span>
                          )
                        </Link>
                      </li>
                      <li>
                        <Link to='/hublot'>
                          HUBLOT : (
                          <span style={{ color: "orange" }}>
                            {count.hublot}
                          </span>
                          )
                        </Link>
                      </li>
                      <li>
                        <Link to='/rolex'>
                          ROLEX : (
                          <span style={{ color: "orange" }}>{count.rolex}</span>
                          )
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='product-bg'>
                <div className='product-container-filter'>
                  <div className='product-container-category-item'>
                    <h3>FILTER BY PRICE</h3>
                    <div className='product-tab1'></div>
                    <div className='product-filter'>
                      <div className='product-tab2'>
                        <div style={{ width: "100%", margin: "0 auto" }}>
                          <Range
                            step={1}
                            min={0}
                            max={100}
                            values={values}
                            onChange={handleRangeChange}
                            renderTrack={({ props, children }) => (
                              <div
                                {...props}
                                style={{
                                  ...props.style,
                                  height: "6px",
                                  borderRadius: "3px",
                                  backgroundColor: "orange",
                                }}>
                                {children}
                              </div>
                            )}
                            renderThumb={({ index, props }) => (
                              <div
                                {...props}
                                style={{
                                  ...props.style,
                                  height: "18px",
                                  width: "18px",
                                  borderRadius: "9px",
                                  backgroundColor:
                                    index === 0 ? "orange" : "#dc3545",
                                }}
                              />
                            )}
                          />
                          <div
                            style={{
                              marginTop: "20px",
                              fontSize: "16px",
                              color: "gray",
                            }}>
                            <span> {money1} </span>- <span> {money2} </span>
                            <button
                              className='loc'
                              onClick={() =>
                                handleloc(
                                  (values[0] / 100) * 3000000,
                                  (values[1] / 100) * 3000000
                                )
                              }>
                              Lọc
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='product-bg'>
                <div className='product-container-tag'>
                  <div className='product-container-category-item'>
                    <h3>PRODUCT CATEGORIES</h3>
                    <div className='product-tab1'></div>
                    <ul>
                      <Link to='/donghoco'>
                        {" "}
                        <li>
                          <span>ĐỒNG HỒ CƠ </span>{" "}
                        </li>
                      </Link>
                      <Link to='/donghodayda'>
                        {" "}
                        <li>
                          <span>ĐỒNG HỒ DÂY DA</span>{" "}
                        </li>
                      </Link>
                      <Link to='/donghodayimloai'>
                        <li>
                          <span>ĐỒNG HỒ DÂY KIM LOẠI</span>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='product-container-right'>
              <div className='product-container-right-title'>
                <p>
                  Hiển thị <span style={{ color: "orange" }}>1</span>-
                  <span style={{ color: "orange" }}>{limit}</span> của{" "}
                  <span style={{ color: "orange" }}>{count.donghoco}</span> kết
                  quả
                </p>
                <div className='product-container-right-select'>
                  <select name='' onChange={(e) => handlechange(e)} id=''>
                    <option value='1'>Thứ tự mặc định</option>
                    <option value='2'>Thứ tự theo giá từ thấp đến cao</option>
                    <option value='3'>Thứ tự theo giá từ cao đến thấp</option>
                  </select>
                  <i
                    onClick={() => setlist(!list)}
                    style={list ? { color: "orange" } : {}}
                    className='fa-solid fa-table-cells'></i>
                  <i
                    onClick={() => setlist(!list)}
                    style={!list ? { color: "orange" } : {}}
                    className='fa-solid fa-list-ul'></i>
                </div>
              </div>
              <div className='product-container-right-content'>
                {list ? (
                  <div className='product'>
                    <div className='product-list'>
                      {lists &&
                        lists.length &&
                        lists.map((item, index) => {
                          const targetProduct = data.find(
                            (product) => product.id === item.id
                          );
                          if (targetProduct) {
                            return (
                              <div key={item.id} className='product-item'>
                                <div className='product-item-center'>
                                  <div className='product-icon'>
                                    <div
                                      className='head'
                                      style={{ background: "red" }}
                                      onClick={
                                        userdata.userData
                                          ? () =>
                                              handlehead(
                                                item.id,
                                                item.productname,
                                                item.price,
                                                item.image
                                              )
                                          : () => {}
                                      }>
                                      <i
                                        style={{ color: "white" }}
                                        className='fa-regular fa-heart'></i>
                                    </div>
                                    <div className='compare'>
                                      <i className='fa-solid fa-signal'></i>
                                    </div>
                                    <div className='parameter'>
                                      <i className='fa-solid fa-compress'></i>
                                    </div>
                                  </div>
                                  <img src={item.image} alt='' />
                                  <p>ĐỒNG HỒ CƠ</p>
                                  <h4>
                                    {item.productname.slice(0, 35) + "..."}
                                  </h4>
                                  <StarRatings
                                    rating={
                                      !item.starall[0]
                                        ? rating
                                        : item.starall[0].star
                                    }
                                    starRatedColor='blue'
                                    changeRating={changeRating}
                                    numberOfStars={5}
                                    starDimension='15px'
                                    starSpacing='5px'
                                    name='rating'
                                  />
                                  <br></br>
                                  <div className='product-price'>
                                    <span className='sale'>
                                      {item.price}
                                      <sup>đ</sup>{" "}
                                    </span>
                                    <span className='curren-price'>
                                      {item.price}
                                      <sup>đ</sup>{" "}
                                    </span>
                                  </div>
                                  <div className='product-price-add'>
                                    <span onClick={() => router(item.id)}>
                                      THÊM VÀO GIỎ HÀNG
                                    </span>
                                    <div className='product-tab'>
                                      <div className='tab1'></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div key={item.id} className='product-item'>
                                <div className='product-item-center'>
                                  <div className='product-icon'>
                                    <div
                                      className='head'
                                      onClick={
                                        userdata.userData
                                          ? () =>
                                              handlehead(
                                                item.id,
                                                item.productname,
                                                item.price,
                                                item.image
                                              )
                                          : () => {}
                                      }>
                                      <i className='fa-regular fa-heart'></i>
                                    </div>
                                    <div className='compare'>
                                      <i className='fa-solid fa-signal'></i>
                                    </div>
                                    <div className='parameter'>
                                      <i className='fa-solid fa-compress'></i>
                                    </div>
                                  </div>
                                  <img src={item.image} alt='' />
                                  <p>ĐỒNG HỒ CƠ</p>
                                  <h4>
                                    {item.productname.slice(0, 35) + "..."}
                                  </h4>
                                  <StarRatings
                                    rating={
                                      !item.starall[0]
                                        ? rating
                                        : item.starall[0].star
                                    }
                                    starRatedColor='blue'
                                    changeRating={changeRating}
                                    numberOfStars={5}
                                    starDimension='15px'
                                    starSpacing='5px'
                                    name='rating'
                                  />
                                  <br></br>
                                  <div className='product-price'>
                                    <span className='sale'>
                                      {item.price}
                                      <sup>đ</sup>{" "}
                                    </span>
                                    <span className='curren-price'>
                                      {item.price}
                                      <sup>đ</sup>{" "}
                                    </span>
                                  </div>
                                  <div className='product-price-add'>
                                    <span onClick={() => router(item.id)}>
                                      THÊM VÀO GIỎ HÀNG
                                    </span>
                                    <div className='product-tab'>
                                      <div className='tab1'></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                    <ReactPaginate
                      pageCount={total}
                      pageRangeDisplayed={5}
                      marginPagesDisplayed={2}
                      onPageChange={(data) =>
                        handlePageChange(data.selected + 1)
                      }
                      containerClassName={"pagination"}
                      activeClassName={"actives"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                    />
                  </div>
                ) : (
                  <div className='product'>
                    <div className='product2'>
                      {lists &&
                        lists.length &&
                        lists.map((item, index) => {
                          let money = item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          });
                          return (
                            <div className='product2-item'>
                              <div className='product2-item-child-face'>
                                <img src={item.image} alt='' />
                                <div className='product2-item-child-face-des'>
                                  <h3>{item.productname}</h3>
                                  <StarRatings
                                    rating={
                                      !item.starall[0]
                                        ? rating
                                        : item.starall[0].star
                                    }
                                    starRatedColor='blue'
                                    changeRating={changeRating}
                                    numberOfStars={5}
                                    starDimension='15px'
                                    starSpacing='5px'
                                    name='rating'
                                  />
                                  <p>
                                    Máy chạy cơ automatic hàng Nhật Mặt size x
                                    38/42 mm Khung kim loại thép 316L đúc đặc
                                    chống bay màu rỉ sét Mặt kính Crystal chống
                                    xước
                                  </p>
                                </div>
                              </div>
                              <div className='product2-item-add'>
                                <div className='product2-item-add-flex'>
                                  <p>{money}</p>
                                  <button onClick={() => router(item.id)}>
                                    THÊM VÀO GIỎ HÀNG
                                  </button>
                                  <button>ADD COMPARE</button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <ReactPaginate
                      pageCount={total}
                      pageRangeDisplayed={5}
                      marginPagesDisplayed={2}
                      onPageChange={(data) =>
                        handlePageChange(data.selected + 1)
                      }
                      containerClassName={"pagination"}
                      activeClassName={"actives"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
          <Productcontainerleft
            check={oncheck}
            loc={handleloc}
            toggle={handleoncheck}
          />
        </div>
      )}
    </div>
  );
}

export default Donghoco;
