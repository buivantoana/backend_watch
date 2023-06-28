import React, { useEffect, useState} from 'react';
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import Product from './Product';
import ProductItem from './ProductItem';
import LoginAdmin from './admin/Login';
import Homeadmin from './admin/Home';
import Category from './admin/Category';
import Brand from './admin/Brand';
import Productadmin from './admin/Product';
import {  getallbrand, getallcategory, getallwhitlist, getcart } from './servide/service';
import { useDispatch } from 'react-redux';
import { allbrand, allcategory, cartdata, loginuser, whitlistdata } from './redux/action';
import Derail from './admin/Derail';
import Creat from './Login/Creat';
import Cart from './cart/Cart';
import Order from './order/Order';
import Completed from './completed/Completed';
import Ordercompleted from './ordercompleted/Ordercompleted';
import Rolex from './product/Rolex';
import Donghoco from './product/Donghoco';
import Donghodayda from './product/Donghodayda';
import Donghodaykimloai from './product/Donghodaykimloai';
import Search from './search/Search';
import Profile from './profile/Profile';
import Whitlist from './whitlist/Whitlist';
import { ToastContainer, toast } from 'react-toastify';
import Orderadmin from './admin/Order';










function App() {
  let dispath = useDispatch();
 
    const getdata = async() => {
        const userData =await JSON.parse(localStorage.getItem('checklogin'));
      if (userData) {
         
        dispath(loginuser({ check: true, userData }))
        let data = await getcart({ id: userData.id });
        let res = await getallwhitlist({ id: userData.id });
        if (res) {
           dispath(whitlistdata(res.data.data))
        }
        if (data) {
          dispath(cartdata(data.data.data))
        } else {
          dispath(cartdata([]))
        }
      } else {
         dispath(cartdata([]));
   }
    }
  
  useEffect(() => {
    getdata()
    async function selectproduct() {
      let brand = await getallbrand();
      let category = await getallcategory()
      if (brand && category) {
        dispath(allbrand(brand.data.data))
         dispath(allcategory(category.data.data))
      }

    }
    selectproduct()
    
  },[])
  return (
    <div className="">
      
      
      
      <Routes>
        <Route path="/login"  element={<LoginAdmin />} />
        <Route path="/adminhome" element={<Homeadmin />} />
        <Route path="/adminhome/category" element={<Category />} />
        <Route path="/adminhome/brand" element={<Brand />} />
        <Route path="/adminhome/product" element={<Productadmin />} />
        <Route path="/adminhome/detail" element={<Derail />} />
        <Route path="/adminhome/order" element={<Orderadmin />} />
        <Route path="/cart" element={<Cart getdata={getdata}/>} />
        <Route path="/order" element={<Order getdata={getdata}/>} />
        <Route path="/completed" element={<Completed getdata={getdata}/>} />
         <Route path="/order-completed" element={<Ordercompleted getdata={getdata}/>} />


        <Route path="/user/creat" element={<Creat />} />

        <Route path="/" element={<Home getdata={getdata}  />} />
        <Route path="/hublot" element={<Product getdata={getdata} />} />
        <Route path="/donghoco" element={<Donghoco />} getdata={getdata}/>
        <Route path="/donghodayda" element={<Donghodayda />} getdata={getdata}/>
         <Route path="/donghodaykimloai" element={<Donghodaykimloai getdata={getdata}/>} />
         <Route path="/rolex" element={<Rolex getdata={getdata}/>} />
        <Route path="/productitem/:id" element={<ProductItem  getdata={getdata}/>} />
        <Route path="/search/:text" element={<Search />} />
        <Route path="/profile" element={<Profile  getdata={getdata}/>} />
        <Route path="/whitlist" element={<Whitlist getdata={getdata}/>} />
     
      </Routes>
       <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
  </div>
   
  )
}

export default App;