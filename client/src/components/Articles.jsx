import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function ArticleList() {
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
    if (url!==""){
        return (
            <div>
                <h1>Hello World</h1>
                <a href={url}>Authenticate</a>
            </div>
        );
    } else{
        return (
            <div>
                <h1>Hang on while we authenticate you</h1>
            </div>
        )
    }
}
