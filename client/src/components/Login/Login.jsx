import React from 'react';
import { useState,useEffect } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import ArticleList from "../Articles";
import { useNavigate } from "react-router";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

async function loginUser(credentials) {
  return 1;
 }

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
	e.preventDefault();
	window.location.replace(`${url}`);
  }

  console.log(username);
  console.log(password);

  const [reqToken, setReqToken] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    async function Retrieve(){
        await fetch(`http://localhost:5000/`)
        .then(response => response.json())
        .then(data => {
            setReqToken(data.request_token);
            return data.request_token;
        }).then(token => {
            const url = `https://getpocket.com/auth/authorize?request_token=${token}&redirect_uri=http://localhost:3000/authorized/${token}`;
            setUrl(url);
  			sessionStorage.setItem('token', JSON.stringify(token));
		})
    }
    async function Redirect(){
        await Retrieve();
        console.log(reqToken);
        console.log(url);
    }
    useEffect(()=>{
        // do stuff here...
        Redirect();
    }, [])

	if (url===""){
		return(
			<div className='login-wrapper bg'>
			  <div className='login-title'><h1 style={{marginBottom: 0, textAlign: "center", fontSize: "xxx-large"}}>Chronos</h1><h5 style={{marginTop: 0, textAlign: "center"}}>The Time Keeper</h5></div>
			  <form onSubmit={handleSubmit} className='login-form'>
				  <button className="button" type="submit">Hang on</button>
			  </form>
			</div>
		)
	} else {
		return(
			<div className='login-wrapper bg'>
			  <div className='login-title'><h1 style={{marginBottom: 0, textAlign: "center", fontSize: "xxx-large"}}>Chronos</h1><h5 style={{marginTop: 0, textAlign: "center"}}>The Time Keeper</h5></div>
			  <form onSubmit={handleSubmit} className='login-form'>
				  <button type="submit" className="button">Authenticate</button>
			  </form>
			</div>
		)
	}
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
