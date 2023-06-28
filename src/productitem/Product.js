import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Banner from "./Banner";

import AsNavFor from "./Detail";
import "./product.css";
import Raleted from "./Raleted";
import Footer from "../footer/Footer";
import { useParams } from "react-router-dom";
import { getalldetail, getallproduct, getcart } from "../servide/service";
import { useDispatch, useSelector } from "react-redux";
import { cartdata, oneproduct } from "../redux/action";
import { datacart, datauser, oneproductitem } from "../redux/reselect";
import Loading from "../loading/Loading";

function Product({ getdata }) {
  const { id } = useParams();
  let data = useSelector(datauser);
  let [detail, setdetail] = useState([]);

  let cartdatas = useSelector(datacart);
 
  const [loading, setLoading] = useState(true);
  let dispath = useDispatch();
  async function getall() {
    let res = await getalldetail({ type: id });

    if (res) {
      setdetail(res.data.data);
    }
  }
  useEffect(() => {
    getall();

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const updatecart = async () => {
    let res = await getcart({ id: data.userData.id });
    console.log(res);
    if (res) {
      dispath(cartdata(res.data.data));
    }
  };

  return (
    <div className='container-item-all-product'>
      {loading ? (
        <Loading check={loading} />
      ) : (
        <div>
          <Header getdata={getdata} />
          <Banner span={"HUBLOT"} />
          <AsNavFor
            id={id}
            data={data}
            detail={detail}
            update={updatecart}
            cart={cartdatas}
          />
          <Raleted />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Product;
