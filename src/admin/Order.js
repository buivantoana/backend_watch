import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { deleteorder, getorder, updateorder } from "../servide/service";
import Homeheader from "./Homeheader";
import "./order.css";

function Orderadmin(props) {
  const [lists, setlists] = useState([]);
  const [page, setpage] = useState(1);
  let [total, settotal] = useState(0);

  const [limit, setlimit] = useState(0);
  async function getall() {
    let data = await getorder({ page: page });

    if (data) {
      let totalpage = Math.ceil(data.data.total / data.data.limit);
      setlists(data.data.data);
      setlimit(data.data.limit);
      settotal(totalpage);
    }
  }

  useEffect(() => {
    getall();
  }, []);
  const handlePageChange = async (id) => {
    setpage(id);
    let panigation = await getorder({ page: id });
    if (panigation) {
      setlimit(panigation.data.data.length);
      setlists(panigation.data.data);
    }
  };

  const handlevanchuyen = async (id) => {
    let res = await updateorder({ id: id, status: 1 });
    if (res && res.data.mesasge === 0) {
      getall();
      toast.success("Bạn đã chuyển trạng thái vận chuyển thành công");
    } else {
      toast.error("Bạn đã chuyển trạng thái vận chuyển thất bại");
    }
  };
  const handledagiao = async (id) => {
    let res = await updateorder({ id: id, status: 2 });
    if (res && res.data.mesasge === 0) {
      getall();
      toast.success("Bạn đã chuyển trạng thái đã giao thành công");
    } else {
      toast.error("Bạn đã chuyển trạng thái đã giao thất bại");
    }
  };

  const handledelete = async (id) => {
    let res = await deleteorder({ id });
    if (res.data.mesasge === 0) {
      getall();
      toast.success("Bạn đã xóa đơn hàng thành công");
    } else {
      toast.error("Bạn đã xóa đơn hàng thất bại");
    }
  };
  return (
    <div>
      <Homeheader />
      <div className='order-container-admin'>
        <h2>Danh sách đơn hàng</h2>
        <table id='customers'>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Productname</th>
            <th>image</th>
            <th>Price</th>
            <th>Status</th>

            <th>Action</th>
          </tr>

          {lists &&
            lists.length &&
            lists.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.address}</td>
                  <td>0{item.phone}</td>
                  <td>{item.productname}</td>

                  <td>
                    <img src={item.image} width='50px' height='50px' alt='' />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
                  <td style={{ display: "flex" }}>
                    {item.status === 1 || item.status === 2 ? (
                      <button
                        style={
                          item.status === 2 ? { background: "orange" } : {}
                        }
                        onClick={() => handledagiao(item.id)}>
                        Đã Giao
                      </button>
                    ) : (
                      <button onClick={() => handlevanchuyen(item.id)}>
                        Đang vận chuyển
                      </button>
                    )}
                    <button onClick={() => handledelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </table>
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
    </div>
  );
}

export default Orderadmin;
