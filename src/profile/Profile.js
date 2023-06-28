

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../footer/Footer';
import Header from '../header/Header';





import Loading from '../loading/Loading';
import Banner from '../productitem/Banner';
import { datauser } from '../redux/reselect';
import "./profile.css";


function Profile({getdata}) {
    let user = useSelector(datauser);
   

   

  
  
 
   
  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
   
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  
  return (
      <div>
      {loading ? <Loading check={loading} /> :
        <div className='container-profile-all'>
          <Header getdata={getdata}/>
          <Banner span={ "Profile"} />
                  <div className="container-profile">
                      <h2>Profile</h2>
                      <div className="container-profile-item">
                          <div className="container-profile-item-flex">
                          <div className="container-profile-item-left">
                              <h5 >Họ và Tên</h5>
                                  <p>{user&&user.userData?user.userData.name:"" }</p>
                              <h5 >Địa Chỉ</h5>
                              <p>{user&&user.userData?user.userData.address:"" }</p>
                          </div>
                          <div className="container-profile-item-right">
                              <h5 >Số Điện Thoại</h5>
                              <p>0{user&&user.userData?user.userData.phone:"" }</p>
                              <h5 >Email</h5>
                              <p>{user&&user.userData?user.userData.email:"" }</p>
                          </div>
                              
                          </div>
                          <div className="container-profile-item-button">
                              <button>Sửa thông tin</button>
                          </div>
                      </div>
            </div>
          <Footer />
        </div>}
      </div>
    );
}

export default Profile;