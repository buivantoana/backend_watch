import React, { useEffect, useRef, useState } from "react";
import Homeheader from "./Homeheader";
import "./product.css";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { allbrand, allcategory } from "../redux/reselect";
import CommonUtils from "../ultil/CommonUtils";
import {
  creatproduct,
  deleteproduct,
  getallproduct,
  pagination,
  updateproduct,
} from "../servide/service";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

function Productadmin() {
  const editorRef = useRef(null);
  let getbrand = useSelector(allbrand);
  let getcategory = useSelector(allcategory);
  let [name, setname] = useState("");
  let [price, setprice] = useState(0);
  let [brand, setbrand] = useState("");
  let [category, setcategory] = useState("");
  let [type, settype] = useState("");
  let [image, setimage] = useState("");
  let [des, setdes] = useState("");
  let [product, setproduct] = useState([]);
  let [page, setpage] = useState(1);
  let [total, settotal] = useState(0);
  const [lists, setlists] = useState([]);
  const [limit, setlimit] = useState(0);
  const [check, setcheck] = useState(false);
  const [checkid, setid] = useState(0);
  async function getall() {
    let panigation = await pagination(page);

    if (panigation) {
      let totalpage = Math.ceil(panigation.data.total / panigation.data.limit);
      setlimit(panigation.data.limit);
      settotal(totalpage);
      setlists(panigation.data.data);
    }
  }

  useEffect(() => {
    getall();
  }, []);

  const handlePageChange = async (id) => {
    setpage(id);
    let panigation = await pagination(id);
    if (panigation) {
      setlimit(panigation.data.data.length);
      setlists(panigation.data.data);
    }
  };

  const handlechangeimage = async (e) => {
    let files = e.target.files;

    let file = files[0];

    if (file) {
      setimage(await CommonUtils.getBase64(file));
    }
  };

  const checkvalidate = () => {
    if (editorRef.current) {
      setdes(editorRef.current.getContent());
    }
    let isvalids = true;
    let arrcheck = [name, price, brand, category, type, des, image];
    for (let i = 0; i < arrcheck.length; i++) {
      if (!arrcheck[i]) {
        isvalids = false;
        toast.error("Bạn cần nhập đầy đủ thông tin");
        break;
      }
    }
    return isvalids;
  };
  const hanldecreat = async () => {
    if (checkvalidate() === true) {
      let res = await creatproduct({
        productname: name,
        price: price,
        brand_id: brand,
        category_id: category,
        type: type,
        productdes: des,
        image: image,
      });
      if (res && res.data.mesasge === 1) {
        getall();
        toast.error("Sản phẩm đã có");
      } else {
        toast.success("Thêm Sản phẩm thành công");
      }
    }
  };

  const handleupdate = async (id) => {
    setcheck(!check);
    lists.map((item) => {
      if (item.id === id) {
        setname(item.productname);
        setbrand(item.brand_id);
        setcategory(item.category_id);
        setdes(item.productdes);
        settype(item.type);
        setprice(item.price);
        setid(id);
      }
    });
  };

  const handleclikupdate = async () => {
    let res = await updateproduct({
      id: checkid,
      productname: name,
      price: price,
      brand_id: brand,
      category_id: category,
      type: type,
      productdes: des,
      image: image,
    });
    if (res && res.data.mesasge === 0) {
      getall();
      setcheck(!check);
      toast.success("Bạn đã sửa sản phẩm thành công");
    } else {
      toast.error("Sửa sản phẩm thất bại");
    }
  };
  const handledeleteproduct = async (id) => {
    let res = await deleteproduct({ id: id });
    if (res && res.data.mesasge === 0) {
      getall();
      toast.success("Bạn đã xóa sản phẩm thành công");
    } else {
      toast.error("Xóa sản phẩm thất bại");
    }
  };
  return (
    <div className='productadmin'>
      <Homeheader />
      <div className='container-admin-flex'>
        <div className='container-admin'>
          <label for='fname'>Product Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder='Your name..'
          />

          <label for='lname'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setprice(e.target.value)}
            placeholder='Your last name..'
          />
          <br></br>
          <label for='fname'>Category</label>
          <select
            id='country'
            value={category}
            onChange={(e) => setcategory(e.target.value)}>
            <option value='0'>...</option>
            {getcategory &&
              getcategory.length &&
              getcategory.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.categoryname}
                  </option>
                );
              })}
          </select>

          <label for='lname'>Brand</label>
          <select
            id='country'
            value={brand}
            onChange={(e) => setbrand(e.target.value)}>
            <option value='0'>...</option>
            {getbrand &&
              getbrand.length &&
              getbrand.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.brandname}
                  </option>
                );
              })}
          </select>
          <br></br>

          <label for='country'>Type</label>
          <select
            id='country'
            value={type}
            onChange={(e) => settype(e.target.value)}>
            <option value='0'>...</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
          <label for='country'>Image</label>
          <input type='file' onChange={(e) => handlechangeimage(e)} />
          <br></br>

          <Editor
            apiKey='your-api-key'
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={des}
            init={{
              height: 500,
              selector: "textarea local-picer",
              menubar: true,
              plugins: [
                "textcolor",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "insertdatetime",
                "media",
                "emoticons",
                "table",
              ],
              toolbar:
                " casechange blocks bold italic textcolor emoticons alignleft aligncenter alignright alignjustify  bullist numlist checklist  image media | undo redo  ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              image_title: true,
              automatic_uploads: true,
              file_picker_types: "image",
              /* and here's our custom image picker*/
            }}
          />
          {check ? (
            <button
              style={{
                background: "orange",
                width: "200px",
                height: "50px",
                border: "none",
              }}
              onClick={handleclikupdate}>
              Update
            </button>
          ) : (
            <input type='submit' onClick={hanldecreat} />
          )}
        </div>
        <table id='customers'>
          <tr>
            <th>id</th>
            <th>ProductName</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>

          {lists &&
            lists.length &&
            lists.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productname}</td>
                  <td>{item.price}</td>
                  <td>
                    <img src={item.image} width='50px' height='50px' alt='' />
                  </td>
                  <td>
                    <button onClick={() => handleupdate(item.id)}>Sửa</button>{" "}
                    <button onClick={() => handledeleteproduct(item.id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
      <ReactPaginate
        pageCount={total}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={(data) => handlePageChange(data.selected + 1)}
        containerClassName={"pagination"}
        activeClassName={"actives"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
      />
    </div>
  );
}

export default Productadmin;
