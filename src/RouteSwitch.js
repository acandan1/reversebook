import React, { useEffect, useState } from "react";
import {  BrowserRouter, Routes, Route } from "react-router-dom";

import { Navigate } from "react-router-dom";

import './style/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ScrollToTop from "./Components/ScrollToTop";

import Home from "./Apps/Home";
import Signup from "./Apps/Signup";
import Signin from "./Apps/Signin";
import DisplayPost from "./Apps/DisplayPost";
import UserProfile from "./Apps/UserProfile";
import Friends from "./Apps/Friends";

const RouteSwitch = () => {
    const [bool, setBool] = useState(false);

    const changeBool = () => {
        setBool(true);
    }

    const checkAuthentication = () => {
        if (localStorage.getItem('token') || bool) {
            return true;
        }
        return false
    }
    
        return (
        <BrowserRouter basename="/odin-facebook">
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={ checkAuthentication() ? <Home/> : <Navigate to='/sign-in' /> }></Route>
                <Route path="/sign-up" element = { <Signup/> }></Route>
                <Route path="/sign-in" element = {<Signin changeBool={changeBool}/>}></Route>
                <Route path="/post/:id" element={checkAuthentication() ? <DisplayPost/> : <Navigate to={`/sign-in`} replace={true}/>}></Route>
                <Route path="/user/:id" element={checkAuthentication() ? <UserProfile/> : <Navigate to={`/sign-in`} replace={true}/>}></Route>
                <Route path="/friends" element={checkAuthentication() ? <Friends/> : <Navigate to={`/sign-in`} replace={true}/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;