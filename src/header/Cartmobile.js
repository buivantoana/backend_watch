import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { datauser } from '../redux/reselect';
import "./cart.css"

function Cartmobile({ check, toggle }) {
    const location = useLocation();
  const pathname = location.pathname;
    const textAfterUrl = pathname.slice(pathname.lastIndexOf("/") + 1);
    let data = useSelector(datauser);
    return (
        <div className={`cart ${check ? "visible" : "hidden"}`}>
            <div className={check?"cart-right":"cart-rights"}>
                <div className="cart-right-close">
                    <i onClick={toggle} className="fa-solid fa-xmark"></i>
                    <h3>Menu</h3>
                </div>
                <ul className='menu2-ul'>
                        <li ><Link   className={textAfterUrl===""?"active":""} to="/">TRANG CHỦ</Link> </li>
                        <li> <Link className={textAfterUrl==="hublot"?"active":""}  to="/hublot">HUBLOT</Link> </li>
                        <li><Link className={textAfterUrl==="rolex"?"active":""}  to="/rolex">ROLEX</Link></li>
                        <li><Link className={textAfterUrl==="donghoco"?"active":""}  to="/donghoco">ĐỒNG HỒ CƠ</Link></li>
                        <li><Link className={textAfterUrl==="donghodayda"?"active":""}  to="/donghodayda">ĐỒNG HỒ DÂY DA</Link></li>
                        <li><Link className={textAfterUrl==="donghodaykimloai"?"active":""}  to="/donghodaykimloai">ĐỒNG HỒ DÂY KIM LOẠI</Link></li>
                        {data && data.userData ? <li><Link className={textAfterUrl==="order-completed"?"active":""}  to="/order-completed">ORDER</Link></li> : ""}
                    </ul>
            </div>
        </div>
    );
}

export default Cartmobile;