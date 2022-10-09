import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

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
                    <div>
                        <h2 className="time">{props.time}</h2>
                    </div>
                </div>
            </div>  
        );
    }
}

function cardList(what, which){
    console.log(what);
    return what.map((card) => {
        return (
            <Card
                resolved_title={card.resolved_title}
                resolved_url={card.resolved_url}
                image={card.image}
                time={card.time}
                name={card.name}
                which = {which}
            />
        );
    });
};  

function MyReadList(){
    let location = useLocation();
    console.log(location.state);
    let readList = location.state;
    const [myReadList, setMyReadList] = useState([]);
    useEffect(() => {
        readList.map((list) => {
            setMyReadList((prev) => {
                return [...prev, list];
            })
        })
    }, [readList]);

    console.log(myReadList);

    if (myReadList.length!==0){ 
        return (
            <div>
                <h1>Hello there</h1>
                {cardList(myReadList[0], 'normal')}
            </div>
        )
    } else {
        return (
            <div>
                <h1>Hello there, There's nothing here yet. Add articles to your Readlist</h1>
            </div>
        )
    }
}

export default MyReadList;
