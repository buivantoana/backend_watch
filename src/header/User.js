import React from 'react';
import { Link } from 'react-router-dom';
import "./user.css"

function User({ check, data, login }) {
   
    return (
        <div className={`user ${check ? "visible" : "hidden"}`}>
            <div className={check?"cart-right":"cart-rights"}>
                <div className="flexuser">
                    <img src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-dai-dien-nguoi-giau-mat-doc-dao-cho-facebook.jpg" ư alt="" />
                    <div className="">
                    <h3>{data&&data.name?data.name:'' }</h3>
                       <Link to="/profile"> <button>Profile</button></Link>
                    </div>
                </div>
                <div className="detail-compare">
                    <div className="detail-compare-witlist">
                        <div className="">
                     <i className="fa-regular fa-heart"></i>
                         <span>ADD TO WISHLIST :</span>

                        </div>
                        <p>0</p>
            </div>
                    <div className="detail-compare-witlist">
                        <div className="">
              <i className="fa-solid fa-signal"></i>
              <span>COMPARE</span>

                        </div>
            </div>
                </div>
                <div className="user-logout">
                    <button onClick={login}>Đăng Xuất</button>
                </div>
            </div>
        </div>
    );
}


export default User;