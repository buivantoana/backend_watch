import React, { useState } from 'react';
import "./Creat.css";
import Header from "../header/Header";
import Banner from "../productitem/Banner";
import Footer from "../footer/Footer"
import { custumer } from '../servide/service';
import { Link } from "react-router-dom";
import {  toast } from 'react-toastify';

function Creat() {
    let [name, setname] = useState('');
    let [address, setaddress] = useState('');
    let [phone, setphone] = useState(0);
    let [email, setemail] = useState('');
    let [password, setpassword] = useState('');
    let [check, setcheck] = useState(true);

    const handlechange = (e, type) => {
        if (type === "name") {
            setname(e.target.value)
        } else if (type === "address") {
            setaddress(e.target.value)
        }
        else if (type === "phone") {
            setphone(e.target.value)
        }
        else if (type === "email") {
            setemail(e.target.value)
        }else if (type === "password") {
            setpassword(e.target.value)
        }
    }

    const checkvalidate = () => {
        let isvalids = true
        let arrcheck = [name,address,phone,email,password];
        for (let i = 0; i < arrcheck.length; i++){
            if (!arrcheck[i]) {
                isvalids = false;
                toast.error("Bạn cần nhập đầy đủ thông tin")
                break;
            }
        }
        return isvalids
    }
    const handlesave = async () => {
        if (checkvalidate() === true) {
            let res = await custumer({
                name: name,
                address: address,
                phone: phone,
                email: email,
                password:password
            })
            
            if (res && res.data.mesasge === 0) {
                setcheck(!check)
                toast.success("Bạn đã tạo tài khoản thành công")
                
                setname('')
                setaddress('')
                setphone('')
                setemail('')
                setpassword('')
            } else {
                toast.error("Email đã tồn tại")
            }
            
    
            
        }
        
      
    }
    return (
        <div className='creat-container'>
            <Header />
            <Banner span={"Register"} />
            {check ?
                <div className="">
                    <h2 style={{textAlign:"center",margin:"20px 0",fontSize:"32px"}}>Bạn cần tạo tài khoản để sử dụng trên wed</h2>
                    <div className="register">
                        
                        <div >
                            <label >Name</label>
                            <input type="text" value={name} onChange={(e) => handlechange(e, "name")} placeholder="Your name.." />

                            <label >Address</label>
                            <input type="text" value={address} onChange={(e) => handlechange(e, "address")} placeholder="Your address.." />
                            <label >Password</label>
                            <input type="password" value={password} onChange={(e) => handlechange(e, "password")} placeholder="Your password.." />

  
    
                        </div>
                        <div >
                            <label >Phone</label>
                            <input type="text" value={phone} onChange={(e) => handlechange(e, "phone")} placeholder="Your phone.." />

                            <label >Email</label>
                            <input type="email" value={email} onChange={(e) => handlechange(e, "email")} placeholder="Your email.." />

  
    
                        </div>
                    </div>
                    <div className="" style={{ textAlign: "center " }}>
                        <button onClick={handlesave} className='register-creat'>Tạo người dùng</button>

                    </div>

                </div> :
                <div className="success">
                    <h2>Bạn đã tạo tài khoản thành công </h2>
                    <p>Mời bạn trở về trang chủ đăng nhập và tiếp tục mua sắm</p>
                <Link to="/">
                    <div className="">
                        <i className="fa-solid fa-arrow-left"></i>
                        <span>Trang chủ</span>

                        </div>
                        </Link>
                </div>}
            <Footer/>
        </div>
    );
}

export default Creat;