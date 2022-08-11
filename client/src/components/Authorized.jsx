import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

export default function Authorized() {
    const navigate = useNavigate();
    let { req_token } = useParams();
    // console.log("Here");
    const [obj, setObj] = useState({
        "access_token": 0,
        "username": 0,
    });
    const [username, setUsername] = useState("");
    const [url, setUrl] = useState("");

    async function getAccess(){
        await fetch(`http://localhost:5000/redirect?req_token=${req_token}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setObj(data);
        })
        // await getArticles();
    }

    async function wait(){
        await getAccess();
        // await getArticles();
    }

    useEffect(() => {
        wait();
    }, []);
    navigate(`/card`, {state: obj});
}
