import React, { useState } from "react";
import "./login.css";
import { useEffect } from "react";
import { custumerlogin } from "../servide/service";

 import {  toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function Login({ check, toggle,user }) {
    let [email, setemail] = useState('');
    let [password, setpassword] = useState('');
    
    useEffect(() => {
        const login = document.querySelector('.open-login');
        const register = document.querySelector('.open-register');
        const tranlate = document.querySelector('.login-wraper');
        const toggle = document.querySelectorAll('.login-heading span')
        toggle.forEach((e) => {
            e.addEventListener("click", function () {
                toggle.forEach((a) => {
                    a.classList.remove("login-active")
                })
                e.classList.add('login-active')
            })
        })

        register.addEventListener("click", function () {
           tranlate.style.animation = "tranlate ease-in .5s";
       tranlate.style.animationFillMode = "forwards";
        })
       login.addEventListener("click", function () {
            tranlate.style.animation = "tranlate1 ease-in .5s";
            tranlate.style.animationFillMode = "forwards";
        })
    })

   
    const hanldelogin = async () => {
       
        let res = await custumerlogin({ email: email, password: password })
      
       
       
         
        if (res && res.data.mesasge === 2) {
            toast.error("Tài khoản sai mời nhập lại ")
        } else {
            
            if (res && res.data.mesasge === 0) {
                let data = res.data.data;
                toast.success("Đăng nhập thành công")
                 localStorage.setItem("checklogin", JSON.stringify(data));
                user()
                toggle()
                 
            } else {
                 toast.error("Mật khẩu sai mời nhập lại")
           }
       }
    }
    return (
        <>
            <div className={check?"login active-open":"login"}>
                <div className="login-list">
                    <div onClick={toggle} className="closelogin">
                         <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="login-heading">
                        <span className="open-login login-active">Log In</span>
                        <span className="open-register"></span>
                    </div>
                    <div className="login-wraper">
                        <div className="dangnhap">
                            <div className="dangnhap-input">
                            <input type="text" value={ email} onChange={(e)=>setemail(e.target.value)} placeholder="UserName or Email" />
                            </div>
                             <div className="dangnhap-input">
                            <input type="password" value={ password} onChange={(e)=>setpassword(e.target.value)} placeholder="Password"/>
                            </div>
                            <div className="login-login">
                                <div className="check">
                                    <input type="checkbox" />
                                    <span>Remember Me</span>
                                </div>
                                <li className="list-menu " onClick={hanldelogin}>
                                  
                                             <span className="r"  ><span>Login</span> </span>
            
                                </li>
                            </div>
                            <div className="lost-password">
                                <Link to="/user/creat"><a href="">Creat User?</a></Link>
                            </div>
                        </div>
                        <div className="dangky">
                            <div className="dangky-input">
                             <input type="text" placeholder="Username"/>
                            </div>
                            <div className="dangky-input">
                             <input type="text" placeholder="Email"/>
                            </div>
                            <div className="login-login">
                                <div className="check">
                                    
                                    <span>Password be emailed to you.</span>
                                </div>
                                <li className="list-menu " >
                                   
                                    <span className="r"><span>Register</span> </span>
                                    
                                
                            </li>
                            </div>
                        </div>

                    </div>
                   
                </div>
            </div>
        </>
    )
}


export default Login