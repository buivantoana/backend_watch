import React, { useEffect, useState } from 'react';
import { creatdetail, getalldetail, getallproduct } from '../servide/service';
import CommonUtils from '../ultil/CommonUtils';
import Homeheader from './Homeheader';

function Derail() {
    let [product, setproduct] = useState([]);
    let [image, setimage] = useState([])
     let [name,setname]  = useState('')
      let [detail,setdetail]  = useState([])
    useEffect(() => {
         async function getall() {
             let data = await getallproduct({type:"all"});
             let res = await getalldetail({type:"all"})
             setdetail(res.data.data)
            setproduct(data.data.data);

        }
        getall()
    }, [])
    
     const handlechangeimage = async (e) => {
        let files = e.target.files;
         for (let i = 0; i < files.length; i++){
             let data = await CommonUtils.getBase64(files[i])
             setimage(prev => [...prev,data ]
            )
         }
        
        
    }
    const handlename = (e) => {
         setname(e.target.value)
    }
    
    const handlesave =  () => {
        image.map(async(item) => {
           return  await creatdetail({
               id: name,
               image:item
       })
        })
       
    }
    return (
        <div className='productadmin'>
            <Homeheader />
            <div  className='container-admin'>
                <label >ProductName</label>
                <select  onChange={handlename}>
                    <option value="0"></option>
                    {product && product.length && product.map(item => {
                        return <option key={item.id} value={item.id}>{ item.productname}</option>
                    })}
   
    </select>
    <label >ImageDetail</label>
    <input type="file" onChange={handlechangeimage} multiple/>

    <button   onClick={handlesave} >Save</button>
  </div>
             <table id="customers">
  <tr>
    <th>id</th>
    <th>Produc_id</th>
    
                    <th>Image</th>
                     <th>Action</th>
    
  </tr>
                
                    {detail && detail.length && detail.map(item => {
                        return <tr>
                            <td>{ item.id}</td>
                                     <td>{ item.product_id}</td>
                                    
                                     <td><img src={item.image} width="50px" height="50px" alt="" /></td>
                                <td><button>Sửa</button> <button>Xóa</button></td>
                              </tr>
                    })}
    

 
</table>
          
        </div>
    );
}

export default Derail;