const express = require("express");
const recordRoutes = express.Router();
const path = require('path');
const axios = require("axios");
// app.use(express.static(path.join(__dirname, 'public')))

var req_tok;
recordRoutes.route('/').get((req, res) => {
    console.log("I've been called");
    async function callIt(){
        const resp = await axios.post('https://getpocket.com/v3/oauth/request?consumer_key=102894-ac9c50b12080d1f4d69a0de&redirect_uri=localhost/5000', {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "X-Accept": "application/json",
            },
        }).catch((err) => {
            console.log(err);
        })
        req_tok = resp.data.slice(5);
    }
    async function caller(){
        await callIt();
        res.send({
            "request_token": req_tok,
        })
    }
    caller();
    // callIt(); 
});

recordRoutes.route('/redirect').get((req, res) => {
    let userName;
    let access_tok;
    let reqToken = req.query.req_token;
    console.log("Who called me?");
    console.log(reqToken);
    async function callIt(){
        await axios.post(`https://getpocket.com/v3/oauth/authorize?consumer_key=102894-ac9c50b12080d1f4d69a0de&code=${reqToken}`, {}, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "X-Accept": "application/json",
            },
        }).catch((err) => {
            console.log(err);
        })
        .then(response => {
            console.log("Here Here");
            console.log(response.data);
            userName = response.data.username;
            access_tok = response.data.access_token;
        });
    }
    async function caller(){
        await callIt();
        // res.redirect(`/retrieve?access_token=${access_tok}&username=${userName}`)
        res.send(
            {
                "access_token": access_tok,
                "username": userName,
            }
        );
    }
    caller();
})

recordRoutes.route('/retrieve').get((req, res) => {
    let access_tok = req.query.access_token;
    let username = req.query.username;
    console.log(access_tok);
    console.log(username);
    console.log("Baby I'm here");
    async function retrieve(){
        await axios.post(`https://getpocket.com/v3/get?consumer_key=102894-ac9c50b12080d1f4d69a0de&access_token=${access_tok}&count=10`, {}, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "X-Accept": "application/json",
            },
        }).catch((err) => {
            console.log(err);
        })
        .then(response => {
            res.send(response.data);
        });
    }
    retrieve();
})

module.exports = recordRoutes;
