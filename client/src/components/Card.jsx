import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import MetaTags from 'react-meta-tags';
import "./Card.css"

const jsonData = require("./test.json");

var sortedJSONData = [];
var length = 0;
let weight = 30;

// Online Merge Sort
// This function should only be called when the user joins for the first time

function merge(start, mid, end){
    let arr = sortedJSONData;
    const merged = [];
    let i = start;
    let j = mid+1;
    while (i<mid+1 && j<end+1){
        if (arr[i].time<=arr[j].time){
            merged.push(arr[i]);
            i++;
        } else{
            merged.push(arr[j]);
            j++;
        }
    }
    while (i<mid+1){
        merged.push(arr[i]);
		i++;
    }
    while (j<end+1){
        merged.push(arr[j]);
		j++;
    }
    for (let k=start; k<end+1; k++){
        if (k>=length){
            sortedJSONData.push(merged[k-start]);
        } else{
            arr[k] = merged[k-start];
        }
    }
}

function MergeSort(start, end){
    let mid = Math.floor(start+(end-start)/2);
    // Divide up the array
	if (mid-start+1>1){
        MergeSort(start, mid);
    }
    if (end-mid+1>1){
        MergeSort(mid+1, end);
    }
    merge(start, mid, end);
}

function sortArticles(){
    // Build the time array
    let time;
    let id;
    for (const prop in jsonData["list"]){
        time = jsonData["list"][prop]["time_to_read"];
        id = jsonData["list"][prop]["item_id"];
        if (time){
            let obj = {
                "time": time,
                "id": id,
            }
            sortedJSONData.push(obj);
            length++;
        }
    }
    // console.log(sortedJSONData);
    MergeSort(0, length-1);
    // console.log(sortedJSONData);
}

function mergeNewBatch(newBatch, batchLength){
    MergeSort(newBatch, batchLength);
    merge(sortedJSONData, newBatch);
}

function Card(props){
    // Card has properties such as
        // resolved_url
        // resolved_title
        // image
        // Link to original article
        // Link to read on Pocket
        // Domain Metadata
    // Expected return structure
    // Like Pocket, Image -> Title with Original URL -> Name of provider -> Time to read -> Link to pocket
    return(
        <div className="card grid-item">
            <div className="img">
                <img src={props.image}></img>
            </div>
            <div className="title">
                <a href={props.resolved_url}>{props.resolved_title}</a>
            </div>
            <div className="container">
                <div className="meta">
                    {props.name}
                </div>
                <div className="time">
                    <h2>{props.time}</h2>
                </div>
            </div>
        </div>  
    );
}

function max(a, b){
    if (a>=b){
        return a;
    } else{
        return b;
    }
}

// Most articles and Most Time Utilization
function MostMost(){
    var largest = 0;
    var most = 0;
    let mostmost = [];
    function f(pos, sum, num, weight, arr, temp) {
        if (pos < 0) {
            if (largest < sum) {
                mostmost = [];
                largest = sum;
                most = num;
                mostmost.push(temp);
            } else if (largest === sum) {
                if (num > most) {
                    mostmost = [];
                    most = num;
                    mostmost.push(temp);
                } else if(num===most){
                    mostmost.push(temp);
                }
            }
            return;
        }
        // Could include or not include
        let ttemp = temp.slice();
        if (sum + arr[pos].time <= weight) {
            temp.push(arr[pos]);
            f(pos - 1, sum + arr[pos].time, num + 1, weight, arr, temp);
        }
        f(pos - 1, sum, num, weight, arr, ttemp);
    }
    let temp = [];
    f(length-1, 0, 0, weight, sortedJSONData, temp);
    console.log("MostMost");
    // console.log(mostmost);
    return mostmost;
}

function LeastMost2(){
    var largest = 0;
    var most = 0;
    let leastmost = [];
    function f(pos, sum, num, weight, arr, temp) {
        if (pos < 0) {
            if (largest < sum) {
                leastmost = [];
                largest = sum;
                most = num;
                leastmost.push(temp);
            } else if (largest === sum) {
                if (num < most) {
                    leastmost = [];
                    most = num;
                    leastmost.push(temp);
                } else if(num===most){
                    leastmost.push(temp);
                }
            }
            return;
        }
        // Could include or not include
        let ttemp = temp.slice();
        if (sum + arr[pos].time <= weight) {
            temp.push(arr[pos]);
            f(pos - 1, sum + arr[pos].time, num + 1, weight, arr, temp);
        }
        f(pos - 1, sum, num, weight, arr, ttemp);
    }
    let temp = [];
    f(length-1, 0, 0, weight, sortedJSONData, temp);
    console.log("LeastMost2");
    // console.log(leastmost);
    return leastmost;
}

// var largest = 0;
// var most= 0;

// Most # and Least t
function MostLeast(){
    let sum = 0;
    let t = [];
    for (const time of sortedJSONData){
        if (sum+time.time<weight){
            t.push(time);
            sum+=time.time;
        } else{
            break;
        }
    }
    console.log("NullLeast");
    // console.log(t);
    return t;
}

function LeastMost(){
    let sum = 0;
    let t = [];
    for (let i=length-1; i>=0; i--){
        if (sum+sortedJSONData[i].time<weight){
            t.push(sortedJSONData[i]);
            sum+=sortedJSONData[i].time;
        } else{
            break;
        }
    }
    console.log("LeastMost");
    // console.log(t);
    return t;
}

function NullMost(){
    var weights = [];
    let time;
    let id;
    for (const prop in jsonData["list"]){
        time = jsonData["list"][prop]["time_to_read"];
        id = jsonData["list"][prop]["item_id"];
        if (time!=null){
            let obj = {
                "time": time,
                "id": id,
            }
            weights.push(obj);
        }
    }
    let len = weights.length;
    var dp = new Array(len+1).fill(null).map(() => Array(weight+1).fill(0));
    // console.table(dp);
    for (let i=1; i<len+1; i++){
        for (let j=1; j<weight+1; j++){
            if (j>=weights[i-1].time){
                dp[i][j] = max(dp[i-1][j], weights[i-1].time+dp[i-1][j-weights[i-1].time]);
            } else{
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    // Backtrack now

    let list = [];
    function BackTrack(i, j, pos){
        if (i<1 || j<1){
            list.push(pos);
            return;
        }
        let temp = pos.slice();
        if (j>=weights[i-1].time){
            if (dp[i-1][j]>weights[i-1].time+dp[i-1][j-weights[i-1].time]){
                BackTrack(i-1, j, temp);
            } else if (dp[i-1][j]===weights[i-1].time+dp[i-1][j-weights[i-1].time]){
                let temp2 = temp.slice();
                BackTrack(i-1, j, temp);
                temp2.push(weights[i-1]);
                BackTrack(i-1, j-weights[i-1].time, temp2);
            }else{
                temp.push(weights[i-1]);
                BackTrack(i-1, j-weights[i-1].time, temp);
            }
        } else{
            BackTrack(i-1, j, temp);
        }
    }
    let i = len;
    let j = weight;
    BackTrack(i, j, []);
    console.log("NullMost");
    // console.log(list);
    // console.log(pos);
    // console.log(ws);
    // console.log(dp[len][weight]);
    return list;
}

function MostNull(){
    var weights = [];
    let time;
    let id;
    for (const prop in jsonData["list"]){
        time = jsonData["list"][prop]["time_to_read"];
        id = jsonData["list"][prop]["item_id"];
        if (time!=null){
            let obj = {
                "time": time,
                "id": id,
            }
            weights.push(obj);
        }
    }
    // console.log(weights);
    // Either take or don't take
    // Find the max
    // Every article has unit value
    let len = weights.length;
    var dp = new Array(len+1).fill(null).map(() => Array(weight+1).fill(0));
    // console.table(dp);
    for (let i=1; i<len+1; i++){
        for (let j=1; j<weight+1; j++){
            if (j>=weights[i-1].time){
                dp[i][j] = max(dp[i-1][j], 1+dp[i-1][j-weights[i-1].time]);
            } else{
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    // Backtrack now
    let list = [];
    function BackTrack(i, j, pos){
        if (i<1 || j<1){
            list.push(pos);
            return;
        }
        let temp = pos.slice();
        if (j>=weights[i-1].time){
            if (dp[i-1][j]>1+dp[i-1][j-weights[i-1].time]){
                BackTrack(i-1, j, temp);
            } else if (dp[i-1][j]===1+dp[i-1][j-weights[i-1].time]){
                let temp2 = temp.slice();
                BackTrack(i-1, j, temp);
                temp2.push(weights[i-1]);
                BackTrack(i-1, j-weights[i-1].time, temp2);
            }else{
                temp.push(weights[i-1]);
                BackTrack(i-1, j-weights[i-1].time, temp);
            }
        } else{
            BackTrack(i-1, j, temp);
        }
    }
    let i = len;
    let j = weight;
    BackTrack(i, j, []);
    console.log("MostNull");
    // console.log(list);
    return list;
}

function DisplayCards(){

    useEffect(()=>{
        sortArticles();
        // console.log();
    }, [])

    const [cards, setCards] = useState([]);
    const [dc, setDC] = useState([]);
    const [dl, setDL] = useState([]);
    const [total, setTotal] = useState(0);
    const [read, setRead] = useState(false);
    const [numArticles, setNumArticles] = useState(0);
    let resolved_url;
    let resolved_title;
    let image;
    let item_id;
    let timeToRead;
    let newCard;
    let allCards = [];
    const addObjectToArray = card => {
        setCards(current => [...current, card]);
    };
    
    function reader(){
        for (const property in jsonData["list"]) {
            resolved_url = jsonData["list"][property]["resolved_url"]
            resolved_title = jsonData["list"][property]["resolved_title"]
            image = jsonData["list"][property]["top_image_url"]
            item_id = jsonData["list"][property]["item_id"]
            timeToRead = jsonData["list"][property]["time_to_read"]
            newCard = {
                "resolved_url": resolved_url,
                "resolved_title": resolved_title,
                "image": image,
                "name": "Yash",
                "time": timeToRead,
                "item_id": item_id,
            }
            cards.push(newCard);
        }
        setRead(true);
    }

    function LeastMostClicked(){
        setDL([]);
        setDC([]);
        let res = LeastMost();
        res.forEach((item) => {
            setDC((prev) => {
                return [...prev, ...cards.filter((card)=>{
                    return card.item_id===item.id;
                })];
            });
        })
    }

    function MostLeastClicked(){
        setDL([]);
        setDC([]);
        let res = MostLeast();
        res.forEach((item) => {
            setDC((prev) => {
                return [...prev, ...cards.filter((card)=>{
                    return card.item_id===item.id;
                })];
            });
        })
    }

    function MostMostClicked(){
        setDL([]);
        let res = MostMost();
        res.forEach((item) => {
            setDL((prev) => {
                return [...prev, item];
            });
        })
    }

    function LeastMost2Clicked(){
        setDL([]);
        let res = LeastMost2();
        res.forEach((item) => {
            setDL((prev) => {
                return [...prev, item];
            });
        })
    }

    function MostNullClicked(){
        setDL([]);
        let res = MostNull();
        res.forEach((item) => {
            setDL((prev) => {
                return [...prev, item];
            });
        })
    }

    function NullMostClicked(){
        setDL([]);
        let res = NullMost();
        res.forEach((item) => {
            setDL((prev) => {
                return [...prev, item];
            });
        })
    }

    function justDoIt(list){
        setDC([]);
        // console.log(list);
        list.forEach((item) => {
            setDC((prev) => {
                return [...prev, ...cards.filter((card)=>{
                    return card.item_id===item.id;
                })];
            });
        })
    }

    function multiList(){
        return dl.map((list, index) => {
            return (
                <button className="btn" onClick={event => justDoIt(list)}>{index}</button>
            )
        })
    }

    function justCountIt(){
        let sum = 0;
        let l = 0;
        for (const time in dc){
            l+=1;
            sum+=dc[time].time;
        }
        setTotal(sum);
        setNumArticles(l);
    }

    useEffect(() => {
        justCountIt();
    }, [dc]);

    function cardList(){
        return dc.map((card) => {
            return (
              <Card
                resolved_title={card.resolved_title}
                resolved_url={card.resolved_url}
                image={card.image}
                time={card.time}
                name={card.name}
              />
            );
          });
    };

    return (
        <div>
            <MetaTags>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lato&display=swap" rel="stylesheet"></link>
            </MetaTags>
            <div className="main">
                <div>
                    {read===false?reader():null}
                    <button className="btn" onClick={LeastMostClicked}>LeastMost</button>
                    <button className="btn" onClick={MostLeastClicked}>MostLeast</button>
                    <button className="btn" onClick={MostMostClicked}>MostMost</button>
                    <button className="btn" onClick={MostNullClicked}>MostNull</button>
                    <button className="btn" onClick={NullMostClicked}>NullMost</button>
                    <button className="btn" onClick={LeastMost2Clicked}>LeastMost2</button>
                    <p>{`Total: ${total}`}</p>
                    <p>{`Num: ${numArticles}`}</p>
                    {multiList()}
                    {cardList()}
                </div>
            </div>
        </div>
    );
}

export default DisplayCards;
