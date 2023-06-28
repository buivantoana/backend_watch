import React, { useEffect, useState } from 'react';
import "../header/cart.css"
import { Link } from 'react-router-dom';
import { getalltypeproduct, getcountproduct } from '../servide/service';
import { Range } from 'react-range';
import "./productleft.css"


function Productcontainerleft({ check,loc, toggle }) {
   
      const [values, setValues] = useState([50, 100]);
  const [list, setlist] = useState(true);
  const [count, setcount] = useState({});
  

  const handleRangeChange = (values) => {
    setValues(values);
  }
  
   const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
  };
  
  let money1 = ((values[0] / 100) * 3000000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  let money2 = ((values[1] / 100) * 3000000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  
  
 
   
  
 
 const [page,setpage] = useState(1)
   
 
  
    
    


  
 
async function getall() {
  
  let count = await getcountproduct();

 
  if (count) {
   
   
           
        setcount(count.data.data)
      
      }
    }
  useEffect(() => {
    
    getall();
   
  }, [])

 
    const handleloc = async () => {
      
    toggle()
       loc((values[0] / 100) * 3000000,(values[1] / 100) * 3000000)
       

   
  }
  
  
  

  
    return (
        
        <div className={`cart ${check ? "visible" : "hidden"}`}>
            <div className={check?"cart-right":"cart-rights"}>
                <div className="cart-right-close">
                    <i onClick={toggle} className="fa-solid fa-xmark"></i>
                    
                </div>
                 <div className="product-container-left">
                <div className="product-bg">
                <div className="product-container-category">
                    <div className="product-container-category-item">
                        <h3>PRODUCT CATEGORIES</h3>
                        <div className="product-tab1"></div>
                        <ul>
                          <li> <Link to="/donghoco"> ĐỒNG HỒ CƠ  : (<span style={{color:"orange"}}>{count.donghoco}</span>) </Link></li>
                            <li><Link to="/donghodayda">ĐỒNG HỒ DÂY DA : (<span style={{color:"orange"}}>{count.donghodayda}</span>)</Link></li>
                            <li><Link to="/donghodaykimloai">ĐỒNG HỒ DÂY KIM LOẠI : (<span style={{color:"orange"}}>{count.donghodaykimloai}</span>)</Link></li>
                            <li><Link to="/hublot">HUBLOT : (<span style={{color:"orange"}}>{count.hublot}</span>)</Link></li>
                            <li><Link to="/rolex">ROLEX : (<span style={{color:"orange"}}>{count.rolex}</span>)</Link></li>
                           
                        </ul>
                    </div>
                </div>

                </div>
                <div className="product-bg">
                <div className="product-container-filter">
                     <div className="product-container-category-item">
                        <h3>FILTER BY PRICE</h3>
                            <div className="product-tab1"></div>
                            <div className="product-filter">
                                <div className="product-tab2">
                                     <div style={{ width: '100%', margin: '0 auto' }}>
      <Range
        step={1}
        min={0}
        max={100}
        values={values}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              borderRadius: '3px',
              backgroundColor: 'orange'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '18px',
              width: '18px',
              borderRadius: '9px',
              backgroundColor: index === 0 ? 'orange' : '#dc3545'
            }}
          />
        )}
      />
        <div style={{ marginTop: '20px', fontSize: '16px', color:"gray" }}>
            
                        <span> {money1} </span>- <span> {money2} </span>
                        <button className='loc' onClick={handleloc}>Lọc</button>
      </div>
    </div>
                               </div>
                            </div>
                        
                    </div>
                </div>
                    
                </div>
                <div className="product-bg">
                    
            <div className="product-container-tag">
                 <div className="product-container-category-item">
                        <h3>PRODUCT CATEGORIES</h3>
                        <div className="product-tab1"></div>
                        <ul>
                           <Link to="/donghoco"> <li><span>ĐỒNG HỒ CƠ </span> </li></Link>
                            <Link to="/donghodayda"> <li><span>ĐỒNG HỒ DÂY DA</span>  </li></Link>
                            <Link to="/donghodayimloai"><li><span>ĐỒNG HỒ DÂY KIM LOẠI</span></li></Link>
                           
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Productcontainerleft;