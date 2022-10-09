import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Authorized from "./Authorized";
import DisplayCards from "./Card";

import Login from './Login/Login'; 
import Dashboard from './Login/Dashboard';
import MyReadList from "./Readlist";
import BasicCard from "./Card/Card";
import './App.css';
// import Preferences from '../Preferences/Preferences';

function setToken(reqToken) {
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const token = getToken();
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login setToken={setToken}></Login>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/authorized/:req_token" element={<Authorized />}></Route>
        <Route exact path="/card" element={<DisplayCards />}></Route>
        {/* <Route exact path="/readlist" element={<MyReadList />}></Route> */}
        <Route exact path="/cardDesign" element={<BasicCard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
