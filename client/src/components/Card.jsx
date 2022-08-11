import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useParams } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import "./Card.css"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

function MaxWidthDialog(props) {
  const [dialogCards, setDialogCards] = useState([]);

  const handleClose = () => {
    setDialogCards([]);
    props.setOpen(false);
  };

  function sameTime(timeObj){
    setDialogCards((prev) => {
        return [...prev, ...timeObj[props.time]];
    })
  }

  useEffect(() => {
    if (props.open===true){
        sameTime(props.timeObj);
    }
  }, [props.open]);

  if (props.open===true){
    return (
        <div>
          <Dialog
            fullWidth="false"
            maxWidth="lg"
            modal={true}
            open={true}
            onClose={handleClose}
          >
            <DialogTitle>This is the Title</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Our content
              </DialogContentText>
            <div className="under-test">
                {props.cardList(dialogCards, 'dialog')}
            </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: "scroll",
  };

  const modalStyle = {
    overflow: "scroll",
  };

var length = 0;
let weight = 20;

// Online Merge Sort
// This function should only be called when the user joins for the first time

function merge(start, mid, end, sortedJSONData){
    const merged = [];
    let i = start;
    let j = mid+1;
    // console.log(sortedJSONData);
    while (i<mid+1 && j<end+1){
        if (sortedJSONData[i].time<=sortedJSONData[j].time){
            merged.push(sortedJSONData[i]);
            i++;
        } else{
            merged.push(sortedJSONData[j]);
            j++;
        }
    }
    while (i<mid+1){
        merged.push(sortedJSONData[i]);
		i++;
    }
    while (j<end+1){
        merged.push(sortedJSONData[j]);
		j++;
    }
    for (let k=start; k<end+1; k++){
        if (k>=length){
            sortedJSONData.push(merged[k-start]);
        } else{
            sortedJSONData[k] = merged[k-start];
        }
    }
    return sortedJSONData;
}

function MergeSort(start, end, sortedJSONData){
    let mid = Math.floor(start+(end-start)/2);
    // Divide up the array
	if (mid-start+1>1){
        MergeSort(start, mid, sortedJSONData);
    }
    if (end-mid+1>1){
        MergeSort(mid+1, end, sortedJSONData);
    }
    return merge(start, mid, end, sortedJSONData);
}

function sortArticles(jsonData){
    // Build the time array
    let time;
    let id;
    var sortedJSONData = [];
    // console.log(jsonData);
    if (jsonData!==null){
        for (const prop in jsonData["list"]){
            time = jsonData["list"][prop]["time_to_read"];
            id = jsonData["list"][prop]["item_id"];
            if (time){
                let obj = {
                    "time": time,
                    "item_id": id,
                }
                sortedJSONData.push(obj);
                length++;
            }
        }
        // console.log(sortedJSONData);
        sortedJSONData = MergeSort(0, length-1, sortedJSONData);
        // console.log(sortedJSONData);
        return sortedJSONData;
    }
    return null;
}

// function mergeNewBatch(newBatch, batchLength){
//     MergeSort(newBatch, batchLength);
//     merge(sortedJSONData, newBatch);
// }

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
    if (props.which==="normal"){
        return(
            <div className="card-chronos grid-chronos grid-item-chronos">
                <div className="img">
                    <img src={props.image}></img>
                </div>
                <div className="title">
                    <a href={props.resolved_url}>{props.resolved_title}</a>
                </div>
                <div className="container-chronos">
                    <div className="meta">
                        <h3>{props.name}</h3>
                        <button onClick={event => props.setDialog(props.time)}>More</button>
                    </div>
                    <div className="time">
                        <h2>{props.time}</h2>
                    </div>
                </div>
            </div>  
        );
    } else{
        return(
            <div className="card-chronos grid-chronos grid-item-chronos">
                <div className="img">
                    <img src={props.image}></img>
                </div>
                <div className="title">
                    <a href={props.resolved_url}>{props.resolved_title}</a>
                </div>
                <div className="container-chronos">
                    <div className="meta">
                        <h3>{props.name}</h3>
                    </div>
                    <div className="time">
                        <h2>{props.time}</h2>
                    </div>
                </div>
            </div>  
        );
    }
}

function max(a, b){
    if (a>=b){
        return a;
    } else{
        return b;
    }
}

// Most articles and Most Time Utilization
function MostMost(sortedJSONData){
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

function LeastMost2(sortedJSONData){
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
function MostLeast(sortedJSONData){
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

function LeastMost(sortedJSONData){
    let sum = 0;
    let t = [];
    let flag = 0;
    for (let i=length-1; i>=0; i--){
        if (sum+sortedJSONData[i].time<weight){
            t.push(sortedJSONData[i]);
            sum+=sortedJSONData[i].time;
            flag = 1;
        } else{
            if (flag){
                break;
            }
        }
    }
    console.log("LeastMost");
    console.log(t);
    return t;
}

function NullMost(sortedJSONData){
    var weights = [];
    let time;
    let id;
    for (const prop in sortedJSONData){
        time = sortedJSONData[prop].time;
        id = sortedJSONData[prop].item_id;
        if (time!=null){
            let obj = {
                "time": time,
                "item_id": id,
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

function MostNull(sortedJSONData){
    var weights = [];
    let time;
    let id;
    for (const prop in sortedJSONData){
        time = sortedJSONData[prop].time;
        id = sortedJSONData[prop].item_id;
        if (time!=null){
            let obj = {
                "time": time,
                "item_id": id,
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
    console.log(list);
    return list;
}

function tell(items, keys, pos, weight, nums, times, maxi, numArts, capWeight, capArts){
    if (pos<0 || weight==0){
        if (weight==capWeight){
            console.log(nums);
            console.log(times);
            console.log("\n");
        }
        maxi = Math.max(maxi, numArts);
        return 0;
    }
    let value = keys[pos];
    let maxWeight = items[keys[pos]];
    let prevNums = nums.slice();
    let prevTimes = times.slice();
    for (let i=0; i<=maxWeight; i++){
        if (value*i<=weight){
            nums.push(value);
            times.push(i);
            tell(items, keys, pos-1, weight-value*i, nums, times, maxi, numArts+1*i, capWeight, capArts);
            nums = prevNums.slice();
            times = prevTimes.slice();
        } else{
            break;
        }
    }
}

function pick(items, keys, pos, weight){
    if (pos<0 || weight==0){
        return 0;
    }
    let value = keys[pos];
    let maxWeight = items[keys[pos]];
    let ans = 0;
    for (let i=0; i<=maxWeight; i++){
        if (value*i<=weight){
            ans = Math.max(pick(items, keys, pos-1, weight-value*i));
        } else{
            break;
        }
    }
    return ans;
}

function unboundedKnapsack(sortedJSONData){
    var items = {};
    let time;
    let id;
    let len = 0;
    var nums = [];
    var parNums = [];
    var times = [];
    var maxi = 0;
    for (const prop in sortedJSONData){
        time = sortedJSONData[prop].time;
        id = sortedJSONData[prop].item_id;
        if (time!=null){
            let obj = {
                "time": time,
                "item_id": id,
            }
            if (items.hasOwnProperty(time)){
                items[time]++;
            } else{
                items[time] = 1;
                len++;
            }
        }
    }
    var numArts = 0;
    var table = new Array(len+1).fill(null).map(() => Array(weight+1).fill(0));
    let keys = Object.keys(items);
    keys.map((time, i) => {
        for (let j=1; j<weight+1; j++){
            for (let k=0; k<=items[time]; k++){
                if (j>=time*k){
                    table[i+1][j] = Math.max(table[i+1][j], 1*k+table[i][j-time*k]);
                } else{
                    break;
                }
            }
        }
    });
    function Backtrack(i, j, nums, times){
        if (i==0 || j==0){
            parNums.push(nums.slice());
            return;
        }
        let maxi = 0;
        let maxK = 0;
        for (let k=0; k<=items[keys[i-1]]; k++){
            if (j>=keys[i-1]*k){
                if (1*k+table[i-1][j-keys[i-1]*k]>maxi){
                    // maxK = Math.max(maxK, k);
                    maxi = 1*k+table[i-1][j-keys[i-1]*k];
                }
            } else{
                break;
            }
        }
        for (let k=0; k<=items[keys[i-1]]; k++){
            if (j>=keys[i-1]*k){
                if (1*k+table[i-1][j-keys[i-1]*k]==maxi){
                    if (k!==0){
                        let key = keys[i-1];
                        nums.push({
                            "key": key,
                            "count": k,
                        });
                    }
                    Backtrack(i-1, j-keys[i-1]*k, nums, times);
                    if (k!==0){
                        nums.pop();
                    }
                }
            } else{
                break;
            }
        }
    }
    let i = len;
    let j = weight;
    Backtrack(i, j, nums, times);
    console.table(table);
    console.log(parNums);
    return parNums;
}

function Retrieve(){
    // First make a call to the database to check if the user is present
    // If yes, then get the since, count, offset
    // Then make the request
    // After making the request, certain things will be updated
    // Delete the items not present anymore
    // Update the items present
    // Sort the items to be added by time
    // Merge with items from database

    // If user is not present, fetch the whole Pocket data
    // Note since, count, offset
    // Sort the data as per time
    // Store it under username
}

function DisplayCards(){
    let location = useLocation();
    let access_token = location.state.access_token;
    let username = location.state.username;
    const [cards, setCards] = useState([]);
    const [dc, setDC] = useState([]);
    const [dl, setDL] = useState([]);
    const [total, setTotal] = useState(0);
    const [numArticles, setNumArticles] = useState(0);
    const [timeObj, setTimeObj] = useState({});
    const [sortedData, setSortedData] = useState([]);
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(0);
    let resolved_url;
    let resolved_title;
    let image;
    let item_id;
    let timeToRead;
    let newCard;
    const [
        show,
        setShow
    ] = useState(false);

    useEffect(()=>{
        GetIt();
    // console.log();
    }, [])

    function setDialog(time){
        setTime(time);
        setOpen(true);
    }

    async function getArticles(){
        await fetch(`http://localhost:5000/retrieve?access_token=${access_token}&username=${username}`)
        .then(response => response.json())
        .then(data => {
            // const a = document.createElement("a");
            // data = JSON.stringify(data);
            // const file = new Blob([data], {type: "application/json"});
            // a.href = URL.createObjectURL(file);
            // a.download = "test.json";
            // a.click();
            for (const property in data["list"]) {
                resolved_url = data["list"][property]["resolved_url"]
                resolved_title = data["list"][property]["resolved_title"]
                image = data["list"][property]["top_image_url"]
                item_id = data["list"][property]["item_id"]
                timeToRead = data["list"][property]["time_to_read"]
                newCard = {
                    "resolved_url": resolved_url,
                    "resolved_title": resolved_title,
                    "image": image,
                    "name": "Yash",
                    "time": timeToRead,
                    "item_id": item_id,
                    "count": 0,
                }
                if (timeObj.hasOwnProperty(timeToRead)){
                    timeObj[timeToRead].push(newCard);   
                } else{
                    timeObj[timeToRead] = [newCard];
                }
                cards.push(newCard);
            }
            if (data){
                setSortedData((prev) => {
                    return [...prev, ...sortArticles(data)];
                });
            }
        });
    }
    async function GetIt(){
        await getArticles()
    }

    function ohHowTheTimesChange(){
        let timeKeepers = Object.keys(timeObj);
        return timeKeepers.map((tweedleDee, index) => {
            return (
                <button className="btnChronos" onClick={event => justDoIt(timeObj[tweedleDee])}>{tweedleDee}</button>
            )
        })
    }

    // function TheTimeKeeper(){
    //     if (timeObj.length!==0){
    //     }
    // }
    const addObjectToArray = card => {
        setCards(current => [...current, card]);
    };
    
    // function reader(){
    //     for (const property in jsonData["list"]) {
    //         resolved_url = jsonData["list"][property]["resolved_url"]
    //         resolved_title = jsonData["list"][property]["resolved_title"]
    //         image = jsonData["list"][property]["top_image_url"]
    //         item_id = jsonData["list"][property]["item_id"]
    //         timeToRead = jsonData["list"][property]["time_to_read"]
    //         newCard = {
    //             "resolved_url": resolved_url,
    //             "resolved_title": resolved_title,
    //             "image": image,
    //             "name": "Yash",
    //             "time": timeToRead,
    //             "item_id": item_id,
    //         }
    //         cards.push(newCard);
    //     }
    //     // setRead(true);
    // }

    function mapUnbounded(res){
        let ret = []
        console.log(res);
        res.forEach((list, index) => {
            let l = [];
            for (const time in list){
                for (let i=0; i<list[time]["count"]; i++){
                    l.push(timeObj[list[time]["key"]][i]);
                }
            }
            ret.push(l);
        });
        return ret;
    }

    function LeastMostClicked(){
        setDL([]);
        setDC([]);
        let res = unboundedKnapsack(sortedData);
        let ret = mapUnbounded(res);
        ret.forEach((item) => {
            setDL((prev) => {
                return [...prev, item];
            });
        })
        // let res = LeastMost(sortedData);
        // res.forEach((item) => {
        //     setDC((prev) => {
        //         return [...prev, ...cards.filter((card)=>{
        //             return card.item_id===item.item_id;
        //         })];
        //     });
        // })
    }

    function MostLeastClicked(){
        setDL([]);
        setDC([]);
        let res = MostLeast(sortedData);
        res.forEach((item) => {
            setDC((prev) => {
                return [...prev, ...cards.filter((card)=>{
                    return card.item_id===item.item_id;
                })];
            });
        })
    }

    function MostMostClicked(){
        setDL([]);
        let res = MostMost(sortedData);
        res.forEach((item) => {
            setDL((prev) => {
                return [...prev, item];
            });
        })
    }

    function LeastMost2Clicked(){
        setDL([]);
        let res = LeastMost2(sortedData);
        res.forEach((item) => {
            setDL((prev) => {
                return [...prev, item];
            });
        })
    }

    function MostNullClicked(){
        setDL([]);
        let res = MostNull(sortedData);
        res.forEach((item) => {
            setDL((prev) => {
                return [...prev, item];
            });
        })
    }

    function NullMostClicked(){
        setDL([]);
        let res = NullMost(sortedData);
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
                    return card.item_id===item.item_id;
                })];
            });
        })
    }

    function multiList(){
        return dl.map((list, index) => {
            return (
                <button className="btn-chronos" onClick={event => justDoIt(list)}>{index}</button>
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

    function cardList(what, which){
        return what.map((card) => {
            return (
                <Card
                    resolved_title={card.resolved_title}
                    resolved_url={card.resolved_url}
                    image={card.image}
                    time={card.time}
                    name={card.name}
                    setDialog={setDialog}
                    which = {which}
                />
            );
          });
    };

    return (
        <div>
            {/* <MetaTags>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Lato&display=swap" rel="stylesheet"></link>
            </MetaTags> */}
            <div className="main">
                <div>
                    <button className="btnChronos" onClick={LeastMostClicked}>LeastMost</button>
                    <button className="btnChronos" onClick={MostLeastClicked}>MostLeast</button>
                    <button className="btnChronos" onClick={MostMostClicked}>MostMost</button>
                    <button className="btnChronos" onClick={MostNullClicked}>MostNull</button>
                    <button className="btnChronos" onClick={NullMostClicked}>NullMost</button>
                    <button className="btnChronos" onClick={LeastMost2Clicked}>LeastMost2</button>
                    <p>{`Total: ${total}`}</p>
                    <p>{`Num: ${numArticles}`}</p>
                    <div>
                        {ohHowTheTimesChange()}
                    </div>
                    <div>
                        {multiList()}
                    </div>
                    {cardList(dc, 'normal')}
                </div>
            </div>
            <h1>Hello</h1>
            <MaxWidthDialog open={open} setOpen={setOpen} cardList={cardList} timeObj={timeObj} time={time}/>
        </div>
    );
}

export default DisplayCards;
