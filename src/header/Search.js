import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./search.css"
function Search({ toggle, check }) {
    let [value, setvalue] = useState('');
    let history = useNavigate()
    const handlesearch = () => {
        history(`/search/${value}`)
    }
    return (
        <div className={`modalsearch ${check ? "visible" : "hidden"}`}>
            <div className={check?"modal":"modals"}>
                <div className="modal-close">
                    <div onClick={toggle} className="close">
                    <i className="fa-solid fa-xmark"></i>
                    </div>
                    <h3>WHAT ARE YOU LOOKING FOR?</h3>
                    <input value={value} onChange={(e)=>setvalue(e.target.value)} type="text" placeholder='SEARCH PRODUCTS' />
                    <button disabled={!value} style={!value?{background:"gray"}:{}} onClick={handlesearch}>SEARCH</button>

                </div>
            </div>
             
        </div>
    );
}

export default Search;