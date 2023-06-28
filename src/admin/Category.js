import React, { useEffect, useState } from 'react';
import { category, categoryall, categoryfix, categoryupdate ,categorydestroy} from '../servide/service';
import Homeheader from './Homeheader';
import "./category.css"
import { check } from '../redux/action';

function Category(props) {
    let [name, setname] = useState("");
    let [categoryitem, setcategory] = useState([]);
    let [toggle, settoggle] = useState(false);
    let [idcategory, setidcategory] = useState(0);
     async  function getall() {
          let data = await categoryall();
          if (data) {
                setcategory(data.data.data)
            }
        }
    useEffect(() => {
     
        getall()
    },[toggle])
    const handleclick = async () => {
        if (toggle === false) {
            let res = await category({ category: name });
            settoggle(!toggle)
        } else {
            let res = await categoryupdate({
                category: name,
                id:idcategory
            })
            settoggle(!toggle)
        }
    }
  
    const hanldefix =async (id) => {
        let data = await categoryfix({ id: id });
        setidcategory(id)
        
        setname(data.data.data.categoryname);
        settoggle(!toggle)
    }

    const hanldedestroy = async(id) => {
        let res = await categorydestroy({ id: id });
        if (res) {
            getall()
        }
    }
    return (
        <div className='category'>
            <Homeheader />
            <div>
    <label for="fname">CategoryName</label>
    <input type="text" id="fname" value={name} onChange={(e)=>setname(e.target.value)}  placeholder="Your name.."/>

    <input type="submit" onClick={handleclick} style={toggle?{background:"orange"}:{}}  value="Submit"/>
  </div>
            
            <table>
 
    <tr>
      <th >Id</th>
     <th >CategoryName</th>
     <th >Action</th>
    </tr>
  
               
                    {categoryitem && categoryitem.length && categoryitem.map(item => {
                        return  <tr key={item.id}>
                            <th scope="row">{ item.id}</th>
                            <td>{item.categoryname}</td>
                            <td><button type="button" onClick={()=>hanldefix(item.id)} >Sửa</button><button type="button" onClick={()=>hanldedestroy(item.id)}>Xóa</button></td>
                                 </tr>
                    })}
   
   
 
</table>
        </div>
    );
}

export default Category;