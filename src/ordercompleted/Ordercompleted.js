import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Loading from "../loading/Loading";
import Banner from "../productitem/Banner";
import { datacart, datauser } from "../redux/reselect";
import { deleteorder, getorder, star } from "../servide/service";
import { toast } from "react-toastify";
import "./ordercompleted.css";
function Ordercompleted({ getdata }) {
  let user = useSelector(datauser);
  let [check, setcheck] = useState(false);
  let [name, setname] = useState("");
  let [image, setimage] = useState("");
  let [id, setid] = useState(0);
  const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  let [dataorder, setdataorder] = useState([]);
  async function getdataorder() {
    let res = await getorder({ id: user.userData.id });
    if (res) {
      setdataorder(res.data.data);
    }
  }
  useEffect(() => {
    getdataorder();
  }, [user]);

  let subtotal = 0;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Giả định việc lấy dữ liệu từ server mất 2 giây để hoàn thành
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const handlestar = (id) => {
    dataorder.map((item) => {
      if (item.product_id === id) {
        setname(item.productname);
        setimage(item.image);
        setid(id);
        setcheck(!check);
      }
    });
  };

  const handleclose = async () => {
    let res = await star({ id: id, star: rating });
    if (res.data.mesasge == 0) {
      getdataorder();
      setcheck(!check);

      toast.success("Cảm ơn bạn đã đánh giá sản phẩm thành công");
    } else {
      toast.error("Bạn đã đánh giá sản phẩm yêu thích thất bại");
    }
  };
  const handledestroy = async (id) => {
    let res = await deleteorder({ id });
    if (res.data.mesasge === 0) {
      getdataorder();
      toast.success("Bạn đã hủy đơn hàng thành công");
    } else {
      toast.error("Bạn đã hủy đơn hàng thất bại");
    }
  };
  let history = useNavigate();
  const handlehome = () => {
    history("/");
  };
  return (
    <div className='completed-order-check'>
      {loading ? (
        <Loading check={loading} />
      ) : (
        <div>
          <Header getdata={getdata} />
          <Banner span={"Order Completed"} />
          <div className='container-completed-order-check'>
            {dataorder[0] ? (
              <div className='cart-container-left'>
                <div className='cart-container-title'>
                  <div className='cart-container-title-image'>IMAGE</div>
                  <div className='cart-container-title-productname'>
                    PRODUCT NAME
                  </div>
                  <div className='cart-container-title-price'>PRICE</div>
                  <div className='cart-container-title-quancity'>QUANCITY</div>
                  <div className='cart-container-title-total'>TOTAL</div>
                  <div className='cart-container-title-action'>ACTION</div>
                  <div className='cart-container-title-delete'>
                    <i className='fa-solid fa-xmark'></i>
                  </div>
                </div>
                {dataorder &&
                  dataorder.length &&
                  dataorder.map((item, index) => {
                    let total = item.price * item.quancity;
                    subtotal += total;

                    let money2 = item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    });
                    let money1 = total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    });

                    return (
                      <div key={item.id} className='cart-container-title'>
                        <div className='cart-container-title-image'>
                          <img
                            src={item.image}
                            width='101px'
                            style={{ marginTop: "22px" }}
                            height='101px'
                            alt=''
                          />
                        </div>
                        <div className='cart-container-title-productname'>
                          {item.productname}
                        </div>
                        <div className='cart-container-title-price'>
                          {money2}
                        </div>
                        <div className='cart-container-title-quancity'>
                          <p>{item.quancity}</p>
                        </div>
                        <div className='cart-container-title-total'>
                          {money1}
                        </div>
                        <div className='cart-container-title-action'>
                          {item.status === 1
                            ? "Đang vận chuyển"
                            : item.status === 0
                            ? "Đang xử lý"
                            : "Đã giao"}
                        </div>
                        <div className='cart-container-title-delete'>
                          {item.status === 2 ? (
                            <i
                              onClick={() => handlestar(item.product_id)}
                              className='fa-solid fa-star'></i>
                          ) : (
                            <i
                              onClick={() => handledestroy(item.id)}
                              className='fa-solid fa-xmark'></i>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div
                style={{ width: "870px", textAlign: "center" }}
                className='order-completed-container'>
                <h3 style={{ fontSize: "40px" }}>
                  Hiện bạn không có đơn hàng nào
                </h3>
                <p>Mời bạn vào trang Home để chọn sản phẩm</p>
                <span onClick={handlehome}>
                  <i className='fa-solid fa-arrow-left'></i>Home
                </span>
              </div>
            )}
            <div className='cart-container-right'>
              <h3>Quyền lợi khách hàng </h3>
              <ul>
                <li>
                  {" "}
                  <p>Giao hàng miễn phí</p>
                </li>
                <li>
                  {" "}
                  <p>Kiểm tra hàng trước khi nhận</p>
                </li>
                <li>
                  {" "}
                  <p>Nhận đổi trả hàng trong vòng 24h</p>
                </li>
                <li>
                  {" "}
                  <p>Bảo hành 12 tháng</p>
                </li>
                <li>
                  <p>Lỗi 1 đổi 1</p>
                </li>
              </ul>
            </div>
          </div>
          <Footer />
          {check ? (
            <div className='model-order'>
              <div className='modal-order-item'>
                <div className='modal-order-item-flex'>
                  <img src={image} width='100px' height='100px' alt='' />
                  <h2>{name}</h2>
                </div>
                <StarRatings
                  rating={rating}
                  starRatedColor='blue'
                  changeRating={changeRating}
                  numberOfStars={5}
                  starDimension='20px'
                  starSpacing='8px'
                  name='rating'
                />
                <div className='modal-order-item-click'>
                  <button onClick={handleclose}>Đánh Giá</button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default Ordercompleted;
