import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

export default function Authorized() {
    let { req_token } = useParams();
    // console.log("Here");
    const [accessToken, setAccessToken] = useState("");
    const [username, setUsername] = useState("");
    const [url, setUrl] = useState("");

    async function getArticles(){
        console.log("Getting articles");
        console.log(url);
        await fetch(url)
        .then(response => console.log(response.data));
    } 

    async function getAccess(){
        await fetch(`http://localhost:5000/redirect?req_token=${req_token}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetch(`http://localhost:5000/retrieve?access_token=${data.access_token}&username=${data.username}`)
            .then(response => response.json())
            .then(data => {
                const a = document.createElement("a");
                data = JSON.stringify(data);
		        const file = new Blob([data], {type: "application/json"});
                a.href = URL.createObjectURL(file);
                a.download = "test.json";
                a.click();
            });
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

    return (
        <div>
            <h1>You've been authorized</h1>
        </div>
      );
}
