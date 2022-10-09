import React, { useState } from "react";
import { useEffect } from "react";
import MetaTags from 'react-meta-tags';
import "./Card.css"
import Input from '@mui/material/Input';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AspectRatio from '@mui/joy/AspectRatio';
import Box2 from '@mui/joy/Box';
import Button2 from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';

import { useNavigate, useLocation } from "react-router";
import { useParams } from "react-router-dom";
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Grid, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory';
import MoreIcon from '@mui/icons-material/More';
import Typography from '@mui/material/Typography';
import ShuffleIcon from '@mui/icons-material/Shuffle';

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
            <DialogTitle>Articles of the same Duration</DialogTitle>
            <DialogContent>
              <DialogContentText>
                These articles represent alternatives to the articles of same duration
              </DialogContentText>
            <Grid container spacing={2}>
                {props.cardList(dialogCards, 'dialog')}
            </Grid>
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
// let weight = 42;

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

function MetaData(props){
    console.log(props.domainMetaData);
    const style = {
        textTransform: "none",
        boxShadow: "none", 
        borderRadius: "21px", 
        borderColor: "black", 
        backgroundColor: "#fce2c4",
        color: "black",
        padding: "0 10px",
    }
    if (props.domainMetaData!==null){
        return (
            <div className="meta">
                {/* <Button variant="outlined" sx={style}>{props.domainMetaData.name}</Button> */}
                <a href={props.resolved_url} className="card-link">{props.domainMetaData.name}</a>
            </div>
        )
    } else{
        let domain = (new URL(props.resolved_url));
        domain = domain.hostname.replace('www.','');
        return (
            <div className="meta">
                <a href={props.resolved_url} className="card-link">{domain}</a>
            </div>
        )
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
function MostMost(sortedJSONData, weight){
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

function LeastMost2(sortedJSONData, weight){
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

function MostLeast(sortedJSONData, weight){
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

function LeastMost(sortedJSONData, weight){
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

function NullMost(sortedJSONData, weight){
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

function MostNull(sortedJSONData, weight){
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

function boundedKnapsack(sortedJSONData, timeOrNum, wgt){
    // var weight = wgt;
    // let weight = 30;
    var items = {};
    let time;
    let id;
    let len = 0;
    var nums = [];
    var parNums = [];
    var times = [];
    var maxi = 0;
    console.log(`Hello Weight: ${wgt}`);
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
    var table = new Array(len+1).fill(null).map(() => Array(wgt+1).fill(0));
    let keys = Object.keys(items);
    keys.map((time, i) => {
        let mul = 1;
        if (timeOrNum===1){
            mul = time;
        }
        console.table(table);
        for (let j=1; j<wgt+1; j++){
            for (let k=0; k<=items[time]; k++){
                if (j>=time*k){
                    table[i+1][j] = Math.max(table[i+1][j], mul*k+table[i][j-time*k]);
                    // table[i+1][j] = Math.max(table[i+1][j], time*k+table[i][j-time*k]);
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
            let mul = 1;
            if (timeOrNum===1){
                mul = keys[i-1];
            }
            if (j>=keys[i-1]*k){
                if (mul*k+table[i-1][j-keys[i-1]*k]>maxi){
                // if (keys[i-1]*k+table[i-1][j-keys[i-1]*k]>maxi){
                    // maxK = Math.max(maxK, k);
                    maxi = mul*k+table[i-1][j-keys[i-1]*k];
                    // maxi = keys[i-1]*k+table[i-1][j-keys[i-1]*k];
                }
            } else{
                break;
            }
        }
        for (let k=0; k<=items[keys[i-1]]; k++){
            let mul = 1;
            if (timeOrNum===1){
                mul = keys[i-1];
            }
            if (j>=keys[i-1]*k){
                if (mul*k+table[i-1][j-keys[i-1]*k]==maxi){
                // if (keys[i-1]*k+table[i-1][j-keys[i-1]*k]==maxi){
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
    let j = wgt;
    Backtrack(i, j, nums, times);
    console.table(table);
    console.log(parNums);
    return parNums;
}

function DisplayCards(){
    const [weight, setWeight] = useState(0);

    function onWeightChange(e){
        console.log(e.target.value);
        setWeight(Number(e.target.value));
    }

    let location = useLocation();
    let access_token = location.state.access_token;
    let username = location.state.username;
    const [cards, setCards] = useState([]);
    const [dc, setDC] = useState([]);
    const [dl, setDL] = useState([]);
    const [index, setIndex] = useState(0);
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

    useEffect(()=>{
        GetIt();
    // console.log();
    }, [])

    function setDialog(time){
        setTime(time);
        setOpen(true);
    }

    function cardList(what, which){
        console.log(what);
        return what.map((card) => {
            return (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Card
                        resolved_title={card.resolved_title}
                        resolved_url={card.resolved_url}
                        image={card.image}
                        time={card.time}
                        setDialog={setDialog}
                        which = {which}
                        domainMetaData={card.domainMetaData}
                        excerpt={card.excerpt}
                        pocketRead={card.pocketRead}
                    />
                </Grid>
            );
          });
    };

    async function getArticles(){
        await fetch(`http://localhost:5000/retrieve?access_token=${access_token}&username=${username}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (const property in data["list"]) {
                resolved_url = data["list"][property]["resolved_url"]
                resolved_title = data["list"][property]["resolved_title"]
                const excerpt = data["list"][property]["excerpt"]
                image = data["list"][property]["top_image_url"]
                item_id = data["list"][property]["item_id"]
                timeToRead = data["list"][property]["time_to_read"]
                let domainMetaData = null;
                if ("domain_metadata" in data["list"][property]){
                    // Contains name and logo
                    domainMetaData = data["list"][property]["domain_metadata"];
                }
                newCard = {
                    "resolved_url": resolved_url,
                    "resolved_title": resolved_title,
                    "image": image,
                    "domainMetaData": domainMetaData,
                    "time": timeToRead,
                    "item_id": item_id,
                    "count": 0,
                    "chosen": 0,
                    "excerpt": excerpt,
                    "pocketRead": property,
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

    function LeastMostClicked(timeOrNum, weight){
        setDL([]);
        setDC([]);
        let res = boundedKnapsack(sortedData, timeOrNum, weight);
        let ret = mapUnbounded(res);
        let length = 0;
        ret.forEach((item) => {
            setDL((prev) => {
                return [...prev, item];
            });
            length++;
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
        console.log(list);
        setIndex(index+1);
        list.forEach((item) => {
            setDC((prev) => {
                return [...prev, ...cards.filter((card)=>{
                    return card.item_id===item.item_id;
                })];
            });
        })
    }

    function MultiList(){
        let list;
        list = dl[index];
        
        useEffect(() => {
            if (index===dl.length){
                setIndex(0);
            }
        }, []);
        if (index!==dl.length){
            return (
                <Button className="shuffle" onClick={event => justDoIt(list)}>
                    <ShuffleIcon className="option-text"></ShuffleIcon>
                </Button>
            )
        }
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

    function Card(props){
        return (
            <MUICard className="mui-card" sx={{ maxHeight: 420, overflow: "scroll", scrollbarWidth: "none" }}>
                <CardActionArea>
                    <a href={`https://getpocket.com/read/${props.pocketRead}`} target="blank">
                        <CardMedia
                            component="img"
                            height="210"
                            image={props.image}
                            alt={props.resolved_title}
                        />
                    </a>
                </CardActionArea>
                <CardActionArea>
                    <Stack 
                        direction="row" 
                        sx={{width: "100%"}}
                        divider={<Divider orientation="vertical" flexItem />}
                        alignItems={"center"}
                        justifyContent={"space-evenly"}>
                            <Button className="meta-icon-btn"><AddIcon className="meta-icon"/></Button>
                            <Button className="meta-icon-btn"><InventoryIcon className="meta-icon" onClick={(e) => {doThing("archive", props.pocketRead)}}/></Button>
                            <Button className="meta-icon-btn" onClick={(e) => {doThing("delete", props.pocketRead)}}><DeleteIcon className="meta-icon"/></Button>
                            <Button className="meta-icon-btn" onClick={(event) => {props.setDialog(props.time)}}><MoreIcon className="meta-icon"/></Button>
                    </Stack>
                </CardActionArea>
                <CardActionArea sx={{position: "relative"}}>
                    <CardContent sx={{ paddingBottom: "0" }}>
                        <h3><a className="card-title" href={props.resolved_url} target="blank">{props.resolved_title}</a></h3>
                    </CardContent>
                    <CardContent>
                        {props.excerpt}
                    </CardContent>
                    <Stack 
                        direction="row"
                        alignItems={"baseline"}
                        justifyContent={"space-between"}
                        sx={{ paddingBottom: "0", paddingLeft: "16px", paddingRight: "16px", backgroundColor: "#e3f2fd", width: "100%", position: "sticky", bottom: "0" }}    
                    >
                        <MetaData domainMetaData={props.domainMetaData} resolved_url={props.resolved_url}/>
                        <h1 className="time">{props.time}</h1>
                    </Stack>
                </CardActionArea>
            </MUICard>
        )
    }

    function doThing(thing, item_id){
        const data = [
            {
                "action": thing,
                "item_id": item_id,
            }
        ]
        const json = encodeURIComponent(JSON.stringify(data));
        async function sendReq(){
            await fetch('http://localhost:5000/dothing', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    access_token: access_token,
                    json: json,
                })
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        sendReq();
        setDC(() => {
            return [...dc.filter((card)=>{
                return card.item_id!==item_id;
            })];
        })
    }

    return (
        <div>
            <div className="main">
                <div>
                    <form style={{display: "flex", justifyContent: "center"}}>
                        <label className="labelElem">
                            <span className="inputText">Today I would like to read for </span>
                            <input id="inputWeight" onChange={onWeightChange}></input>
                            <span className="inputText">minutes</span>
                        </label>
                    </form>
                </div>
            </div>
            <Stack direction="row" spacing={2} alignItems={"center"} justifyContent={"space-evenly"} sx={{ paddingTop: "42px"}}>
                        <Button variant="contained" className="option-btn" onClick={(e) => {LeastMostClicked(1, weight)}}><Typography className="option-text">Most time</Typography></Button>
                        <Button variant="contained" className="option-btn" onClick={(e) => {LeastMostClicked(0, weight)}}><Typography className="option-text">Most articles</Typography></Button>
            </Stack>
            <div >
                <MultiList />
            </div>
            <Grid container spacing={4} sx={{width: "100%" }}>
                {cardList(dc, 'normal')}
            </Grid>
            <MaxWidthDialog open={open} setOpen={setOpen} cardList={cardList} timeObj={timeObj} time={time}/>
        </div>
    );
}

export default DisplayCards;


                    {/* <Button>Hello</Button> */}
                    {/* <button className="btnChronos" onClick={LeastMostClicked}>LeastMost</button> */}
                    {/* <button className="btnChronos" onClick={MostLeastClicked}>MostLeast</button> */}
                    {/* <button className="btnChronos" onClick={MostMostClicked}>MostMost</button> */}
                    {/* <button className="btnChronos" onClick={MostNullClicked}>MostNull</button> */}
                    {/* <button className="btnChronos" onClick={NullMostClicked}>NullMost</button> */}
                    {/* <button className="btnChronos" onClick={LeastMost2Clicked}>LeastMost2</button> */}
                    {/* <button className="btnChronos" onClick={UpdateReadList()}>Add to Readlist</button> */}
                    {/* <Stack 
                        direction="row"
                        alignItems={"center"}
                        justifyContent={"space-evenly"}
                    >
                        <h4>Total time to Read <Typography sx={{backgroundColor: "#003754", color: "#fff", textAlign: "center"}}><h2>{`${total}`}</h2></Typography></h4>
                        <h4>Number of Articles <Typography sx={{backgroundColor: "#003754", color: "#fff", textAlign: "center"}}><h2>{`${numArticles}`}</h2></Typography></h4>
                    </Stack> */}
                    {/* <div>
                        {ohHowTheTimesChange()}
                    </div> */}
