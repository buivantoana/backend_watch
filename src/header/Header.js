import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import "./header.css"
import Login from './Login';
import Search from './Search';
import {Link, useLocation, useNavigate} from "react-router-dom"
import User from './User';
import {  useDispatch, useSelector } from 'react-redux';
import { datacart, datauser, datawhitlist } from '../redux/reselect';
import { cartdata, logout, whitlistdata } from '../redux/action';
import { getallwhitlist } from '../servide/service';
import Cartmobile from './Cartmobile';



function Header({ getdata }) {
   
    let data = useSelector(datauser);
    let getcart = useSelector(datacart);
    let getwhitlist = useSelector(datawhitlist);
    
    
   
    
    async function getall() {
        let res = await getallwhitlist({ id: data.userData.id });
        if (res) {
           distpath(whitlistdata(res.data.data))
        }
    }
    useEffect(() => {
       getall()
   },[])
   
    
    let distpath = useDispatch()
    
    let [check, setcheck] = useState(false);
    let [checklogin, setlogin] = useState(false);
    let [cart, setcart] = useState(false);
    let [mobile, setmobile] = useState(false);
    let [user, setuser] = useState(data && data.check ? data.check : false);
    let [checkuser, setcheckuser] = useState(false);
    
   
    
    const toggle = () => {
        setcheck(!check)
    }
    const login = () => {
        if (user === true) {
            localStorage.removeItem("checklogin");
            distpath(logout())
            distpath(cartdata([]));
              distpath(whitlistdata([]))
            setcheckuser(!checkuser)
            setuser(!user)
        } else {
            setlogin(!checklogin)
            getdata()
        }
    }
    const cartclick = () => {
       
        setcart(!cart)
    }
   
    const handleuser = () => {
        setuser(!user)
    }
    const clickuser = () => {
        setcheckuser(!checkuser)
    }
  
    const location = useLocation();
  const pathname = location.pathname;
    const textAfterUrl = pathname.slice(pathname.lastIndexOf("/") + 1);
    let history = useNavigate()
    const whitlistclick = () => {
        history("/whitlist")
    }
    const mobileclick = () => {
        setmobile(!mobile)
    }
    return (
            <div className="container-header">
            <div className='header'>
                <div className="logo">
                 
   
                </div>
                <div className="menu">
                    <ul>
                        <li ><Link   className={textAfterUrl===""?"active":""} to="/">TRANG CHỦ</Link> </li>
                        <li> <Link className={textAfterUrl==="hublot"?"active":""}  to="/hublot">HUBLOT</Link> </li>
                        <li><Link className={textAfterUrl==="rolex"?"active":""}  to="/rolex">ROLEX</Link></li>
                        <li><Link className={textAfterUrl==="donghoco"?"active":""}  to="/donghoco">ĐỒNG HỒ CƠ</Link></li>
                        <li><Link className={textAfterUrl==="donghodayda"?"active":""}  to="/donghodayda">ĐỒNG HỒ DÂY DA</Link></li>
                        <li><Link className={textAfterUrl==="donghodaykimloai"?"active":""}  to="/donghodaykimloai">ĐỒNG HỒ DÂY KIM LOẠI</Link></li>
                        {data && data.userData ? <li><Link className={textAfterUrl==="order-completed"?"active":""}  to="/order-completed">ORDER</Link></li> : ""}
                    </ul>
                </div>
                <div className="menu2">
                    <div className="click-menu" onClick={mobileclick}><i className="fa-solid fa-bars"></i></div>
                    
                </div>
                <div className="search">
                    <div className="icon" onClick={toggle}><i className="fa-solid fa-magnifying-glass"></i></div>
                    <div className="icon" onClick={user ? clickuser : login}><i className={user ? "fa-solid fa-user" : "fa-solid fa-lock"}></i> </div>
                    <div className="icon" onClick={whitlistclick} style={{ position: "relative" }} ><i className="fa-regular fa-heart"></i> <span>{getwhitlist.length }</span></div>
                    <div className="icon" onClick={cartclick}><i className="fa-solid fa-cart-shopping"></i><span>{getcart.length }</span></div>
                </div>
                <div className="search2">
                    <div className="icon" onClick={toggle}><i className="fa-solid fa-magnifying-glass"></i></div>
                    <div className="icon" onClick={user ? clickuser : login}><i className={user ? "fa-solid fa-user" : "fa-solid fa-lock"}></i> </div>
                    <div className="icon" onClick={whitlistclick} style={{ position: "relative" }} ><i className="fa-regular fa-heart"></i> <span>{getwhitlist.length }</span></div>
                    <div className="icon" onClick={cartclick}><i className="fa-solid fa-cart-shopping"></i><span>{getcart.length }</span></div>
                </div>
                <Search check={check} toggle={toggle} />
                <Login check={checklogin} user={handleuser} toggle={login} />
                <Cart check={cart} data={getcart} toggle={cartclick} />
                <User check={checkuser} login={login} data={data.userData} toggle={clickuser} />
                <Cartmobile check={mobile}  toggle={mobileclick} />
            </div>
            
            </div>
        );
    }

    export default Header;