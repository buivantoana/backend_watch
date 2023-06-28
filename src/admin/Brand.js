import React, { useEffect, useState } from 'react';
import {brand,
    brandall,
    brandfix,
    brandupdate,
    branddestroy } from '../servide/service';
import Homeheader from './Homeheader';
import "./category.css"
import { check } from '../redux/action';

function Brand(props) {
    let [name, setname] = useState("");
    let [branditem, setbrand] = useState([]);
    let [toggle, settoggle] = useState(false);
    let [idbrand, setidbrand] = useState(0);
     async  function getall() {
          let data = await brandall();
          if (data) {
                setbrand(data.data.data)
            }
        }
    useEffect(() => {
     
        getall()
    },[toggle])
    const handleclick = async () => {
        if (toggle === false) {
            let res = await brand({ brand: name });
            settoggle(!toggle)
        } else {
            let res = await brandupdate({
                brand: name,
                id:idbrand
            })
            settoggle(!toggle)
        }
    }
  
    const hanldefix =async (id) => {
        let data = await brandfix({ id: id });
        setidbrand(id)
        
        setname(data.data.data.brandname);
        settoggle(!toggle)
    }

    const hanldedestroy = async(id) => {
        let res = await branddestroy({ id: id });
        if (res) {
            getall()
        }
    }
    return (
        <div className='category'>
            <Homeheader />
            <form >
    <label for="fname">brandName</label>
    <input type="text" id="fname" value={name} onChange={(e)=>setname(e.target.value)}  placeholder="Your name.."/>

    <input type="submit" onClick={handleclick} style={toggle?{background:"orange"}:{}}  value="Submit"/>
  </form>
            
            <table>

    <tr>
      <th >Id</th>
     <th >brandName</th>
     <th >Action</th>
    </tr>
 
                
                    {branditem && branditem.length && branditem.map(item => {
                        return  <tr key={item.id}>
                            <th scope="row">{ item.id}</th>
                            <td>{item.brandname}</td>
                            <td><button type="button" onClick={()=>hanldefix(item.id)} >Sửa</button><button type="button" onClick={()=>hanldedestroy(item.id)}>Xóa</button></td>
                                 </tr>
                    })}
   
   
  
</table>
        </div>
    );
}

export default Brand;