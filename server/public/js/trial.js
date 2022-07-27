(function(){
    async function requestPocket(){
        console.log("Clicked");
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json;charset=UTF-8");
        myHeaders.append("X-Accept", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch("https://cors-anywhere.herokuapp.com/https://getpocket.com/v3/oauth/request?consumer_key=102894-ac9c50b12080d1f4d69a0de&redirect_uri=localhost/5000", requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
    }

    let m = document.getElementsByClassName("begin")[0];
    m.onclick = requestPocket;
})();