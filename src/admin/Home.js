import React, { useEffect } from 'react';
import "./home.css";
import { useDispatch, useSelector } from 'react-redux';
import { checkadminlogin } from '../redux/reselect';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Link } from "react-router-dom";
import Homeheader from './Homeheader';

function Homeadmin(props) {
    let adminlogin = useSelector(checkadminlogin);
    
    let history = useNavigate()
    useEffect(() => {
        if (adminlogin===false) {
            history("/login")
        }
     },[])

    return (
        <div>
            <Homeheader/>
            
        </div>
    );
}

export default Homeadmin;