import React, { useEffect, useState } from 'react';
import "./login.css";
import "../header/login.css"
import { login ,checklogin} from '../servide/service';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkadminlogin } from '../redux/reselect';
import { check } from '../redux/action';


function LoginAdmin() {
    let adminlogin = useSelector(checkadminlogin);
    console.log(adminlogin);

    let [name, setname] = useState('');
    let [password, setpassword] = useState('')
    
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

    // useEffect(async() => {
    //   const token = Cookies.get('token');
    //     let checkres = await checklogin({ token: token });
        
    //     if (checkres) {
    //         ditpath(check(true))
           
    //          history("/adminhome")
          
          
            
            
    //     }  
    // }, [])
    
    const handlechange = (e, type) => {
        if (type === "name") {
            setname(e.target.value);
        } else {
             setpassword(e.target.value);
        }
    }
    const history = useNavigate()
    const ditpath = useDispatch();
    const handleclick = async() => {
        try {
            let res = await login({
                adminname: name,
                password:password
            })
            Cookies.set('token', res.data, { expires: 7 });
        const token = Cookies.get('token');
        let checkres = await checklogin({ token: token });
        
        if (checkres) {
            ditpath(check(true))
           
             history("/adminhome")
          
            
            
        }
        }
        catch (e) {
            console.log(e);
        }
    }
    

    return (
        <div>
            <div className="login" style={{opacity:1,pointerEvents:"all"}}>
                <div className="login-list">
                    
                    <div className="login-heading">
                        <span className="open-login login-active">Log In</span>
                        <span className="open-register">Register</span>
                    </div>
                    <div className="login-wraper">
                        <div className="dangnhap">
                            <div className="dangnhap-input">
                            <input type="text" value={name}  onChange={(e)=>handlechange(e,"name")} placeholder="UserName or Email" />
                            </div>
                             <div className="dangnhap-input">
                            <input type="text" value={password} onChange={(e)=>handlechange(e,"password")} placeholder="Password"/>
                            </div>
                            <div className="login-login">
                                <div className="check">
                                    <input type="checkbox" />
                                    <span>Remember Me</span>
                                </div>
                                <li className="list-menu " >
                                  
                                <span className="r"><button onClick={handleclick}>Login</button> </span>
            
                                </li>
                            </div>
                            <div className="lost-password">
                                <a href="">Lost Password?</a>
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
        </div>
    );
}

export default LoginAdmin;