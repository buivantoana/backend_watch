import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./wraper.css"
function Wraper() {

    useEffect(() => {
        let list1 = document.querySelector(".wraper-list1")
        let list2 = document.querySelector(".wraper-list2")
        let list3 = document.querySelector(".wraper-list3")
        let list4 = document.querySelector(".wraper-list4")
        let list5 = document.querySelector(".wraper-list5");
        let showlist = document.querySelectorAll(".show-wraper")
        let arrlist = [list1, list2, list3, list4, list5];
        arrlist.forEach((item,index) => {
            item.addEventListener("mousemove", function (e) {
                showlist.forEach((ite, inx) => {
                    if (index === inx) {
                        ite.classList.remove("hide")
                        let y = e.offsetY;
                        let x = e.offsetX;
                       
                         ite.style.cssText = `
                         top:${y}px;
                         left:${x}px`
                        item.addEventListener("mouseleave", function () {
                            ite.style = ""
                            ite.classList.add("hide")
                        })
                    }
                })

                
	

            })
        })
    })
    return (
        <div className='wraper'>
            <div className="wraper-list">
                
                <div className="wraper-list1">
                    <Link to="/donghoco"><h2 className=''>ĐỒNG HỒ CƠ</h2></Link>
                    <div className="tab"></div>
                <div className="result1 hide  show-wraper"></div>
            </div>
            <div className="wraper-list2">
                <Link to="/hublot"><h2 className=''>ĐỒNG HỒ HUBLOT</h2></Link>
                <div className="tab"></div>
                 <div className="result2 hide  show-wraper"></div>
            </div>
            </div>
            <div className="wraper-list">
                <div className="wraper-list3">
                <Link to="/rolex"><h2 className=''>ĐỒNG HỒ ROLEX</h2></Link>
                <div className="tab"></div>
                        <div className="result3 hide  show-wraper"></div>
                </div>
                <div className="wraper-list4">
                   <Link to="/donghodayda"> <h2 className=''>ĐỒNG HỒ DÂY DA</h2></Link>
                    <div className="tab"></div>
                                        <div className="result4 hide  show-wraper"></div>
                </div>
            </div>
            <div className="wraper-list">
                <div className="wraper-list5">
                <Link to="/donghodaykimloai"><h2 className=''>ĐỒNG HỒ DÂY KIM LOẠI</h2></Link>
                <div className="tab"></div>
                        <div className="result5 hide  show-wraper"></div>
                </div>
           </div>
        </div>
    );
}

export default Wraper;